import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    details: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
    },
    category: {
      type: String,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['regular', 'discount', 'type3'],
    },
    url: {
      type: String,
    },
    user: {
      type: ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model('model', productSchema);
