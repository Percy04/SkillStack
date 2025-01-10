import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

export const register = async (req, res, next) => {
    const {full_name, email, password} = req.body;

    const nameParts = full_name.trim().split(' ');
    const first_name = nameParts[0] || '';
    const last_name = nameParts.slice(1).join(' ') || '';

    const user = await User.create({first_name, last_name, email, password});
    res.status(StatusCodes.CREATED).json({user: user.first_name});
}

export const login = (req, res, next) => {
    res.send("loggged in ");
}







