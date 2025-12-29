import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user', 
      required: true,
      unique: true 
    },

    phoneNumber: { 
      type: String,
      required: true 
    },

    socialProfiles: {
      linkedin: { type: String },
      github: { type: String },
    },
    
    avatar: { 
      type: String, 
      default: null 
    },
  }, 
  { timestamps: true }
);

const userProfileModel = mongoose.models.userProfile || mongoose.model('userProfile', userProfileSchema);

export default userProfileModel;