import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  product: {
    // CHANGED from productName
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Inventory", inventorySchema);
