import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getDailyProductCount,
  getProductCount,
  getProductsCountByCategory,
  getRemovedProductsPerDay,
} from '../controllers/admin.controler.js';
export const adminRoutes = express.Router();


adminRoutes.get('/admin/products-count', auth, getProductCount);
adminRoutes.get('/admin/daily-products-count', auth, getDailyProductCount);
adminRoutes.get('/admin/category-products-count', auth, getProductsCountByCategory);
adminRoutes.get('/admin/removed-products-count', auth, getRemovedProductsPerDay);
