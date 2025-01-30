import express from "express";
const router = express.Router();

import {updatePublishCourse, getAllPublishCourses, createPublishCourse, PublishCourseDetails, updatePaymentPublishCourse} from '../controllers/courses.js';
import {updatePlanCourse} from "../controllers/courses.js";

router.post('/course', createPublishCourse);
router.get('/courses', getAllPublishCourses);
router.post('/course/:courseId/manage/goals', updatePlanCourse);
router.route('/course/:courseId/manage/basics').get(PublishCourseDetails).post(updatePublishCourse);
router.patch('/course/:courseId/manage/pricing', updatePaymentPublishCourse)
// router.patch('http://localhost:5000/instructor/course/:courseId/manage/pricing', updatePaymentPublishCourse);

export default router;




