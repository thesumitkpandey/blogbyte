import express, { Router } from "express";
import multer from "multer";
const upload = multer({ dest: "public/" });

import {
  signUp,
  signIn,
  protect,
  forgotPassword,
  deleteMyAccount,
  resetPassword,
  updatePassword,
  updateProfile,
  googleAuth,
  sendCookie,
} from "../controller/userController.js";
const router = express.Router();

//Authentication routes
router
  .post("/signUp", upload.single("avatar"), signUp)
  .post("/signIn", signIn)
  .post("/googleauth", googleAuth)
  .post("/forgotpassword", forgotPassword)
  .delete("/deletemyaccount", protect, deleteMyAccount)
  .patch("/resetpassword/:token", resetPassword)
  .patch("/updatepasssword", updatePassword)
  .patch("/updateprofile", protect, updateProfile)
  .get("/cookie", sendCookie)
  .get("/test", (req, res, next) => {
    console.log(req.cookies);
  });
export default router;
