import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getDailyProductCount,
  getProductCount,
  getProductsCountByCategory,
  getProductsQuantity,
  getProductsType,
  getRemovedProductsPerDay,
} from '../controllers/admin.controler.js';
export const adminRoutes = express.Router();


adminRoutes.get('/admin/products-count', auth, getProductCount);
adminRoutes.get('/admin/daily-products-count', auth, getDailyProductCount);
adminRoutes.get('/admin/category-products-count', auth, getProductsCountByCategory);
adminRoutes.get('/admin/removed-products-count', auth, getRemovedProductsPerDay);
adminRoutes.get('/admin/total-products-quantity', auth, getProductsQuantity);
adminRoutes.get('/admin/total-products-quantity', auth, getProductsQuantity);
adminRoutes.get('/admin/products-type', auth, getProductsType);

