
import Movie from "../models/Movie.js";
// const Movie = mongoose.model("Movie", movieSchema);
export const getAllMovies = async (req, res) => {
  try {
    const movie = await Movie.find({});
    if (movie.length === 0) {
      return res.status(404).json({ message: "No movie found" });
    }
    res.status(200).json({ msg: "success", movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// export default { getAllMovie };
