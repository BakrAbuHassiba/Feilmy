import express from "express";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  incrementView,
} from "../controller/movies.controller.js";
import upload from "../middlewares/upload.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/:id", getMovieById);

router.get("/", getAllMovies);

router.post("/", authMiddleware, isAdmin, upload.single("image"), createMovie);
router.put("/:id", authMiddleware, isAdmin, updateMovie);
router.patch("/:id", authMiddleware, incrementView);
router.delete("/:id", authMiddleware, isAdmin, deleteMovie);

/**
 * @swagger
 * /movies:
 *   get:
 *
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of movies
 */

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary:
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single movie
 *       404:
 *         description: Movie not found
 */

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *
 *     tags: [Movies]
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only admins)
 *       404:
 *         description: Movie not found
 */

/**
 * @swagger
 * /movies/{id}:
 *   patch:
 *     summary: Increment movie views
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: View count incremented
 *       404:
 *         description: Movie not found
 */

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *
 *     tags: [Movies]
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
 *         description: Movie deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only admins)
 *       404:
 *         description: Movie not found
 */

/**
 * @swagger
 * /movies:
 *   post:
 *     summary:
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *                 format: date
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only admins)
 */
export default router;
