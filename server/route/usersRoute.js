import express, { Router } from "express";
import { signUp, signIn } from "../controller/authController.js";
const router = express.Router();

router.post("/signUp", signUp).get("/signIn", signIn);
export default router;
