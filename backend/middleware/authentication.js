import User from '../models/User.js';
import jwt from 'jsonwebtoken';

import {UnauthenticatedError} from "../errors/index.js";


const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    // throw new UnauthenticatedError('Authentication invalid')
    res.status(401).json({message: "Authentication invalid"})
    return;
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    // throw new UnauthenticatedError('Authentication invalid')
    res.status(403).json({message: "Invalid or expired"});
    return;
  }
}

export default auth;
