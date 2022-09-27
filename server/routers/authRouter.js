import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/authModel.js";
export const authRouter = express.Router();
dotenv.config();

authRouter.post("/", async (req, res) => {
    try {
        const { name, email, password, confirm } = req.body;
        if (!name || !email || !password || !confirm)
            return res.status(400).json({
                errorMessage: "Required field is missing",
            });
        if (password.length < 6)
            return res.status(400).json({
                errorMessage: "At least 6 charachters are required",
            });

        if (password !== confirm)
            return res.status(400).json({
                errorMessage: "Password hasn't been varified",
            });
        //Checking existing emails
        const existingEmail = await User.findOne({ email });
        if (existingEmail)
            return res.status(400).json({
                errorMessage:
                    "This email has already been used to create an account",
            });

        //passsword

        const salt = await bcrypt.genSalt();
        const H_password = await bcrypt.hash(password, salt);

        //Adding User

        const newUser = new User({
            name,
            email,
            H_password,
        });

        const addingUser = await newUser.save();

        //JWT Token

        const jToken = jwt.sign(
            {
                id: addingUser._id,
            },
            process.env.JWT_TOKEN
        );

        res.cookie("token", jToken, { httpOnly: true }).send(); //The most importent security thing  //__httpOnly :true__//
    } catch (error) {
        res.status(500).json({ errorMessage: "Sorry!!! not found your data" });
    }
});
