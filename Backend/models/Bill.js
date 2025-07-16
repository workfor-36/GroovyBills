import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  itemsSold: Number,
  cashCollected: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Bill', billSchema);
