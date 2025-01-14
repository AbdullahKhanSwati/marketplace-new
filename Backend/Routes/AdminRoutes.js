import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { requireSignin } from "../Middlewares/AuthMiddlewares.js";
import Admin from "../Models/AdminModel.js";
import {registerController,loginController} from "../Controllers/AdminController.js"
const router = express.Router();

router.post("/register",registerController);
router.post("/login",loginController);


export default router;
