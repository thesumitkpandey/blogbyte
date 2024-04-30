import CustomError from "../utils/customError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import users from "../model/usersModel.js";

const signUp = asyncErrorHandler(async (req, res, next) => {
  const { name, userName, email, password, profilePicture } = req.body;
  if (!name || !userName || !email || !password) {
    return next(new CustomError("all fields are mandatory", 400));
  }
  res.status(200).json({ success: true });
});

export default signUp;
