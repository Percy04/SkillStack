import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { UnauthenticatedError, BadRequestError } from "../errors/index.js";

export const register = async (req, res, next) => {
  const { full_name, email, password } = req.body;

  const nameParts = full_name.trim().split(" ");
  const first_name = nameParts[0] || "";
  const last_name = nameParts.slice(1).join(" ") || "";

  const user = await User.create({ first_name, last_name, email, password });
  const token = await user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: user.first_name, token });
};

export const login = async (req, res, next) => {
  //For login I can either enter email and password or
  // Enter email and then send a private 6 digit number to the mail, which the user has to type in.

  // Email and password:
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError(
      "Email does not exist. Please Sign Up first."
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong Password");
  }

  // console.log(req.body);
  // console.log(user);

  const token = await user.createJWT();
  res.status(StatusCodes.OK).json({user: user.full_name, token})
};
