import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    userName: {
      type: String,

      required: true,

      lowercase: true,
    },
    // profilePicture: {
    //   type: String,
    // },
  },
  { timestamps: true },
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  } else {
    return next();
  }
});
const users = mongoose.model("users", userSchema);

export default users;
