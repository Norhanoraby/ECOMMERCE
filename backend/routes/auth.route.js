import exopress from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
const router = exopress.Router();
router.get("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);
export default router;