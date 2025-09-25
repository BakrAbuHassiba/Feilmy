import express from "express";
// import { getAllMovies } from "../controller/movies.controller.js";
import { getAllMovies } from "../controller/movies.controller.js";
const router = express.Router();

router.get("/", getAllMovies);

export default router;
