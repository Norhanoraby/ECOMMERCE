import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({products});
    } catch (error) {
       console.log("error in getAllProducts controller", error.message);
         res.status(500).json({message: "Server error", error:error.message});

    }
};
export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featuredProducts");
        if (featuredProducts) {
            //featured products from cache
            return res.json(JSON.parse(featuredProducts));
        }
//if not in cache, get from mongodb
//.Lean() is gonna return a plain javascript object instead of a mongodb document
//  which is more efficient for read operations
        featuredProducts = await Product.find({ isFeatured: true }).lean();
        if(!featuredProducts){
            return res.status(404).json({message:"No featured products found"});
        }//store in redis for future quick access
        await redis.set("featuredProducts", JSON.stringify(featuredProducts));
        res.json({featuredProducts});
    } catch (error) {
        console.log("error in getFeaturedProducts controller", error.message);
        res.status(500).json({message: "Server error", error:error.message});
    }
};
export const createProduct = async (req, res) => {
    try {
        const { name, description, price,image,category ,isFeatured ,inventory} = req.body;
       let cloudinaryResponse = null
        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
       }
        const product = await Product.create({
           name,
           description,
           price,
           image,
           category,
           isFeatured,
           inventory
       });
        res.status(201).json(product);
    } catch (error) {
        console.log("error in createProduct controller", error.message);
        res.status(500).json({message: "Server error", error:error.message});
    }

};
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        if(product.image){
            //extract public id from the image url
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
            await cloudinary.uploader.destroy(`products/${publicId}`);
            console.log("Deleted image from Cloudinary");
            } catch (error) {
                console.log("Error deleting image from Cloudinary", error.message);
            }   
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({message: "Product deleted successfully"});
    } catch (error) {
        console.log("error in deleteProduct controller", error.message);
        res.status(500).json({message: "Server error", error:error.message});
    }
};
export const getRecommendedProducts = async (req, res) => {
    try {
        const Products = await Product.aggregate([
            { $sample: { size: 3 } }, // Randomly select 3 products
            { $project: { _id: 1,
            name: 1,
            description : 1,
             image: 1,
            price: 1 } } // Include only necessary fields
        ]);
        res.json({Products});
    } catch (error) {
        console.log("error in getRecommendedProducts controller", error.message);
        res.status(500).json({message: "Server error", error:error.message});
    }
};
export const getProductsByCategory = async (req, res) => {
    const {category} = req.params;
    try {
        
        const products = await Product.find({ category });
        res.json({products});
    } catch (error) {
        console.log("error in getProductsByCategory controller", error.message);
        res.status(500).json({message: "Server error", error:error.message});
    }
};
export const toggleFeaturedProduct = async (req, res) => {
 try {    const product = await Product.findById(req.params.id);
    if (product) {
        product.isFeatured = !product.isFeatured;
       const updatedProduct = await product.save();
       await updatefeaturedProductsCache();
       res.json({updatedProduct});
    } else {
        res.status(404).json({message: "Product not found"});
    }
} catch (error) {
    console.log("error in toggleFeaturedProduct controller", error.message);
    res.status(500).json({message: "Server error", error:error.message});
}
};
async function updatefeaturedProductsCache() {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set("featuredProducts", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Error updating featured products cache");
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.log("error in getProductById controller", error.message);
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}
export const updateProductPrice = async (req, res) => {
  try {
    const { price } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.price = price;

    const updatedProduct = await product.save();

    await updatefeaturedProductsCache();

    res.json({ updatedProduct });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update price",
      error: error.message,
    });
  }
};

export const updateProductInventory = async (req, res) => {
  try {
    const { size, quantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const inventoryItem = product.inventory.find(
      (item) => item.size === size
    );

    if (!inventoryItem) {
      return res.status(404).json({ message: "Size not found" });
    }

    inventoryItem.quantity = quantity;

    const updatedProduct = await product.save();

    await updatefeaturedProductsCache();

    res.json({ updatedProduct });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update inventory",
      error: error.message,
    });
  }
};