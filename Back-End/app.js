import express from "express";
const app = express();
import dotenv from "dotenv";
import userRoutes from "./src/routes/users.route.js";
import movieRoutes from "./src/routes/movies.route.js";
import reviewRoutes from "./src/routes/reviews.route.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome Page");
});

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);

app.use((req, res) => {
  res.send("Not Found");
});

export default app;
