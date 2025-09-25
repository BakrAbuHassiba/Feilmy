import Review from "../models/Review.js";
export const getAllReviews = async (req, res) => {
  try {
    const review = await Review.find({});
    if (review.length === 0) {
      return res.status(404).json({ message: "No review found" });
    }
    res.status(200).json({ msg: "success", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
