import CustomError from "../utils/customError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import users from "../model/usersModel.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import crypto from "crypto";

import restrictTo from "../middleware/restrictTo.js";
import nodemailer from "nodemailer";

//We can also perform input sanitization using validator or any other library
const signUp = asyncErrorHandler(async (req, res, next) => {
  const { name, userName, email, password } = req.body;
  if (!name || !userName || !email || !password) {
    return next(new CustomError("All fields are mandatory", 400));
  }
  const isExisting = await users.findOne({ $or: [{ userName }, { email }] });
  if (isExisting) {
    return next(new CustomError("User already exists", 401));
  }
  let newUser = await users.create({
    name,
    userName,
    email,
    password,
  });
  res.status(201).json({
    success: true,
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

  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS in production
    maxAge: 15 * 24 * 60 * 60 * 1000,
    //sameSite: "Strict"
  });
  res.status(200).json({
    success: true,
    user: {
      id: correctUserData._id,
      name: correctUserData.name,
      email: correctUserData.email,
      profilePicture: correctUserData.profilePicture,
      userName: correctUserData.userName,
    },
  });
});

//This route can be used if we are setting cookies in header instead of cookie
// const protect = asyncErrorHandler(async (req, res, next) => {
//   let token = "";
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else {
//     return next(new CustomError("You do not have jwt go and sign in ", 401));
//   }
//   //although it will not return a promise we can make it do by utils library and promisify
//   const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
//   const freshUser = await users.findById(decodedToken.id);
//   if (!freshUser) {
//     return next(
//       new CustomError("User belonging to the account lo longer exists", 404),
//     );
//   }
//   // // if (freshUser.passwordChangedAt >= decodedToken.iat) {
//   // //   return next(
//   // //     new CustomError("passowrd has been updated please log in again", 401),
//   // //   );
//   // }
//   req.user = freshUser;
//   next();
// });

const protect = asyncErrorHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new CustomError("You do not have jwt go and sign in", 401));
  }

  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  const freshUser = await users.findById(decodedToken.id);

  if (!freshUser) {
    return next(
      new CustomError("User belonging to the account no longer exists", 404),
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

const updatePassword = asyncErrorHandler(async (req, res, next) => {
  const { id, oldPassword, newPassword } = req.body;
  if (!id || !oldPassword || !newPassword) {
    return next(new CustomError("Please provide a correct password", 401));
  }
  const user = await users.findById(id);
  if (!user) {
    return next(new CustomError("Please enter a correct password", 404));
  }
  const isMatching = await bcrypt.compare(oldPassword, user.password);
  if (!isMatching) {
    return next(new CustomError("Please enter a correct password"));
  }
  user.password = newPassword;
  await user.save();
});
const updateProfile = asyncErrorHandler(async (req, res, next) => {
  if (req.body.passowrd || req.body.role) {
    return next(
      new CustomError("this route does not support password update", 400),
    );
  }
  let user = req.user;
  user.name = req.body.name;
  user.email = req.body.email;
  user.userName = req.body.userName;
  if (!user.name || !user.email || !user.userName) {
    return next(new CustomError("Enter all details correctly", 401));
  }
  await user.save();
  res.status(200).json({
    success: true,
  });
});
const deleteMyAccount = asyncErrorHandler(async (req, res, next) => {
  let user = await users.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    success: true,
    data: null,
  });
});

const sendCookie = asyncErrorHandler(async (req, res, next) => {
  let token = "this is testing";
  res.cookie("jwt", token, {
    maxAge: 900000,
    httpOnly: true,
    secure: process.env.IS_PRODUCTION_ENVIRONMENT ? true : false, //make it true in production it means https
    sameSite: true,
  });
  res.json({
    success: true,
    message: "cookie sent successfully",
  });
});
const googleAuth = asyncErrorHandler(async (req, res, next) => {
  const { email, name, avatar, userName } = req.body;
  console.log(req.body);
  let isExisting = await users.findOne({ email });
  if (!isExisting) {
    const randomPassword = crypto.randomBytes(15).toString("hex");
    const newUser = users.create({
      name: name,
      userName: userName,
      email: email,
      password: randomPassword,
      avatar: avatar,
    });
    const jwtToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS in production
      maxAge: 15 * 24 * 60 * 60 * 1000,
      //sameSite: "Strict"
    });
    res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        userName: newUser.userName,
        email: newUser.email,
        avatar: newUser.avatar,
      },
    });
  } else {
    const jwtToken = jwt.sign(
      { id: isExisting._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    );
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS in production
      maxAge: 15 * 24 * 60 * 60 * 1000,
      //sameSite: "Strict"
    });
    res.status(200).json({
      success: true,
      user: {
        name: isExisting.name,
        userName: isExisting.userName,
        email: isExisting.email,
        avatar: isExisting.avatar,
        id: isExisting._id,
      },
    });
  }
});
const verifyToken = asyncErrorHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new CustomError("No cookies found", 404));
  }
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  const correctUserData = await users.findById(decodedToken.id);
  if (!decodedToken || !correctUserData) {
    res.clearCookie("token");
    res.status(404).json({
      message: "Invalid cookie",
    });
  }
  res.status(200).json({
    success: true,
    user: {
      id: correctUserData._id,
      name: correctUserData.name,
      email: correctUserData.email,
      avatar: correctUserData.avatar,
      userName: correctUserData.userName,
    },
  });
});
const signOut = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ success: true });
});
export {
  signUp,
  signIn,
  protect,
  sendCookie,
  forgotPassword,
  deleteMyAccount,
  resetPassword,
  updatePassword,
  updateProfile,
  googleAuth,
  verifyToken,
  signOut,
};
