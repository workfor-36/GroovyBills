// models/cartModel.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  cashierEmail: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
      name: String,
      quantity: Number,
      price: Number,
    }
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Cart', cartSchema);
