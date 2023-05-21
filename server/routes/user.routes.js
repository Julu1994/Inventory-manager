import express from 'express';
import {
  signup,
  login,
  loginedin,
  logout,
} from '../controllers/auth.controler.js';

export const userRoutes = express.Router();

userRoutes.post('/auth/signup', signup);
userRoutes.post('/auth/login', login);
userRoutes.get('/auth/loginedin', loginedin);
userRoutes.get('/auth/logout', logout);
