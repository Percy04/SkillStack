import mongoose from "mongoose";

const planCourseSchema = new mongoose.Schema(
  {
    learningObjectives: {
      type: Array,
      default: ["", "", "", ""],
    },
    requirements: {
      type: Array,
      default: [""],
    },
    targetAudience: {
      type: Array,
      default: [""],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    index: {
      type: String,
      required: [true, "Enter collection index"],
    }
    // publishCourseId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "PublishCourse",
    //   required: [true, "Please enter connected Publish Course id"]
    // }
  },
  { timestamps: true }
);

export default mongoose.model("PlanCourse", planCourseSchema);
