// const mongoose = require("mongoose");
import mongoose from "mongoose";
const movieScehma = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: [{ type: String }],
    rating: { type: Number, default: 0 },
    releaseYear: { type: Number },
    views: { type: Number, default: 0 },
    duration: { type: Number },
    director: { type: String },
    cast: [{ type: String }],
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieScehma);
export default Movie;
