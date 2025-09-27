// import express from "express";
// const app = express();
// import dotenv from "dotenv";
// import userRoutes from "./src/routes/users.route.js";
// import movieRoutes from "./src/routes/movies.route.js";
// import reviewRoutes from "./src/routes/reviews.route.js";
// import authRoutes from "./src/routes/auth.route.js";
// import cors from "cors"

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(cors())

// app.get("/", (req, res) => {
//   res.send("Welcome Page");
// });

// app.use("/api/users", userRoutes);
// app.use("/api/movies", movieRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/auth", authRoutes);

// app.use((req, res) => {
//   res.send("Not Found");
// });

// export default app;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import userRoutes from "./src/routes/users.route.js";
import movieRoutes from "./src/routes/movies.route.js";
import reviewRoutes from "./src/routes/reviews.route.js";
import authRoutes from "./src/routes/auth.route.js";

dotenv.config();

const app = express();

// Get __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    credentials: true,
  })
);


// ✅ CORRECTED: Serve static files from the correct path
app.use(express.static(path.join(__dirname, "../")));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);

// Root route - serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Front-End/index.html"));
});

// Serve other HTML files
app.get("/Filmy/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../Front-End/index.html"));
});

// 404 handler for anything else
app.use((req, res) => {
  res.status(404).send("Not Found");
});

export default app;
