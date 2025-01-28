import express from "express";
const router = express.Router();

import {updatePublishCourse, getAllPublishCourses, createPublishCourse, PublishCourseDetails} from '../controllers/courses.js';

router.post('/course', createPublishCourse);
router.route('/course/:courseId/manage/basics').get(PublishCourseDetails).post(updatePublishCourse);
router.get('/courses', getAllPublishCourses);

export default router;




