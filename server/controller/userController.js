import CustomError from "../utils/customError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import users from "../model/usersModel.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import crypto from "crypto";

const signUp = asyncErrorHandler(async (req, res, next) => {
  //We can also add input santization using validator library

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
    password,
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
    return next(new CustomError("Please enter a valid email or username", 401));
  }
  const correctUserData = await users.findOne({
    $or: [{ userName }, { email }],
  });
  if (!correctUserData) {
    return next(new CustomError("Incorrect credentials please try again", 401));
  }

  let isValidPassword = await bcrypt.compare(
    password,
    correctUserData.password,
  );
  if (!isValidPassword) {
    return next(new CustomError("Invalid password", 401));
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
  });
});
const secret = asyncErrorHandler(async (req, res, next) => {
  console.log(`The following details has been printed from secret${req.user}`);
  res.status(200).json({
    message: "This is a safe route and only to be accessed after login",
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
const restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new CustomError("You don't have permission to access this item", 403),
      );
    }
    next();
  };
};

//Forget user controller is not complete
const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new CustomError("Please enter your email", 401));
  }
  const user = users.findOne({ email });
  if (!user) {
    return next(
      new CustomError("Please enter correct userName or Password", 401),
    );
  }
  const resetToken = users.createPasswordResetToken();
  users.save({ validateBeforeSave: false });
  next();
});
const deleteMe = asyncErrorHandler(async (req, res, next) => {
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
  secret,
  restrictTo,
  forgotPassword,
  deleteMe,
};
