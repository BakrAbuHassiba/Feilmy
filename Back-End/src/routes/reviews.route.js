import express from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  deleteReview,
  updateReview,
} from "../controller/reviews.controller.js";
const router = express.Router();

router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
export default router;
