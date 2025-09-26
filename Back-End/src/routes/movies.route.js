import express from "express";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controller/movies.controller.js";
import upload from "../middlewares/upload.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieById);

router.post("/", authMiddleware, isAdmin, upload.single("image"), createMovie);

router.put("/:id", authMiddleware, isAdmin, updateMovie);

router.delete("/:id", authMiddleware, isAdmin, deleteMovie);

export default router;
