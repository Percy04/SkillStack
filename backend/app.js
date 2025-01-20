import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());

// Google Signin
import User from "./models/User.js";
import session from "express-session";
import passport from "passport";
import OAuth from "passport-google-oauth2";
const OAuth2Strategy = OAuth.Strategy;



//Routes
import instructorRouter from "./routes/instructor.js";
import authRouter from "./routes/auth.js";

//Middleware
// import authenticateUser from './middleware/authentication.js';

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSucessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("I'm  great");
});

app.use("/auth", authRouter);
app.use("/instructor", instructorRouter);
// app.use('/auth', authenticateUser);

// setup session
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile)
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            first_name: profile.displayName,
            email: profile.emails[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// initial google oauth login
app.get("/auth/google", passport.authenticate("google", {scope:["profile", "email"]}));
app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:5173/dashboard",
  failureRedirect: "http://localhost:5173/login"
}))





const port = process.env.PORT || 5001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
