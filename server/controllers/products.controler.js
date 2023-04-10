import express from 'express';
import { auth } from '../middleware/auth.js';
import { ProductModel } from '../models/productModel.js';
export const router = express.Router();

export const getProducts = async (req, res) => {
  try {
    console.log(req.user);
    const data = await ProductModel.find({ user: req.user });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Not found data!' });
  }
};

export const addNewProducts = async (req, res) => {
  try {
    const { name, details, price, quantity, location, catagory, type, url } =
      req.body;
    if (!name || !price || !quantity || !type) {
      return res.status(400).json({ error: 'Required input field is missing' });
    }
    const newProduct = new ProductModel({
      name,
      details,
      price,
      quantity,
      location,
      catagory,
      type,
      url,
      user: req.user,
    });
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).send();
  }
};

export const removeProducts = async (req, res) => {
  try {
    const productID = req.params.id;
    if (!productID)
      return res.status(400).json({
        error: 'Nothing to delete!',
      });
    const existedProduct = await ProductModel.findById(productID);
    if (!existedProduct)
      return res.status(400).json({
        error: 'Sorry!!! not found anything to delete....',
      });
    if (existedProduct.user.toString() !== req.user) {
      //console.log(existedProduct.user.toString() !== req.user);
      return res.status(400).json({
        error: 'Error! Unauthorised action',
      });
    }

    await existedProduct.delete();
    res.json(existedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error! Something went wrong' });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const { name, details, price, quantity, location, catagory, type, url } =
      req.body;
    const productID = req.params.id;
    if (!name || !price || !quantity || !type) {
      return res.status(400).json({
        error: 'Required field is missing',
      });
    }

    if (!productID)
      return res.status(400).json({
        error: 'Error! Something went wrong',
      });

    const existingProduct = await ProductModel.findById(productID);

    if (!existingProduct)
      return res.status(400).json({
        error: 'Error! Something went wrong',
      });
    if (existingProduct.user.toString() !== req.user) {
      return res.status(400).json({
        error: 'Error! Unauthorised action',
      });
    }

    existingProduct.name = name;
    existingProduct.details = details;
    existingProduct.price = price;
    existingProduct.quantity = quantity;
    existingProduct.location = location;
    existingProduct.catagory = catagory;
    existingProduct.type = type;
    existingProduct.url = url;

    const savedProduct = await existingProduct.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ errore: 'Error!! Something went worong' });
  }
};
