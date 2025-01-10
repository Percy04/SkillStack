import express from "express";
const router = express.Router();

import {getCourses} from '../controllers/instructor.js';

router.get('/course', getCourses);

export default router;




