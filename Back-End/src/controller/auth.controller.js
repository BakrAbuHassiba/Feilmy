import User from "../models/User.js"; // make sure to add `.js`
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { email } = req.body;
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(409).json({ msg: "user is already exist" });
    }

    const user = new User(req.body);
    await user.save();

    const tkn = user.generateTkn({
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    res.cookie("token", tkn, { httpOnly: true });
    res.set("Authorization", "Bearer " + tkn);

    res.status(201).json({ msg: "You signed up successfully", user, tkn });
  } catch (error) {
    console.error("Signup error:", error); // shows full details in terminal
    res.status(500).json({
      msg: "internal server error",
      error: error.message, // <-- send only the message
      stack: error.stack, // (optional) helpful for debugging
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existEmail = await User.findOne({ email });
    if (!existEmail) {
      return res.status(401).json({ msg: "invalid email or password" });
    }

    const validPass = await bcrypt.compare(password, existEmail.password);
    if (!validPass) {
      return res.status(401).json({ msg: "invalid email or password" });
    }

    const tkn = existEmail.generateTkn({
      id: existEmail._id,
      email: existEmail.email,
      isAdmin: existEmail.isAdmin,
    });

    res.cookie("token", tkn, { httpOnly: true });
    res.set("Authorization", "Bearer " + tkn);

    res
      .status(200)
      .json({ msg: "You signed in successfully", user: existEmail, tkn });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

export const profile = async (req, res) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.TKN_KEY);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "Profile fetched successfully", user });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};
