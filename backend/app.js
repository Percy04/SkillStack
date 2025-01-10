import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import express from "express";

//Routes
import instructorRouter from './routes/instructor.js';
import authRouter from './routes/auth.js';

//Middleware
// import authenticateUser from './middleware/authentication.js';

dotenv.config();
const app = express();
app.use(express.json());



app.get("/", (req, res) => {
  res.send("I'm  great");
});

app.use('/auth', authRouter);
app.use('/instructor', instructorRouter);
// app.use('/auth', authenticateUser);


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
