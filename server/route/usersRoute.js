import express, { Router } from "express";
import multer from "multer";
const upload = multer({ dest: "../public" });

import {
  signUp,
  signIn,
  protect,
  forgotPassword,
  deleteMyAccount,
} from "../controller/userController.js";
const router = express.Router();

//Authentication routes
router
  .post("/signUp", upload.single("avatar"), signUp)
  .post("/signIn", signIn)
  .post("/forgot", forgotPassword)
  .delete("/deletemyaccount", protect, deleteMyAccount);

export default router;
