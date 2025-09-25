import express from "express";
import {getAllUsers} from "../controller/users.controller.js";
const router=express.Router();

router.get("/",getAllUsers);

export default router;