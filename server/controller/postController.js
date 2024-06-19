import CustomError from "../utils/CustomError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import post from "../model/postModel.js";

const createPost = asyncErrorHandler(async (req, res, next) => {
  const { title, content, category, author, image, slug } = req.body;

  if (!image || !content || !category || !title || !author || !slug) {
    return next(new CustomError("All fields are mandatory", 404));
  }
  const isExisting = await post.findOne({ slug: slug });
  if (isExisting) {
    return next(new CustomError("Please use any other title", 404));
  }
  await post.create({
    title,
    content,
    author,
    category,
    slug,
    image,
  });

  res.status(201).json({
    success: true,
  });
});
export { createPost };
