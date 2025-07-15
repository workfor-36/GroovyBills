import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, default: 0 }
});

export default mongoose.model('Inventory', inventorySchema);
