import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["jeans", "blouse", "shoes", "watches", "purse", "dress"];

const getSizesByCategory = (category) => {
  const sizeMap = {
    jeans: ["Small", "Medium", "Large"],
    blouse: ["Small", "Medium", "Large"],
    dress: ["Small", "Medium", "Large"],
    shoes: ["37", "38", "39", "40", "41", "42"],
  };

  return sizeMap[category] || ["One Size"];
};
const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    inventory: [],
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        inventory: [],
      });
    } catch {
      console.log("error creating a product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };

      reader.readAsDataURL(file);// base64 format
    }
  };

  return (
    <motion.div
      className="bg-white border border-[#E5E0DA] shadow-sm rounded-md p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-[#1A1A1A] uppercase tracking-wide text-center">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest"
          >
            Product Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-2 block w-full bg-white border border-[#E5E0DA] px-3 py-3 text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-black sm:text-sm"
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            rows="3"
            className="mt-2 block w-full bg-white border border-[#E5E0DA] px-3 py-3 text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-black sm:text-sm"
            placeholder="Enter product description"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest"
          >
            Price
          </label>

          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            step="0.01"
            className="mt-2 block w-full bg-white border border-[#E5E0DA] px-3 py-3 text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-black sm:text-sm"
            placeholder="Enter product price"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest"
          >
            Category
          </label>

          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) => {
  const category = e.target.value;
  const sizes = getSizesByCategory(category);

  setNewProduct({
    ...newProduct,
    category,
    inventory: sizes.map((size) => ({
      size,
      quantity: 0,
    })),
  });
}}
            className="mt-2 block w-full bg-white border border-[#E5E0DA] px-3 py-3 text-[#1A1A1A] focus:outline-none focus:border-black sm:text-sm"
            required
          >
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {newProduct.inventory.length > 0 && (
  <div>
    <label className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest">
      Available Sizes & Quantity
    </label>

    <div className="mt-3 space-y-3">
      {newProduct.inventory.map((item, index) => (
        <div key={item.size} className="flex items-center gap-3">
          <span className="w-24 font-semibold">{item.size}</span>

          <input
            type="number"
            min="0"
            value={item.quantity}
            onChange={(e) => {
              const updatedInventory = [...newProduct.inventory];
              updatedInventory[index].quantity = Number(e.target.value);

              setNewProduct({
                ...newProduct,
                inventory: updatedInventory,
              });
            }}
            className="w-full bg-white border border-[#E5E0DA] px-3 py-2"
            placeholder="Quantity"
            required
          />
        </div>
      ))}
    </div>
  </div>
)}

        <div>
          <label className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest mb-2">
            Product Image
          </label>

          <div className="flex items-center">
            <input
              type="file"
              id="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />

            <label
              htmlFor="image"
              className="cursor-pointer bg-white py-3 px-4 border border-[#E5E0DA] text-sm font-semibold text-[#1A1A1A] hover:bg-[#EFEAE5] transition duration-200"
            >
              <Upload className="h-5 w-5 inline-block mr-2" />
              Upload Image
            </label>

            {newProduct.image && (
              <span className="ml-3 text-sm text-[#6B6B6B]">
                Image uploaded
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-black text-sm font-bold uppercase tracking-widest text-white bg-black hover:bg-[#333333] transition duration-200 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="mr-2 h-5 w-5 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;