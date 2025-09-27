import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

import userRoutes from "./src/routes/users.route.js";
import movieRoutes from "./src/routes/movies.route.js";
import reviewRoutes from "./src/routes/reviews.route.js";
import authRoutes from "./src/routes/auth.route.js";

const app = express();
dotenv.config();

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);

// app.use(express.static(path.join(__dirname, "../Front-End/Filmy")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../Front-End/Filmy/index.html"));
// });

app.use((req, res) => {
  res.status(404).send("Not Found");
});

export default app;
