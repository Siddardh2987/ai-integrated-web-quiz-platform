import mongoose from "mongoose";

const conn = await mongoose.connect("mongodb://localhost:27017/QuizCraft");

export default conn;