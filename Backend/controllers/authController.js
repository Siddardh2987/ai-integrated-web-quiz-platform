// authController.js
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import userModel from '../models/usermodel.js';
import transporter from "../config/nodemailer.js";
import { WELCOME_EMAIL_TEMPLATE, EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';

const sendWelcomeEmail = async (name, email, role) => {
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: '🎉 Welcome to QuizCraft!',
        html: WELCOME_EMAIL_TEMPLATE
            .replace("{{name}}", name)
            .replace("{{email}}", email)
            .replace("{{role}}", role)
    };
    await transporter.sendMail(mailOptions);
};

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.json({
            success: false,
            message: 'All fields are required'
        });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({
                success: false,
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        await sendWelcomeEmail(user.name, user.email, user.role);

        res.json({
            success: true,
            message: 'Registration successful',
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isAccountVerified: user.isAccountVerified
            }
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: 'Email and password are required'
        });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isAccountVerified: user.isAccountVerified
            }
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const logout = async (req, res) => {
  try {
    return res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

export const sendVerifyOtp = async(req, res)=>{
    try{
        const userId = req.userId;

        const user = await userModel.findById(userId);

        if(!user){
             return res.json({ success: false, message: "User not found" });
        }
        if(user.isAccountVerified){
            return res.json({success:false,message:'Account already verified'})
        }

        const otp = String(Math.floor(100000+Math.random()*900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24*60*60*1000;
        
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to : user.email,
            subject:'🔐 Verify Your QuizCraft Account',
            html : EMAIL_VERIFY_TEMPLATE
                .replace("{{otp}}", otp)
                .replace("{{name}}", user.name)
                .replace("{{email}}", user.email)
       }

        await transporter.sendMail(mailOptions);
        return res.json({success:true , message: `Verification OTP sent on Email`});

    }catch(e){
        res.json({success:false,message:e.message});
    }
}

export const verifyEmail = async(req , res)=>{
    const {otp} = req.body;  
    const userId = req.userId;
    
    if(!userId || !otp){
        return res.json({success:false,message:'Missing Details'});
    }
    
    try{
        const user = await userModel.findById(userId);
        
        if(!user){
            return res.json({success:false,message:'No user found'});
        }

        if(user.verifyOtp !== otp){
            return res.json({success:false,message:'Invalid OTP'});
        }

        if(user.verifyOtpExpireAt < Date.now()){
             return res.json({success:false,message:'OTP expired'});
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        
        await user.save();
        return res.json({success:true,message:'Account Successfully Verified'});
        
    }catch(e){
        return res.json({success:false, message:e.message});
    }
}

export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "🔑 Reset Your QuizCraft Password",
      html : PASSWORD_RESET_TEMPLATE
          .replace("{{otp}}", otp)
          .replace("{{name}}", user.name)
          .replace("{{email}}", user.email)
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Reset OTP sent to email",
    });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOtp !== otp || user.resetOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};