import express from "express";
const router = express.Router();

import {getCourses, getPublishCourse, createPublishCourse} from '../controllers/courses.js';

router.get('/course', getCourses);
router.post('/course/:courseId/manage/basics', createPublishCourse);
router.get('/courses', getPublishCourse);

export default router;




