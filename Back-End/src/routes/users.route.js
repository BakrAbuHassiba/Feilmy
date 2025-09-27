import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addToFavorite,
  addToWatchList,
  getWatchList,
  getFavMovies,
} from "../controller/users.controller.js";
const router = express.Router();
import validateId from "../middlewares/validateId.middleware.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

router.param("id", validateId);

router.get("/", authMiddleware, isAdmin, getAllUsers);
router.get("/:id", getUserById);
router.get("/watchlist/:userId", authMiddleware, getWatchList);
router.get("/favorite-movies/:userId", authMiddleware,getFavMovies);
router.put("/:id", isAdmin, authMiddleware, updateUser);
router.delete("/:id", isAdmin, authMiddleware, deleteUser);

router.post("/:userId/favorites/:movieId", authMiddleware, addToFavorite);
router.post("/:userId/watchlist/:movieId", authMiddleware, addToWatchList);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description:
 */

/**
 * @swagger
 * /users:
 *   get:
 *
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       403:
 *         description: Forbidden (only admin)
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 *   put:
 *     summary:
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *   delete:
 *
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */

/**
 * @swagger
 * /users/{userId}/favorites/{movieId}:
 *   post:
 *     summary: Add movie to user favorites
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie added to favorites
 *
 * /users/{userId}/watchlist/{movieId}:
 *   post:
 *     summary: Add movie to user watchlist
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie added to watchlist
 */

/**
 * @swagger
 * /users/watchlist/{userId}:
 *   get:
 *     summary: Get all movies in a user's watchlist
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of movies in the user's watchlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 watchlist:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movie'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /users/favorite-movies/{userId}:
 *   get:
 *     summary: Get all movies in a user's favorite list
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of movies in the user's favorite list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 watchlist:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movie'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

export default router;
