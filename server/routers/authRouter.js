import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/authModel.js";
export const authRouter = express.Router();

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
        const secretKey = process.env.SE_KEY;

        const jToken = jwt.sign(
            {
                id: addingUser._id,
            },
            secretKey
        );

        res.cookie("token", jToken, {
            sameSite: "none",
            secure: true,
            httpOnly: true,
        }).send(); //****/The most importent security thing  //httpOnly :true//****///
    } catch (error) {
        res.status(500).json({
            errorMessage: "Error! Something went went wrong!",
        });
    }
});
authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({
                error: "Required field is missing",
            });
        //User account
        const existingEmail = await User.findOne({ email });
        if (!existingEmail)
            return res.status(400).json({
                error: "Wrong User Information",
            });

        const realPassword = await bcrypt.compare(
            password,
            existingEmail.H_password
        );
        if (!realPassword)
            return res.status(400).json({
                error: "Wrong User Information",
            });

        //JWT Token
        const Key = process.env.SE_KEY;

        const jsonToken = jwt.sign(
            {
                id: existingEmail._id,
            },
            Key
        );

        res.cookie("token", jsonToken, {
            sameSite: "none",
            secure: true,
            httpOnly: true,
        }).send();
    } catch (error) {
        res.status(500).json({ error: "Error! Something went wrong!!" });
    }
});

authRouter.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json({ err: "no token" });

        const validatedUser = jwt.verify(token, process.env.SE_KEY);
        res.json({
            id: validatedUser.id,
        });
    } catch (error) {
        return res.json({ err: "error!!!" });
    }
});

authRouter.get("/logout", (req, res) => {
    try {
        res.cookie("token", "", {
            sameSite: "none",
            secure: true,
            httpOnly: true,
            expires: new Date(0),
        }).send();
    } catch (error) {
        res.json(null);
    }
});
