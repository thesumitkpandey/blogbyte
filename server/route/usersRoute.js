import express, { Router } from "express";
import signUp from "../controller/usersController.js";
const router = express.Router();

router.route("/").post(signUp);
export default router;
