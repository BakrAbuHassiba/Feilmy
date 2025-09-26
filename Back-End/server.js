import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/Filmy";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    
  }
};

connectDB();
