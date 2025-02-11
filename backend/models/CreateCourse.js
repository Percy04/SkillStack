import mongoose from "mongoose";

const createCourseSchema = new mongoose.Schema(
  {
    curriculum: {
      type: Array,
      default: [
        {
          id: Date.now(),
          title: "Introduction",
          lectures: [
            {
              id: 1,
              title: "Introduction",
              type: null,
              content: "",
              visible: false,
            },
          ],
        },
      ],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    index: {
      type: String,
      required: [true, "Enter collection index"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("CreateCourse", createCourseSchema);
