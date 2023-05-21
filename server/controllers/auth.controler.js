import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/auth.model.js';
export const authRouter = express.Router();

/**
 * Handles user registration.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password, repeatPassword } = req.body;
    if (!name || !email || !password || !repeatPassword)
      return res.status(400).json({
        errorMessage: 'Required field is missing',
      });
    if (password.length < 6)
      return res.status(400).json({
        errorMessage: 'At least 6 charachters are required',
      });
    if (password !== repeatPassword)
      return res.status(400).json({
        errorMessage: "Password hasn't been verified",
      });
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({
        errorMessage: 'This email has already been used to create an account',
      });
    const salt = await bcrypt.genSalt();
    const H_password = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      H_password,
    });
    const addingUser = await newUser.save();
    const secretKey = process.env.SE_KEY;
    const token = jwt.sign(
      {
        id: addingUser._id,
      },
      secretKey
    );
    res
      .cookie('token', token, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      })
      .send();
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Error! Something went went wrong!',
    });
  }
};

/**
 * Handles user login.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        error: 'Required field is missing',
      });
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(400).json({
        error: 'Wrong User Information',
      });
    const realPassword = await bcrypt.compare(
      password,
      existingUser.H_password
    );
    if (!realPassword)
      return res.status(400).json({
        error: 'Wrong User Information',
      });
    const Key = process.env.SE_KEY;

    const jsonToken = jwt.sign(
      {
        id: existingUser._id,
      },
      Key
    );

    res
      .cookie('token', jsonToken, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      })
      .send();
  } catch (error) {
    res.status(500).json({ error: 'Error! Something went wrong!!' });
  }
};
/**
 * Checks if the user is logged in based on the authentication token.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const loginedin = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ err: 'User not logged in' });
    const validatedUser = jwt.verify(token, process.env.SE_KEY);
    res.json({
      id: validatedUser.id,
    });
  } catch (error) {
    return res.json({ err: 'error!!!' });
  }
};

/**
 * Handles user logout by clearing the authentication token.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

export const logout = async (req, res) => {
  try {
    res
      .cookie('token', '', {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        expires: new Date(0),
      })
      .send();
  } catch (error) {
    res.json(null);
  }
};
