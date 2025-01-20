import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { UnauthenticatedError, BadRequestError } from "../errors/index.js";
import passport from "passport";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
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
  res.status(StatusCodes.OK).json({ user: user.full_name, token });
};


export const googleAuthenticate = (req, res, next) => {
  // passport.authenticate(...) returns a middleware function
  // We must call it immediately with (req, res, next) so that it runs.
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
};

export const googleCallback = (req, res, next) => {
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "http://localhost:5173/login",
  })(req, res, next);
};
