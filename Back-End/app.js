import express from "express";
const app = express();
import dotenv from "dotenv";
import userRoutes from "./src/routes/users.route.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// const user = require("./src/models/User");

app.get("/", (req, res) => {
  res.send("Welcome Page");
});

app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.send("Not Found");
});

export default app;
