import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  backFill,
  getDailyProductCount,
  getProductCount,
  getProductsCountByCategory,
  getProductsQuantity,
  getRemovedProductsPerDay,
} from '../controllers/admin.controler.js';
export const adminRoutes = express.Router();


adminRoutes.get('/admin/products-count', auth, getProductCount);
adminRoutes.get('/admin/daily-products-count', auth, getDailyProductCount);
adminRoutes.get('/admin/category-products-count', auth, getProductsCountByCategory);
adminRoutes.get('/admin/removed-products-count', auth, getRemovedProductsPerDay);
adminRoutes.get('/admin/total-products-quantity', auth, getProductsQuantity);
adminRoutes.post('/admin/back-fill', backFill);
