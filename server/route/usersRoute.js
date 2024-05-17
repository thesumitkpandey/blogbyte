import express, { Router } from "express";
import multer from "multer";
const upload = multer({ dest: "../public" });

import {
  signUp,
  signIn,
  protect,
  forgotPassword,
  deleteMyAccount,
  resetPassword,
} from "../controller/userController.js";
const router = express.Router();

//Authentication routes
router
  .post("/signUp", upload.single("avatar"), signUp)
  .post("/signIn", signIn)
  .post("/forgotpassword", forgotPassword)
  .delete("/deletemyaccount", protect, deleteMyAccount)
  .patch("/resetpassword/:token", resetPassword);

export default router;
