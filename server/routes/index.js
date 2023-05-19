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
  inboundProducts,
  getProducts,
} from '../controllers/products.controler.js';
export const route = express.Router();

route.post('/auth/signup', signup);
route.post('/auth/login', login);
route.get('/auth/loginedin', loginedin);
route.get('/auth/logout', logout);
route.get('/products/get-products', auth, getProducts);
route.post('/products/new-products', auth, addNewProducts);
route.delete('/products/remove-products/:id', auth, removeProducts);
route.put('/products/update-products/:id', auth, editProducts);
route.put('/products/shrink-products/:id', auth, shrinkProducts);
route.put('/products/inbound-products/:id', auth, inboundProducts);
