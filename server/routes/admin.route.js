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
import { verifyAdmin } from '../middleware/adminVerify.js';
export const adminRoutes = express.Router();


adminRoutes.get('/admin/products-count', verifyAdmin, getProductCount);
adminRoutes.get('/admin/daily-products-count', verifyAdmin, getDailyProductCount);
adminRoutes.get('/admin/category-products-count', verifyAdmin, getProductsCountByCategory);
adminRoutes.get('/admin/removed-products-count', verifyAdmin, getRemovedProductsPerDay);
adminRoutes.get('/admin/products-quantity', verifyAdmin, getProductsQuantity);
adminRoutes.get('/admin/products-type', verifyAdmin, getProductsType);
adminRoutes.get('/admin/total-products-quantity', verifyAdmin, getTotalProductsQuantity)
