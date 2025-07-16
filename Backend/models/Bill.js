import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  customerName: String,
  customerTotal: Number,
  itemsSold: Number,
  cashCollected: Number,
  gst: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Bill', billSchema);
