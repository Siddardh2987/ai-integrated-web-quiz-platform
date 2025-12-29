import express from "express";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import {createUserProfile ,editUserProfile} from "../controllers/userController.js";
import {upload} from "../middleware/upload.js"

const userRouter = express.Router();

userRouter.post("/submit-profile",userAuth, upload.single("avatar"),createUserProfile);
userRouter.patch("/submit-profile",userAuth, upload.single("avatar"),editUserProfile);

export default userRouter;
