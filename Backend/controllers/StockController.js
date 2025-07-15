// controllers/stockController.js
import Stock from '../models/stockModel.js';

// Create a new product
export const addStockItem = async (req, res) => {
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
export const getAllStock = async (req, res) => {
  try {
    const items = await Stock.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a stock item by ID
export const getStockItemById = async (req, res) => {
  try {
    const item = await Stock.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update stock item
export const updateStockItem = async (req, res) => {
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
export const deleteStockItem = async (req, res) => {
  try {
    const deleted = await Stock.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
