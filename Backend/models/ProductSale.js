import mongoose from 'mongoose';

const productSaleSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  productName: String,
  soldUnits: Number,
  gst: Number,
  category: { type: String, required: true },
  size: String,
  color: String,
  date: { type: Date, default: Date.now },
  visible: { type: Boolean, default: true }
});

export default mongoose.model('ProductSale', productSaleSchema);
