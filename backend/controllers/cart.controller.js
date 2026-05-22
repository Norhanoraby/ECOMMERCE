import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
  try {
    const productIds = req.user.cartItems.map((item) => item.product);

    const products = await Product.find({ _id: { $in: productIds } });

    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.product.toString() === product._id.toString()
      );

      return {
  ...product.toJSON(),
  quantity: item.quantity,
  selectedSize: item.selectedSize,
};
    });

    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
    res.status(500).json({ message: "Failed to fetch cart items", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, selectedSize } = req.body;
    const user = req.user;
const product = await Product.findById(productId);

if (!product) {
  return res.status(404).json({
    message: "Product not found",
  });
}

const inventoryItem = product.inventory.find(
  (item) => item.size === selectedSize
);

if (!inventoryItem || inventoryItem.quantity <= 0) {
  return res.status(400).json({
    message: "This size is sold out",
  });
}
    const existingItem = user.cartItems.find(
  (item) =>
    item.product.toString() === productId &&
    item.selectedSize === selectedSize
);

    if (existingItem) {
  if (existingItem.quantity + 1 > inventoryItem.quantity) {
    return res.status(400).json({
      message: `Only ${inventoryItem.quantity} available for this size`,
    });
  }

  existingItem.quantity += 1;
}
else {
      user.cartItems.push({
  product: productId,
  quantity: 1,
  selectedSize,
});
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId
      );
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove from cart", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId &&
      item.selectedSize === selectedSize
    );

    if (!existingItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity === 0) {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      const product = await Product.findById(productId);

const inventoryItem = product.inventory.find(
  (item) => item.size === existingItem.selectedSize
);

if (!inventoryItem || quantity > inventoryItem.quantity) {
  return res.status(400).json({
    message: `Only ${inventoryItem?.quantity || 0} available for this size`,
  });
}
      existingItem.quantity = quantity;
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.error("Error updating cart:", error.message);
    res.status(500).json({ message: "Failed to update cart", error: error.message });
  }
};