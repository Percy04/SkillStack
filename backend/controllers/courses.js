import PublishCourse from "../models/PublishCourse.js";
import CreateCourse from "../models/CreateCourse.js";
import PlanCourse from "../models/PlanCourse.js";
// import StatusCode from "http-status-codes";

export const createPublishCourse = async (req, res, next) => {
  const createdBy = req.query.userId;
  const index = req.query.index;
  // console.log("createdby + index: " + createdBy + " " + index);
  try {
    const publishCourse = await PublishCourse.create({ createdBy, index });
    res.status(201).json({ publishCourse });
  } catch (error) {
    console.log("DB couldn't make Plan Course: ", error);
    res.json({ message: "Plan Course couldn't be created" });
  }
};

export const PublishCourseDetails = async (req, res, next) => {
  const courseId = req.params.courseId;
  // console.log("hi: " + courseId);
  try {
    const course = await PublishCourse.findOne({index: courseId});
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

// Display all courses created by specific instructor
export const getAllPublishCourses = async (req, res, next) => {
  const userId = req.query.userId;
  try {
    const courses = await PublishCourse.find({ createdBy: userId });
    // console.log("ID: " + courseId);
    res.status(201).json(courses);
  } catch (error) {
    res.json({ message: "No courses found" });
  }
};

export const updatePublishCourse = async (req, res, next) => {
  const courseId = req.params.courseId;
  const formData = req.body.formData;
  // console.log("Req: ", req.body.formData);
  try {
    const courses = await PublishCourse.findOneAndReplace(
      { index: courseId },
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
  // console.log(money);
  // const formData = req.body.formData;
  // console.log("Req: ", req.body.formData);
  try {
    const courses = await PublishCourse.findOneAndUpdate(
      { index: courseId },
      { price: money }
    );
    res.status(201).json({ courses });
  } catch (error) {
    console.log("nahi hua: " + error);
  }
};

//PLAN COURSE
export const createPlanCourse = async (req, res, next) => {
  const createdBy = req.query.userId;
  const courseId = req.query.index;
  // console.log('hi');
  try {
    const course = await PlanCourse.create({ createdBy, index: courseId });
    res.status(201).json({ course });
  } catch (error) {
    console.log("DB couldn't make Plan Course: ", error);
    res.json({ message: "Plan Course couldn't be created" });
  }
};

export const updatePlanCourse = async (req, res, next) => {
  // console.log("PLAN: " , req.body.formData);
  // console.log("INDEX: " + req.params.courseId);

  try {
    // const course = await PlanCourse.create(req.body.formData);
    const course = await PlanCourse.findOneAndReplace({createdBy: req.body.formData.createdBy, index: req.params.courseId}, req.body.formData);
    res.status(201).json({ course });
  } catch (error) {
    console.log("DB couldn't make Plan Course: ", error);
    res.json({ message: "Plan Course couldn't be created" });
  }
};

export const getPlanCourse = async (req, res, next) => {
  const courseId = req.params.courseId;
  const userId = req.query.userId;
  // console.log("query: ", req.query);
  // console.log("CourseID: " + courseId);
  try {
    const formData = await PlanCourse.findOne({
      createdBy: userId,
      index: courseId,
    });
    res.status(201).json(formData);
  } catch (error) {
    console.log("getPlanCourse, ", error);
    res.json({ message: "Error getting back plan course data" });
  }
};
