import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
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
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
    userName: {
      type: String,
      required: true,
      lowercase: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    passwordResetExpiresIn: {
      type: Date,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/duzhcfqn6/image/upload/v1715772134/dzmugchkvouoegpn6tjy.png",
    },
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
