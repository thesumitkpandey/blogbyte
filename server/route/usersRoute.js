import express, { Router } from "express";

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
  verifyToken,
  signOut,
} from "../controller/userController.js";
const router = express.Router();

//Authentication routes
router
  .post("/signUp", signUp)
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
  })
  .post("/verifytoken", verifyToken)
  .get("/signout", protect, signOut);
export default router;
//s
