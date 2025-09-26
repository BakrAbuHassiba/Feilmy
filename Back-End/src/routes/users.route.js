import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/users.controller.js";
const router = express.Router();
import validateId from "../middlewares/validateId.middleware.js"; // ObjectId validator

router.param("id", validateId);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
