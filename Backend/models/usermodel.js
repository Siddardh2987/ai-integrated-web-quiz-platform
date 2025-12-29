import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String, 
    enum: ['admin', 'user'], 
    default: 'user'
  },
  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
  quizzesCreated: { type: Number, default: 0 },
  quizzesAttempted: { type: Number, default: 0 }
}, { timestamps: true });

userSchema.virtual("profile", {
  ref: "userProfile",
  localField: "_id",
  foreignField: "userId",
  justOne: true
});

userSchema.virtual("createdQuizzes", {
  ref: "quiz",
  localField: "_id",
  foreignField: "createdBy"
});

userSchema.virtual("attempts", {
  ref: "attempt",
  localField: "_id",
  foreignField: "userId"
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

const userModel =mongoose.model('user', userSchema);

export default userModel;