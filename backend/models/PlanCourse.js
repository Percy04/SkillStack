import mongoose from "mongoose";

const planCourseSchema = new mongoose.Schema(
  {
    learningObjectives: {
      type: Array,
    },
    requirements: {
      type: Array,
    },
    targetAudience: {
      type: Array,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("PlanCourse", planCourseSchema);
