import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.TKN_KEY);

    req.user = decoded;

    console.log("isAdmin:", decoded.isAdmin);

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "Not authorized, invalid token", error: error.message });
  }
};

export default authMiddleware;
