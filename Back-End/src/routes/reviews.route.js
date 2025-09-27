import express from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  deleteReview,
} from "../controller/reviews.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllReviews, authMiddleware);
router.get("/:id", getReviewById, authMiddleware);
router.post("/", createReview, authMiddleware);
router.delete("/:id", deleteReview, authMiddleware, isAdmin);

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reviews
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - movie
 *               - comment
 *               - rating
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID
 *               movie:
 *                 type: string
 *                 description: Movie ID
 *               comment:
 *                 type: string
 *                 description: Review text
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 10
 *                 description: Rating (1–10)
 *     responses:
 *       201:
 *         description: Review created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /reviews/{id}:
 *   get:
 *     
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Review ID
 *     responses:
 *       200:
 *         description: A single review
 *       404:
 *         description: Review not found
 *
 *   delete:
 *     
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted
 *       403:
 *         description: Forbidden (Not admin)
 *       404:
 *         description: Review not found
 */
export default router;
