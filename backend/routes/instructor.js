import express from "express";
const router = express.Router();

import {updatePublishCourse, getAllPublishCourses, createPublishCourse, PublishCourseDetails, updatePaymentPublishCourse, updateMessagesPublishCourse} from '../controllers/courses.js';
import {updatePlanCourse, getPlanCourse, createPlanCourse} from "../controllers/courses.js";
import {createCreateCourse, updateCreateCourse, getCreateCourse} from "../controllers/courses.js";
import { getAllCourses } from "../controllers/courses.js";

router.get('/publishcourse', createPublishCourse);
router.get('/plancourse', createPlanCourse);
router.get('/createcourse', createCreateCourse);

router.get('/courses', getAllPublishCourses);

router.route('/course/:courseId/manage/goals').get(getPlanCourse).post(updatePlanCourse);
router.route('/course/:courseId/manage/basics').get(PublishCourseDetails).post(updatePublishCourse);
router.route('/course/:courseId/manage/curriculum').get(getCreateCourse).post(updateCreateCourse);

router.patch('/course/:courseId/manage/pricing', updatePaymentPublishCourse);
router.patch('/course/:courseId/manage/messages', updateMessagesPublishCourse);

router.get('/allcourses', getAllCourses)

export default router;
