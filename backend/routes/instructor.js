import express from "express";
const router = express.Router();

import {getCourses, getPublishCourse, createPublishCourse, PublishCourseDetails} from '../controllers/courses.js';

router.post('/course', createPublishCourse);
router.route('/course/:courseId/manage/basics').get(PublishCourseDetails)
router.get('/courses', getPublishCourse);

export default router;




