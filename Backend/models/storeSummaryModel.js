import mongoose from 'mongoose';

const storeSummarySchema = new mongoose.Schema({
  store: { type: String, required: true },
  sale: { type: Number, required: true },
  discount: { type: Number, required: true },
  cashcollection: { type: Number, required: true }
}, {
  timestamps: true
});

const StoreSummary = mongoose.model('StoreSummary', storeSummarySchema);
export default StoreSummary;
