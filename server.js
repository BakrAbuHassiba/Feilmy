const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(() => {
  console.log("db connected");
  app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
  }); 
});
