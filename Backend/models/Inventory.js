import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  category: String,
  size: String,
  color: String,
  restocks: {type: Number},
  turnoverCount: {type: Number},
visible: { type: Boolean, default: true }
},{ timestamps: true });
inventorySchema.index({ storeName: 1, productName: 1 }, { unique: true });

export default mongoose.model('Inventory', inventorySchema);
