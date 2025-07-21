import mongoose from 'mongoose';

const storeSummarySchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  sale: { type: Number, required: true },
  discount: { type: Number, required: true },
  cashcollection: { type: Number, required: true }
}, {
  timestamps: true
});

export default mongoose.model('StoreSummary', storeSummarySchema);
