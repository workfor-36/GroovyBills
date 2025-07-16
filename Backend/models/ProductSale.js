import mongoose from 'mongoose';

const productSaleSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  productName: String,
  soldUnits: Number,
  gst: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('ProductSale', productSaleSchema);
