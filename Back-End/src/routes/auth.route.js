import express from "express";
import { signup, signin, profile } from "../controller/auth.controller.js";
import validate from "../middlewares/ajv.middleware.js"; // AJV validator
import auth from "../middlewares/auth.middleware.js"; // JWT check
import userSchema from "../utils/user.validator.js"; // your AJV schema

const router = express.Router();

// Register new user → validate body with AJV
router.post("/register", validate(userSchema), signup);

router.post("/login", signin);

// Get profile → requires JWT
router.get("/profile", auth, profile);

export default router;
