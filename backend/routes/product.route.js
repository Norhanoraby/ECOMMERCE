import express from "express";
import {
  getAllProducts,
  getFeaturedProducts,
  createProduct,
  deleteProduct,
  getRecommendedProducts,
  getProductsByCategory,
  toggleFeaturedProduct,
  getProductById,
  updateProductPrice,
  updateProductInventory,
} from "../controllers/product.controller.js";
import { protectRoute,adminRoute  } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/",protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.get("/:id", getProductById);
router.patch("/:id/price", protectRoute, adminRoute, updateProductPrice);
router.patch("/:id/inventory", protectRoute, adminRoute, updateProductInventory);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
export default router;