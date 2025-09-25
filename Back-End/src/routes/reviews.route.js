import express from "express";
import { getAllReviews } from "../controller/reviews.controller.js";
const router = express.Router();

router.get("/", getAllReviews);

export default router;
