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
export default router;
