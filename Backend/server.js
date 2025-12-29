import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import fs from 'fs';
import path from 'path';


mongoose.connect("mongodb://localhost:27017/QuizCraft"),{
    useNewUrlParser: true,
    useUnifiedTopology : true
}

const app = express();
const port = process.env.PORT || 3000;
const uploadsDir = path.join(process.cwd(), 'uploads', 'avatars');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : allowedOrigins ,credentials: true }));
app.use('/uploads', express.static('uploads'));

//API Endpoints

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.get('/' , (req, res)=>{
  res.send("API WORKING!!");
})


app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
