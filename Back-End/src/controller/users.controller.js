import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ msg: "success", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ msg: "success", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ msg: "User updated", user });
  } catch (error) {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).json({ msg: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToWatchList = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const user = await User
      .findByIdAndUpdate(
        userId,
        { $addToSet: { watchlist: movieId } },
        { new: true }
      )
      .populate("watchlist");

    if (!user) {
      if (!user) return res.status(404).json({ msg: "User not found" });
    }
    res.json({ msg: "Movie added to watchlist", watchlist: user.watchlist });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const addToFavorite = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { favoriteMovies: movieId },
      },
      { new: true }
    ).populate("favoriteMovies");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(201).json({
      msg: "Added to favorite list ",
      favoriteMovies: user.favoriteMovies,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
