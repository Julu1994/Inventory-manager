import express from 'express';
import { ProductModel } from '../models/product.model.js';
import { QuantityChangeModel } from '../models/quantityChange.model.js';
import { RemovedProductModel } from '../models/removedProduct.model.js';
export const router = express.Router();

export const getProducts = async (req, res) => {
  try {
    const { offset = 0, limit = 10, type, catagory, name } = req.query;

    let query = { user: req.user };
    if (type) query.type = type;
    if (catagory) query.catagory = catagory;
    if (name) query.name = { $regex: name, $options: "i" };
    const total = await ProductModel.countDocuments(query);
    const data = await ProductModel.find(query).skip(+offset).limit(+limit);
    res.json({ data, total });
  } catch (error) {
    res.status(500).json({ error: 'Data not found!' });
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
    const quantityChange = new QuantityChangeModel({
      product: savedProduct._id,
      change: savedProduct.quantity,
    });

    await quantityChange.save();

    res.json(savedProduct);
  } catch (err) {
    res.status(500).send();
  }
};

export const removeProducts = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const productID = req.params.id;
    if (!productID)
      return res.status(400).json({
        error: 'Nothing to delete!',
      });
    const existedProduct = await ProductModel.findById(productID).session(session);
    if (!existedProduct)
      return res.status(400).json({
        error: 'Sorry!!! not found anything to delete....',
      });
    if (existedProduct.user.toString() !== req.user.toString()) {
      return res.status(400).json({
        error: 'Error! Unauthorised action',
      });
    }
    const quantityChange = new QuantityChangeModel({
      product: productID,
      change: -existedProduct.quantity,
    });
    await quantityChange.save({ session });

    await ProductModel.findByIdAndDelete(productID).session(session);

    const removedProduct = new RemovedProductModel({
      productId: productID,
      removedAt: new Date()
    });
    await removedProduct.save({ session });

    await session.commitTransaction();

    return res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (err) {
    await session.abortTransaction();
    console.log(err);
    return res.status(500).json({
      error: 'Something went wrong',
    });
  } finally {
    session.endSession();
  }
};

export const editProducts = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

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

    const existingProduct = await ProductModel.findById(productID).session(session);

    if (!existingProduct)
      return res.status(400).json({
        error: 'Error! Something went wrong',
      });
    if (existingProduct.user.toString() !== req.user) {
      return res.status(400).json({
        error: 'Error! Unauthorised action',
      });
    }

    const quantityDifference = quantity - existingProduct.quantity;

    const quantityChange = new QuantityChangeModel({
      product: productID,
      change: quantityDifference
    });
    await quantityChange.save({ session });

    existingProduct.name = name;
    existingProduct.details = details;
    existingProduct.price = price;
    existingProduct.quantity = quantity;
    existingProduct.location = location;
    existingProduct.catagory = catagory;
    existingProduct.type = type;
    existingProduct.url = url;

    const savedProduct = await existingProduct.save({ session });

    await session.commitTransaction();

    res.json(savedProduct);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ error: 'Error!! Something went wrong' });
  } finally {
    session.endSession();
  }
};

export const shrinkProducts = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { quantity } = req.body;
    const productID = req.params.id;
    if (!quantity) {
      return res.status(400).json({
        error: 'Required field is missing',
      });
    }
    if (!productID)
      return res.status(400).json({
        error: 'Error! Something went wrong',
      });

    const existingProduct = await ProductModel.findById(productID).session(session);

    if (!existingProduct)
      return res.status(400).json({
        error: 'Error! Something went wrong',
      });
    if (existingProduct.user.toString() !== req.user) {
      return res.status(400).json({
        error: 'Error! Unauthorised action',
      });
    }

    const oldQuantity = existingProduct.quantity;
    const newQuantity = parseInt(existingProduct.quantity) - parseInt(quantity);

    existingProduct.quantity = newQuantity;
    const savedProduct = await existingProduct.save({ session });
    const quantityChange = new QuantityChangeModel({
      product: productID,
      change: newQuantity - oldQuantity,
    });

    await quantityChange.save({ session });

    await session.commitTransaction();

    res.json(savedProduct);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ error: 'Error!! Something went wrong' });
  } finally {
    session.endSession();
  }
};

export const inboundProducts = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { quantity } = req.body;
    const productID = req.params.id;
    if (!quantity) {
      return res.status(400).json({
        error: 'Required field is missing',
      });
    }
    if (!productID)
      return res.status(400).json({
        error: 'Error! Something went wrong',
      });

    const existingProduct = await ProductModel.findById(productID).session(session);

    if (!existingProduct)
      return res.status(400).json({
        error: 'Error! Something went wrong',
      });
    if (existingProduct.user.toString() !== req.user) {
      return res.status(400).json({
        error: 'Error! Unauthorised action',
      });
    }

    const oldQuantity = existingProduct.quantity;
    const newQuantity = parseInt(existingProduct.quantity) + parseInt(quantity);
    existingProduct.quantity = newQuantity;
    const savedProduct = await existingProduct.save({ session });

    const quantityChange = new QuantityChangeModel({
      product: productID,
      change: newQuantity - oldQuantity,
    });

    await quantityChange.save({ session });

    await session.commitTransaction();

    res.json(savedProduct);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ error: 'Error!! Something went wrong' });
  } finally {
    session.endSession();
  }
};
