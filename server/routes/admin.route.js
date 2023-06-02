import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getProductCount,
} from '../controllers/products.controler.js';
export const adminRoutes = express.Router();


productsRoutes.get('/admin/products-count', auth, getProductCount);
