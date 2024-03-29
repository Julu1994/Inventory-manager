import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { productsRoutes } from './routes/products.routes.js';
import { userRoutes } from './routes/user.routes.js';
import { adminRoutes } from './routes/admin.route.js';
const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use('/api/v1', productsRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', adminRoutes);

mongoose.connect(process.env.DB_LINK, (err) => {
  if (err) return console.error(err);
  console.log('Succcessfully connected to MongoDB');
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
