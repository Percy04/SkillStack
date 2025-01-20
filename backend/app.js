import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

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
import authenticateUser from "./middleware/authentication.js";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSucessStatus: 200,
};

app.use(cors(corsOptions));

// app.get("/", (req, res) => {
//   res.send("Yes backend works");
// });

// setup session
app.use(
  // session settings
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

    //Verify callback once callbackURL is called
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        console.log("USER: ", user);

        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });

          await user.save();
        }

        const token = await user.createJWT();

        return done(null, { user, token });
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

app.get("/dashboard", authenticateUser, (req, res) => {
  res.json({ message: "Authenticated", user: req.user });
});

app.use("/auth", authRouter);
app.use("/instructor", authenticateUser, instructorRouter);

app.get("/login/success", async (req, res) => {
  console.log("reqqqq", req.user);
  if (req.user) {
    res.status(200).json({ message: "User login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

app.get("/logout", async (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);

    res.redirect("http://localhost:5173");
  });
});


// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware)

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
