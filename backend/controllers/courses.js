import PublishCourse from "../models/PublishCourse.js";
import CreateCourse from "../models/CreateCourse.js";
import PlanCourse from "../models/PlanCourse.js";
// import StatusCode from "http-status-codes";

export const createPublishCourse = async (req, res, next) => {
  const createdBy = req.query.userId;
  const index = req.query.index;
  const name = req.query.name;
  // console.log("createdBY", req.query);
  try {
    const publishCourse = await PublishCourse.create({
      createdBy,
      index,
      instructor_name: name,
    });
    res.status(201).json({ publishCourse });
  } catch (error) {
    console.log("DB couldn't make Plan Course: ", error);
    res.json({ message: "Plan Course couldn't be created" });
  }
};

export const PublishCourseDetails = async (req, res, next) => {
  const courseId = req.params.courseId;
  const userId = req.query.userId;
  // console.log("hi: " , req.query.userId);
  try {
    const course = await PublishCourse.findOne({
      index: courseId,
      // createdBy: userId,
    });
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


//Get specific data of all courses for homepage
export const getAllCourses = async (req, res, next) => {
  const projections = {_id: 0, index: 1, title: 1, level: 1, category: 1, course_image_url: 1, price: 1, instructor_name: 1}
  try {
    const courses = await PublishCourse.find({published: true}, projections);
    res.status(201).json(courses);
  } catch (err) {
    res.json({message: "No courses found"});
  }
}


export const updatePublishCourse = async (req, res, next) => {
  const courseId = req.params.courseId;
  const formData = req.body.formData;
  console.log("FORM DATA Req: ", req.body.formData);
  try {
    //Ok so the reason replace works here is because in frontend im getting the whole document from db and then sending that whole doc here back
    const courses = await PublishCourse.findOneAndUpdate(
      { index: courseId },
      // { published: req.body.formData.published },
      formData,
      { new: true }
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
    const course = await PlanCourse.findOneAndReplace(
      { createdBy: req.body.formData.createdBy, index: req.params.courseId },
      req.body.formData
    );
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
      // createdBy: userId,
      index: courseId,
    });
    res.status(201).json(formData);
  } catch (error) {
    console.log("getPlanCourse, ", error);
    res.json({ message: "Error getting back plan course data" });
  }
};

//MESSAGES
export const updateMessagesPublishCourse = async (req, res, next) => {
  const courseId = req.params.courseId;
  const userId = req.body.messages.userId;
  // console.log("message: " , req.body.messages);
  // console.log("userId: " + userId);
  const welcome = req.body.messages.welcomeMessage;
  const congrats = req.body.messages.congratsMessage;

  // res.send("Hi");
  try {
    const courses = await PublishCourse.findOneAndUpdate(
      { index: courseId, 
        createdBy: userId 
      },
      { welcome_message: welcome, congratulations_message: congrats },
      { new: true }
    );
    res.status(201).json({ courses });
  } catch (error) {
    console.log("nahi hua: " + error);
    res.status(500).json({ message: "Error in updating message." });
  }
};

//CREATE COURSE
export const createCreateCourse = async (req, res, next) => {
  const createdBy = req.query.userId;
  const index = req.query.index;

  try {
    const createCourse = await CreateCourse.create({ createdBy, index });
    res.status(201).json({ createCourse });
  } catch (error) {
    console.log("DB couldn't make 'Create course'", error);
    res.json({ message: "Create course couldn't be created" });
  }
};

export const getCreateCourse = async (req, res, next) => {
  const courseId = req.params.courseId;
  // console.log("userid: " + req.query);
  const userId = req.query.userId;

  try {
    const createCourse = await CreateCourse.findOne({
      // createdBy: userId,
      index: courseId,
    });
    res.status(201).json( createCourse );
  } catch (error) {
    console.log("nahi hua: " + error);
    res.status(500).json({ message: "Error in updating message." });
  }
};

export const updateCreateCourse = async (req, res, next) => {
  const courseId = req.params.courseId;
  const userId = req.body.userId;
  console.log(req.body);
  console.log("CourseID: ", courseId);
  console.log("Curriculum: ", req.body.sections);
  const formData = req.body.sections;

  try {
    const course = await CreateCourse.findOneAndUpdate(
      {
        createdBy: userId,
        index: courseId,
      },
      { curriculum: req.body.sections },
      { new: true }
    );
    res.status(201).json({ course });
  } catch (error) {
    console.log("DB couldn't update create course", error);
    res.json({ message: "Create coures couldn't be created" });
  }
};
