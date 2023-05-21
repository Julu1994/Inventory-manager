import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  addNewProducts,
  removeProducts,
  editProducts,
  shrinkProducts,
  inboundProducts,
  getProducts,
} from '../controllers/products.controler.js';
export const productsRoutes = express.Router();

productsRoutes.get('/products/get-products', auth, getProducts);
productsRoutes.post('/products/new-products', auth, addNewProducts);
productsRoutes.delete('/products/remove-products/:id', auth, removeProducts);
productsRoutes.put('/products/update-products/:id', auth, editProducts);
productsRoutes.put('/products/shrink-products/:id', auth, shrinkProducts);
productsRoutes.put('/products/inbound-products/:id', auth, inboundProducts);
