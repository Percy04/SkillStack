import express from "express";
const router = express.Router();

import {updatePublishCourse, getAllPublishCourses, createPublishCourse, PublishCourseDetails, updatePaymentPublishCourse, updateMessagesPublishCourse} from '../controllers/courses.js';
import {updatePlanCourse, getPlanCourse, createPlanCourse} from "../controllers/courses.js";

// router.post('/course', createPublishCourse);
router.get('/publishcourse', createPublishCourse);
router.get('/plancourse', createPlanCourse);
router.get('/courses', getAllPublishCourses);
router.route('/course/:courseId/manage/goals').post(updatePlanCourse).get(getPlanCourse);
router.route('/course/:courseId/manage/basics').get(PublishCourseDetails).post(updatePublishCourse);
router.patch('/course/:courseId/manage/pricing', updatePaymentPublishCourse)
router.patch('/course/:courseId/manage/messages', updateMessagesPublishCourse)
// router.patch('http://localhost:5000/instructor/course/:courseId/manage/pricing', updatePaymentPublishCourse);

export default router;




