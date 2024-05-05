import express, { Router } from "express";
import { signUp, signIn } from "../controller/authController.js";
const router = express.Router();

router.post("/signUp", signUp).post("/signIn", signIn);
export default router;
