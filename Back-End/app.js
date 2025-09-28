import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

import userRoutes from "./src/routes/users.route.js";
import movieRoutes from "./src/routes/movies.route.js";
import reviewRoutes from "./src/routes/reviews.route.js";
import authRoutes from "./src/routes/auth.route.js";

dotenv.config();

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "https://filmy-front.vercel.app",
      "https://filmy-front-bakrabuhassibas-projects.vercel.app",
      "https://filmy-front-git-main-bakrabuhassibas-projects.vercel.app",
      "https://filmy-front-6s43r4sps-bakrabuhassibas-projects.vercel.app",
    ],
    credentials: true,
  })
);

// path helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use("/users", userRoutes);
app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);
app.use("/auth", authRoutes);

// fallback route
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// --- MongoDB connection ---
const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

// --- Local development only (Vercel ignores this) ---
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// export for Vercel
export default app;
