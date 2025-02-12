import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  instructor_name: {
    type: String,
    default: "",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  rating: {
    type: Number,
    default: "",
  },
  price: {
    type: Number,
    default: "",
  },
  course_image_url: {
    type: String,
    default: "",
  },
  promo_video_url: {
    type: String,
    default: "",
  },
  index: {
    type: String,
    default: "",
  },
  published: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("AllCourses", coursesSchema);
