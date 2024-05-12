import express, { Router } from "express";
import {
  signUp,
  signIn,
  protect,
  secret,
  deleteMe,
  restrictTo,
  forgotPassword,
} from "../controller/authController.js";
const router = express.Router();

router
  .post("/signUp", signUp)
  .post("/signIn", signIn)
  .post("/forgot", forgotPassword)
  .delete("/deleteMe", protect, deleteMe);
router.route("/secret").get(protect, restrictTo("admin"), secret);

export default router;
