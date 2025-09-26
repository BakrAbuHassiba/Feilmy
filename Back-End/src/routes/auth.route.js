import express from "express";
import { signup, signin, profile } from "../controller/auth.controller.js";
import validate from "../middlewares/ajv.middleware.js"; 
import {authMiddleware} from "../middlewares/auth.middleware.js" 
import userSchema from "../utils/user.validator.js"; 

const router = express.Router();

router.post("/register", validate(userSchema), signup);

router.post("/login", signin);

router.get("/profile", authMiddleware, profile);

export default router;
