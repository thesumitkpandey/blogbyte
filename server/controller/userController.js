import CustomError from "../utils/customError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import users from "../model/usersModel.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import crypto from "crypto";
import uploadOnCloudinary from "../utils/cloudinary.js";
import restrictTo from "../middleware/restrictTo.js";
import nodemailer from "nodemailer";
const signUp = asyncErrorHandler(async (req, res, next) => {
  //We can also add input santization using validator library

  const { name, userName, email, password, avatar } = req.body;
  if (!name || !userName || !email || !password) {
    return next(new CustomError("All fields are mandatory", 400));
  }
  const isExisting = await users.findOne({ $or: [{ userName }, { email }] });
  if (isExisting) {
    return next(new CustomError("User already exists", 401));
  }
  let hashedPassword = await bcrypt.hash(password, 10);
  if (avatar) {
    uploadOnCloudinary(avatar);
  }
  let newUser = await users.create({
    name,
    userName,
    password: hashedPassword,
    email,
  });
  res.status(201).json({
    success: true,
    data: newUser,
  });
});

const signIn = asyncErrorHandler(async (req, res, next) => {
  //Input sanatization can be perforemd here also withh the help of validator
  let { userName, email, password } = req.body;
  if (!userName && !email) {
    return next(new CustomError("Please enter a valid email or username", 400));
  }
  const correctUserData = await users.findOne({
    $or: [{ userName }, { email }],
  });
  if (!correctUserData) {
    return next(new CustomError("Incorrect credentials please try again", 400));
  }

  let isValidPassword = await bcrypt.compare(
    password,
    correctUserData.password,
  );
  if (!isValidPassword) {
    return next(new CustomError("Invalid password", 400));
  }
  const jwtToken = jwt.sign(
    { id: correctUserData._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    },
  );

  res.status(200).json({
    success: true,
    token: jwtToken,
    user: {
      name: correctUserData.name,
      id: correctUserData.id,
      email: correctUserData.email,
      profilePicture: correctUserData.profilePicture,
    },
  });
});
const protect = asyncErrorHandler(async (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next(new CustomError("You do not have jwt go and sign in ", 401));
  }
  //although it will not return a promise we can make it do by utils library and promisify
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const freshUser = await users.findById(decodedToken.id);
  if (!freshUser) {
    return next(
      new customElements("User belonging to the account lo longer exists", 404),
    );
  }
  if (freshUser.passwordChangedAt && passwordChangedAt >= decodedToken.iat) {
    return next(
      new CustomError("passowrd has been updated please log in again", 401),
    );
  }
  req.user = freshUser;
  next();
});

//Forget user controller is not complete
const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new CustomError("Please enter your email", 400));
  }
  const user = await users.findOne({ email });
  if (!user) {
    return next(new CustomError("Please enter correct email", 400));
  }
  const randomResetToken = await crypto.randomBytes(32).toString("hex");
  const passwordResetToken = await bcrypt.hash(randomResetToken, 10);
  user.passwordResetExpiresIn = Date.now() + 10 * 60 * 1000;
  user.passwordResetToken = passwordResetToken;
  await user.save();
  //This prototype response should be modified
  res.status(200).json({
    success: true,
    link: `http://localhost:8000/api/v1/users/resetpassword/${randomResetToken}`,
    resetBefore: user.passwordResetExpiresIn,
  });
  /*
    script to send randomvresettoken will be send to the user through email here this, response will not be send actually
  */
});
const resetPassword = asyncErrorHandler(async (req, res, next) => {
  const newPassword = req.body.newPassword;
  const token = req.params.token;
  if (!newPassword || !token) {
    return next(new CustomError("Missing new password or token inputs", 401));
  }
  //There is one security flaw if more than one user has applied to reset password then it willnot work
  const user = await users.findOne({
    passwordResetExpiresIn: { $gt: Date.now() },
  });
  if (!user) {
    return next(new CustomError("Try again", 404));
  }

  let isMatching = await bcrypt.compare(token, user.passwordResetToken);
  if (!isMatching) {
    return next(new CustomError("Invalid Link", 404));
  }
  user.password = newPassword;
  user.passwordResetExpiresIn = undefined;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password successfully changed now sign in again",
  });
});

const updateMe = asyncErrorHandler(async (req, res, next) => {});
const deleteMyAccount = asyncErrorHandler(async (req, res, next) => {
  let user = await users.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    success: true,
    data: null,
  });
  next();
});
export {
  signUp,
  signIn,
  protect,
  forgotPassword,
  deleteMyAccount,
  resetPassword,
};
