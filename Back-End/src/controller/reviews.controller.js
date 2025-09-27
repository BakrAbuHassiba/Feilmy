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
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ msg: "Review Not Found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error: error });
  }
};

export const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ msg: "Review Created", review });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error: error });
  }
};

// export const updateReview = async (req, res) => {
//   try {
//     const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!review) {
//       res.status(404).json({ msg: "Review Not Found" });
//     }
//     res.status(200).json({ msg: "Review Updated ", review });
//   } catch (error) {
//     res.status(500).json({ msg: "internal server error", error: error });
//   }
// };

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      res.status(404).json({ msg: "Review Not Found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error: error });
  }
};
