import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String },
  color: { type: String },
  quantity: { type: Number, required: true, default: 0 },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true }
}, {
  timestamps: true
});

const Stock = mongoose.model('Stock', stockSchema);
export default Stock;
