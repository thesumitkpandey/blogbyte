import CustomError from "../utils/customError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import users from "../model/usersModel.js";

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
  let { userName, email, password } = req.body;
  if (!userName && !email) {
    return next(new CustomError("Please enter a valid email or username", 401));
  }
});
export { signUp, signIn };
