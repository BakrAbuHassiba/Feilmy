import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "https://filmy-dusky.vercel.app",
    ],
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use(
//   "/api-docs/",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec, {
//     explorer: true,
//   })
// );

app.use(
  express.static(path.join(__dirname, "../Front-End/Filmy"), {
    index: "index.html",
    extensions: ["html"],
  })
);

app.get("/api-docs/*", swaggerUi.serve);

app.use(express.static(path.join(__dirname, "../Front-End/Filmy")));
app.use("/api/users", (await import("./src/routes/users.route.js")).default);
app.use("/api/movies", (await import("./src/routes/movies.route.js")).default);
app.use(
  "/api/reviews",
  (await import("./src/routes/reviews.route.js")).default
);
app.use("/api/auth", (await import("./src/routes/auth.route.js")).default);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Front-End/Filmy/index.html"));
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

export default app;
