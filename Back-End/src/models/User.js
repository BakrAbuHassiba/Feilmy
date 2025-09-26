import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 20 },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: { type: String, required: true, minLength: 6 },
    favoriteMovies: [{ type: String, ref: "Movie" }],
    watchlist: [{ type: String, ref: "Movie" }],
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enterdPassword) {
  return bcrypt.compare(enterdPassword, this.password);
};
userSchema.methods.generateTkn = function (payload) {
  return jwt.sign(payload, process.env.TKN_KEY, { expiresIn: "1h" });
};
const User = mongoose.model("User", userSchema);
export default User;
