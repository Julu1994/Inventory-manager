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
  editProducts,
  shrinkProducts,
} from '../controllers/products.controler.js';
export const route = express.Router();

route.post('/auth/signup', signup);
route.post('/auth/login', login);
route.get('/auth/loginedin', loginedin);
route.get('/auth/logout', logout);
route.post('/products/new-products', auth, addNewProducts);
route.delete('/products/remove-products', auth, removeProducts);
route.put('/products/update-products', auth, editProducts);
route.put('/products/shrink-products', auth, shrinkProducts);
