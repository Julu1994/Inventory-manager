import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  signup,
  login,
  loginedin,
  logout,
} from '../controllers/auth.controler.js';
import {
  addNewProducts,
  removeProducts,
  updateProducts,
} from '../controllers/products.controler.js';
export const route = express.Router();

route.post('/auth/signup', signup);
route.post('/auth/login', login);
route.get('/auth/loginedin', loginedin);
route.get('/auth/logout', logout);
route.get('/products/new-products', auth, addNewProducts);
route.get('/products/remove-products', auth, removeProducts);
route.get('/products/update-products', auth, updateProducts);
