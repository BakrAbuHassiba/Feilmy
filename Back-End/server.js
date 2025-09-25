import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // load variables from .env

const PORT = process.env.PORT || 3000;
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://bakrabuhassiba:mearnfilmy123@cluster0.bo6bcnf.mongodb.net/moviesDB?retryWrites=true&w=majority&appName=Cluster0&tls=true";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // exit process if DB fails
  }
};

connectDB();
