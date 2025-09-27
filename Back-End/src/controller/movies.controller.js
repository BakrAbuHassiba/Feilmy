import Movie from "../models/Movie.js";
import cloudinary from "../../config/cloudinary.js";
import streamifier from "streamifier";

// helper to wrap upload_stream in a Promise
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "movies" }, // Cloudinary folder
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export const createMovie = async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const movie = new Movie({
      ...req.body,
      image: imageUrl,
    });

    await movie.save();
    res.status(201).json({ msg: "Movie created", movie });
  } catch (error) {
    console.error(" Error creating movie:", error);

    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }
    res.status(200).json({ msg: "success", movies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ msg: "Movie updated", movie });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ msg: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const incrementView = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
    if (!movie) {
      res.status(404).json({ msg: "Movie is not found" });
    }
    res.json({ msg: "View added ", movie });
  } catch (error) {
    console.error(" Error increment movie's views:", error);
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const getMoviesByTitle = async (req, res) => {
  try {
    let title = req.query.title;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Please provide a movie title to search" });
    }

  
    title = title.trim();

    const movies = await Movie.find({
      title: { $regex: title, $options: "i" },
    });

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found with that title" });
    }

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
