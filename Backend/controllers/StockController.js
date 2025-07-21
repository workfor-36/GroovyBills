import Stock from '../models/stockModel.js';
import Store from '../models/Store.js';

// Create stock item
export const addStockItem = async (req, res) => {
  try {
    const { name, category, size, color, quantity, storeId } = req.body;

    // Admin can choose any store; manager must use their own store
    const user = req.user;

    if (user.role === 'manager' && user.store.toString() !== storeId) {
      return res.status(403).json({ message: 'Managers can only add stock to their own store' });
    }

    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    const stock = new Stock({ name, category, size, color, quantity, store: storeId });
    await stock.save();
    res.status(201).json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all stock for a store (admin or manager-specific)
export const getAllStock = async (req, res) => {
  try {
    const storeId = req.user.role === 'admin' ? req.query.storeId : req.user.store;
    const items = await Stock.find({ store: storeId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get stock item by ID (only if it belongs to user's store)
export const getStockItemById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Item not found" });

    if (req.user.role === 'manager' && stock.store.toString() !== req.user.store) {
      return res.status(403).json({ message: "Access denied to this stock" });
    }

    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update stock item
export const updateStockItem = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Item not found" });

    if (req.user.role === 'manager' && stock.store.toString() !== req.user.store) {
      return res.status(403).json({ message: "Access denied to update this stock" });
    }

    Object.assign(stock, req.body);
    await stock.save();
    res.json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete stock item
export const deleteStockItem = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Item not found" });

    if (req.user.role === 'manager' && stock.store.toString() !== req.user.store) {
      return res.status(403).json({ message: "Access denied to delete this stock" });
    }

    await stock.remove();
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
