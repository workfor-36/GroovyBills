const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String },
  color: { type: String },
  quantity: { type: Number, required: true, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Stock', stockSchema);
