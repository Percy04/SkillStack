import express from "express";
const router = express.Router();
import {register, login, googleAuthenticate, googleCallback} from '../controllers/auth.js';
import passport from "passport";
import session from "express-session";

router.route('/register').post(register);
router.route('/login').post(login);

//Google routing
router.route('/google').get(googleAuthenticate)
router.route('/google/callback').get(googleCallback);


export default router