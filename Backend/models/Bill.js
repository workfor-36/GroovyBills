import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  cashierEmail: { type: String, required: true },
  invoiceNo: { type: String, required: true, unique: true },
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  customerName: {
    name: String,
    phone: String,
    email: String
  },
  customerTotal: Number,
  itemsSold: Number,
  cashCollected: Number,
  gst: Number,
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now }
},{
  timestamps: true
});

export default mongoose.model('Bill', billSchema);
