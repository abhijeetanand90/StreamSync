import express from "express";
import { ApiRateLimiter } from "../middleware/authMiddleware.js";
import { signup, login, logout, refresh } from "../controllers/authController.js";

const router = express.Router();

// Auth routes
router.post("/signup", ApiRateLimiter, signup);
router.post("/login", ApiRateLimiter, login);
router.post("/logout", logout);
router.post("/refresh", refresh);

export default router;