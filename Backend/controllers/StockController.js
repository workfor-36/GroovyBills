const Stock = require('../models/stockModel');

// Create a new product
exports.addStockItem = async (req, res) => {
  try {
    const { name, category, size, color, quantity } = req.body;
    const stock = new Stock({ name, category, size, color, quantity });
    await stock.save();
    res.status(201).json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all stock items
exports.getAllStock = async (req, res) => {
  try {
    const items = await Stock.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a stock item by ID
exports.getStockItemById = async (req, res) => {
  try {
    const item = await Stock.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update stock item
exports.updateStockItem = async (req, res) => {
  try {
    const updated = await Stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Item not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete stock item
exports.deleteStockItem = async (req, res) => {
  try {
    const deleted = await Stock.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
