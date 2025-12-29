
import userModel from "../models/usermodel.js";
import userProfileModel from "../models/profile.js"
import cloudinary from "../config/cloudinary.js";

export const createUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { phoneNumber, socialProfiles } = req.body;

    const parsedSocialProfiles = typeof socialProfiles === 'string'? JSON.parse(socialProfiles): socialProfiles || {};

    if (!phoneNumber) {
      return res.json({ success: false, message: "Phone number is required" });
    }

    const existing = await userProfileModel.findOne({ userId });
    if (existing) {
      return res.json({
        success: false,
        message: "Profile already exists",
      });
    }

    let avatarUrl = null;

    if (req.file) {
      const buffer = req.file.buffer;

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "avatars" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
      avatarUrl = result.secure_url;
    }

    const profile = await userProfileModel.create({userId,phoneNumber,socialProfiles: parsedSocialProfiles,avatar: avatarUrl,});

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile created successfully",
      userData: {
        name: user.name,
        role: user.role,
        isAccountVerified: user.isAccountVerified,
      },
      profile,
    });
    
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
};


export const editUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const {name,email,phoneNumber,socialProfiles,avatar} = req.body;
    const user = await userModel
      .findById(userId)
      .populate("profile");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const profile = user.profile;

    if (!profile) {
      return res.json({ success: false, message: "Profile not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    if (phoneNumber) profile.phoneNumber = phoneNumber;

    if (socialProfiles) {
      profile.socialProfiles = {
        ...profile.socialProfiles,
        ...socialProfiles
      };
    }

    if (req.file) {
      const buffer = req.file.buffer;

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "avatars" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(buffer);
      });

      profile.avatar = result.secure_url;
    }

    await profile.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
      profile
    });

  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};
