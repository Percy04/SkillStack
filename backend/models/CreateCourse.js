import mongoose from "mongoose";

const createCourseSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

export default mongoose.model("CreateCourse", createCourseSchema);
