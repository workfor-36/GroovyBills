// models/Store.js
import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  storeAddress: { type: String, required: true },
  managerName: { type: String },
  managerEmail: { type: String  },
  cashierName: { type: String},
  cashierEmail: { type: String},
}, {
  timestamps: true
});

export default mongoose.model('Store', storeSchema);
