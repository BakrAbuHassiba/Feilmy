const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome Page");
});

app.use((req, res) => {
  res.send("Not Found");
});

module.exports = app;
