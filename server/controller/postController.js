import CustomError from "../utils/CustomError";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import posts from "../model/postModel";
const createPost = asyncErrorHandler(async (req, res, next) => {
  const { title, content, category, author, image, slug } = req.body;
  if (!title || !!content || !category || !author || !images || !slug) {
    return next(new CustomError("All fields are mandatory", 404));
  }
  await posts.create({
    title,
    content,
    author,
  });
});
