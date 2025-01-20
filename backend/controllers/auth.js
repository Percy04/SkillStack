import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { UnauthenticatedError, BadRequestError } from "../errors/index.js";
import passport from "passport";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const token = await user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: user.name, token });
};

export const login = async (req, res, next) => {
  // Email and password:
  const { email, password } = req.body;

  if (!email || !password) {
    // throw new BadRequestError("Please provide email and password");
    res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide email and password"})
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    // throw new UnauthenticatedError(
    //   "Email does not exist. Please Sign Up first."
    // );
    res.status(StatusCodes.BAD_REQUEST).json({message: "Email does not exist."})
    return;
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    // throw new UnauthenticatedError("Wrong Password");
    res.status(StatusCodes.BAD_REQUEST).json({message: "Wrong password"})
    return;
  }

  // console.log(req.body);
  // console.log(user);

  const token = await user.createJWT();
  res.status(StatusCodes.OK).json({ user: user.full_name, token });
};

export const googleAuthenticate = (req, res, next) => {
  // passport.authenticate(...) returns a middleware function
  // We must call it immediately with (req, res, next) so that it runs.
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
};

export const googleCallback = (req, res, next) => {
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "http://localhost:5173/login",
  })(req, res, next);
};
