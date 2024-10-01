import express from "express";
import { login } from "../controllers/auth.controller.js";
import { registerUser } from "../controllers/user.controller.js";

const router = express.Router();

// Route for user login
router.post("/login", login);

// Route for registering a new user (admin or trainer)
router.post("/register", registerUser);

// Route to get all users (admin access only)
// router.get("/users", getAllUsers);

export default router;
