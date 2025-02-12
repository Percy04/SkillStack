import mongoose from "mongoose";

const PublishCourseSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
    // minlength: 5,
    // required: [true, "Title not provided"]
  },
  subtitle: {
    default: "",
    type: String,
  },
  description: {
    default: "",
    type: String,
    // required: [true, "Description not provided"]
  },
  language: {
    default: "",
    type: String,
  },
  level: {
    default: "",
    type: String,
  },
  category: {
    default: "",
    type: String,
  },
  course_image_url: {
    default: "",
    type: String,
  },
  promo_video_url: {
    default: "",
    type: String,
  },
  price: {
    default: "",
    type: Number,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  index: {
    type: String,
    required: [true, "Please provide common index for all collections"],
  },
  welcome_message: {
    type: String,
    default: ""
  },
  congratulations_message: {
    type: String,
    default: ""
  }, 
  instructor_name: {
    type: String,
    default: ""
  }, 
  published: {
    type: Boolean, 
    default: false
  }
}, {timestamps:true});

export default mongoose.model("PublishCourse", PublishCourseSchema);
