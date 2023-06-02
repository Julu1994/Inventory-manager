import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const removedProductSchema = mongoose.Schema({
  productId: { type: ObjectId, required: true },
  removedAt: { type: Date, required: true },
});

export const RemovedProductModel = mongoose.model('RemovedProduct', removedProductSchema);
