import PublishCourse from "../models/PublishCourse.js";
import CreateCourse from "../models/CreateCourse.js";
import PlanCourse from "../models/PlanCourse.js";
// import StatusCode from "http-status-codes";

export const createPublishCourse = async (req, res, next) => {
  const formData = req.body.formData;
  const existingCourse = await PublishCourse.findOne({ title: formData.title });
  if (existingCourse) {
    res
      .status()
      .json({ message: "Course with this title exists with this title" });
  }

  try {
    const course = await PublishCourse.create(formData);
    res.status(201).json({ course });
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
      res.status(401).json({message:"Course not created/doesn't exist"});
    } else {
      console.log(course);
      res.status(201).json(course);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPublishCourse = async (req, res, next) => {
  const courseId = req.params.courseId;
  try {
    const courses = await PublishCourse.find({});
    console.log("ID: " + courseId);
    res.status(201).json(courses);
  } catch (error) {
    res.json({ message: "No courses found" });
  }
};

export const updatePublishCourse = async (req, res, next) => {};

export const getCourses = (req, res, next) => {
  res.send("yes");
};
