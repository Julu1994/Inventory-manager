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

        res.cookie("token", jToken, { httpOnly: true }).send(); //****/The most importent security thing  //httpOnly :true//****///
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

        realPassword = await bcrypt.compare(password, existingEmail.H_password);

        if (!realPassword)
            return res.status(400).json({
                error: "Wrong User Information",
            });

        //JWT Token

        const jToken = jwt.sign(
            {
                id: existingEmail._id,
            },
            process.env.SE_KEY
        );

        res.cookie("token", jToken, { httpOnly: true }).send(); //importent security: httpOnly :true//!!!
    } catch (error) {
        res.status(500).json({ error: "Error! Something went wrong!!" });
    }
});

authRouter.get("/loogedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(null);

        const validatedUser = jwtToken.verify(token, process.env.JWT_TOKEN);
        res.json({
            id: validatedUser.id,
        });
    } catch (error) {
        return res.json(null);
    }
});

authRouter.get("/logout", (req, res) => {
    try {
        res.clearCookie("token").send();
    } catch (error) {
        res.json(null);
    }
});
