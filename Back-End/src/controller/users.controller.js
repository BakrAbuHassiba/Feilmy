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
// export default { getAllUsers };
