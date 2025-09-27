import express from "express";
import { signup, signin, profile } from "../controller/auth.controller.js";
import validate from "../middlewares/ajv.middleware.js"; 
import {authMiddleware} from "../middlewares/auth.middleware.js" 
import userSchema from "../utils/user.validator.js"; 

const router = express.Router();

router.post("/register", validate(userSchema), signup);

router.post("/login", signin);

router.get("/profile", authMiddleware, profile);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             example:
 *               name: Bakr Abuhassiba
 *               email: bakrabuhassiba@gmail.com
 *               password: StrongPass123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid data
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             example:
 *               email: bakrabuhassiba@gmail.com
 *               password: StrongPass123
 *     responses:
 *       200:
 *         description: Logged in successfully (returns JWT token)
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       401:
 *         description: Unauthorized, missing or invalid token
 */
export default router;
