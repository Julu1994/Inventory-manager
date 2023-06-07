import express from 'express';
import {
  getDailyProductCount,
  getProductCount,
  getProductsCountByCategory,
  getProductsQuantity,
  getProductsType,
  getRemovedProductsPerDay,
  getTotalProductsQuantity,
} from '../controllers/admin.controler.js';
import { auth } from '../middleware/auth.js';
export const adminRoutes = express.Router();


adminRoutes.get('/admin/products-count', auth, getProductCount);
adminRoutes.get('/admin/daily-products-count', auth, getDailyProductCount);
adminRoutes.get('/admin/category-products-count', auth, getProductsCountByCategory);
adminRoutes.get('/admin/removed-products-count', auth, getRemovedProductsPerDay);
adminRoutes.get('/admin/products-quantity', auth, getProductsQuantity);
adminRoutes.get('/admin/products-type', auth, getProductsType);
adminRoutes.get('/admin/total-products-quantity', auth, getTotalProductsQuantity)
