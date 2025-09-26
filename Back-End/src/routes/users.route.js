import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addToFavorite,
  addToWatchList,
} from "../controller/users.controller.js";
const router = express.Router();
import validateId from "../middlewares/validateId.middleware.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

router.param("id", validateId);

router.get("/", getAllUsers, authMiddleware, isAdmin);
router.get("/:id", getUserById);
router.put("/:id", isAdmin, authMiddleware, updateUser);
router.delete("/:id", isAdmin, authMiddleware, deleteUser);

router.post("/:userId/favorites/:movieId", authMiddleware, addToFavorite);
router.post("/:userId/watchlist/:movieId", authMiddleware, addToWatchList);
export default router;
