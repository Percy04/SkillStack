import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, "Email not provided"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    default: "",
    // required: [true, "Password not proided"],
  },
  headline: {
    type: String,
    default: "",
    maxlength: 60,
  },
  biography: {
    type: String,
    default: "",
  },
  linkedIn: {
    type: String,
    default: "",
  },
  youtube: {
    type: String,
    default: "",
  },
});

userSchema.pre("save", async function () {
  if (this.password !== "") {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  }
});

userSchema.methods.createJWT = async function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET
    // {
    //   expiresIn: process.env.JWT_LIFETIME,
    // }
  );
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const result = bcryptjs.compare(candidatePassword, this.password);
  return result;
};

export default mongoose.model("User", userSchema);
