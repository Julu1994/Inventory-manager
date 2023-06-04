import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const QuantityChangeSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    required: true,
  },
  change: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});
export const QuantityChangeModel = mongoose.model('QuantityChange', QuantityChangeSchema);
