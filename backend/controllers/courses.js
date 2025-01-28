import PublishCourse from "../models/PublishCourse.js";
import CreateCourse from "../models/CreateCourse.js";
import PlanCourse from "../models/PlanCourse.js";
// import StatusCode from "http-status-codes";

export const createPublishCourse = async (req, res, next) => {
  try {
    const course = await PublishCourse.create({ title: "" });
    res.status(201).json({ courseId: course._id });
  } catch {
    console.log("Course couldn't be created");
    res.json({ message: "Course couldn't be created" });
  }
};

export const PublishCourseDetails = async (req, res, next) => {
  const courseId = req.params.courseId;
  try {
    const course = await PublishCourse.findById(courseId);
    if (!course) {
      res.status(401).json({ message: "Course not created/doesn't exist" });
    } else {
      console.log(course);
      res.status(201).json(course);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllPublishCourses = async (req, res, next) => {
  try {
    const courses = await PublishCourse.find({});
    // console.log("ID: " + courseId);
    res.status(201).json(courses);
  } catch (error) {
    res.json({ message: "No courses found" });
  }
};

export const updatePublishCourse = async (req, res, next) => {
  const courseId = req.params.courseId;
  const formData = req.body.formData;
  console.log("Req: ", req.body.formData);
  try {
    const courses = await PublishCourse.findOneAndReplace(
      { _id: courseId },
      formData
    );
    res.status(201).json({ courses });
  } catch (error) {
    console.log("nahi hua: " + error);
  }
};

export const updatePaymentPublishCourse = async (req, res, next) => {
  const courseId = req.params.courseId;
  const money = req.body.price;
  console.log(money);
  // const formData = req.body.formData;
  // console.log("Req: ", req.body.formData);
  try {
    const courses = await PublishCourse.findByIdAndUpdate(
      { _id: courseId },
      {price: money}
    );
    res.status(201).json({ courses });
  } catch (error) {
    console.log("nahi hua: " + error);
  } 
};
