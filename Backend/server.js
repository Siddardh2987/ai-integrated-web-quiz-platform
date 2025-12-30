import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js"; // FIXED: import from chatRoutes, not authRoutes
import fs from 'fs';
import path from 'path';


mongoose.connect("mongodb://localhost:27017/QuizCraft", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ MongoDB connected successfully');
}).catch((err) => {
    console.error('❌ MongoDB connection error:', err);
});

const app = express();
const port = process.env.PORT || 3000;
const uploadsDir = path.join(process.cwd(), 'uploads', 'avatars');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins ,credentials: true }));
app.use('/uploads', express.static('uploads'));

//API Endpoints
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/quiz', chatRouter); // FIXED: now using the correct chatRouter

app.get('/', (req, res) => {
    res.json({ 
        message: "API WORKING!!", 
        endpoints: {
            auth: '/api/auth',
            user: '/api/user',
            quiz: '/api/quiz'
        }
    });
});


app.listen(port, () => {
    console.log(`
🌍 Environment: ${process.env.NODE_ENV || 'development'}
Server started on PORT: ${port}
    `);
});