import mongoose from "mongoose";
import config from "../../config/config.js";
const getImageUrl = (picture) => {
  return picture ? `${config.appPath}${picture}` : "";
};
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    isVerify: {
      type: Boolean,
      default: false
    },
    ageGroup: {
      type: String,
      enum: ["5-8", "9-13", "14-18", "18+"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    picture: {
      type: String,
      allowNull: true,
      get: getImageUrl,
    },
    otp: {
      type: String,
      required: false,
    },
    resetToken: {
      type: String,
      required: false,
    },
    resetTokenExpiry: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

export default mongoose.model("User", userSchema);
