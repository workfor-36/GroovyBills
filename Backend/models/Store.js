import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  storeAddress: { type: String, required: true },

  managerName: { type: String, required: true },
  managerEmail: { type: String, required: true },

  cashierName: { type: String, required: true },
  cashierEmail: { type: String, required: true },
}, {
  timestamps: true
});

export default mongoose.model('Store', storeSchema);
