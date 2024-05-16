import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: "duzhcfqn6",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
async function uploadOnCloudinary(localPath) {
  try {
    const uploadResult = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });
    return uploadResult;
  } catch (err) {
    console.log(err);
  }
}
export default uploadOnCloudinary;
