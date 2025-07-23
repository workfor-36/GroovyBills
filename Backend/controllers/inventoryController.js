import Inventory from '../models/Inventory.js';
import AuditLog from '../models/AuditLog.js';
import Store from '../models/Store.js';

// Utility: Get store name for the user
const getUserStoreName = async (user, storeNameFromReq = null) => {
  if (user.role === 'admin') return storeNameFromReq;
  const store = await Store.findOne({ managerEmail: user.email });
  return store?.storeName;
};

// Utility: Check store existence
const storeExists = async (storeName) => {
  const store = await Store.findOne({ storeName });
  return !!store;
};

// Adjust stock
export const adjustStock = async (req, res) => {
  const { product, quantity, storeName: reqStore } = req.body;
  const storeName = await getUserStoreName(req.user, reqStore);

  if (!storeName || !(await storeExists(storeName))) {
    return res.status(400).json({ message: 'Store not found or unauthorized' });
  }

  try {
    const existing = await Inventory.findOne({ storeName, product });

    if (existing) {
      existing.quantity = quantity;
      existing.lastUpdated = Date.now();
      await existing.save();
    } else {
      await Inventory.create({ storeName, product, quantity });
    }

    await AuditLog.create({
      action: 'adjust',
      details: `Adjusted "${product}" in "${storeName}" to ${quantity}`,
      performedBy: req.user.id,
    });

    res.status(200).json({ message: 'Stock adjusted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to adjust stock', error: err.message });
  }
};

// Transfer stock
export const transferStock = async (req, res) => {
  const { fromStore: fromStoreReq, toStore, product, quantity } = req.body;
  const fromStore = await getUserStoreName(req.user, fromStoreReq);

  if (!fromStore || !(await storeExists(fromStore)) || !(await storeExists(toStore))) {
    return res.status(400).json({ message: 'Invalid source or destination store' });
  }

  try {
    const from = await Inventory.findOne({ storeName: fromStore, product });

    if (!from || from.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock in source store' });
    }

    // Deduct from source
    from.quantity -= quantity;
    from.lastUpdated = Date.now();
    await from.save();

    // Add to destination
    const to = await Inventory.findOne({ storeName: toStore, product });
    if (to) {
      to.quantity += quantity;
      to.lastUpdated = Date.now();
      await to.save();
    } else {
      await Inventory.create({ storeName: toStore, product, quantity });
    }

    await AuditLog.create({
      action: 'transfer',
      details: `Transferred ${quantity} of "${product}" from "${fromStore}" to "${toStore}"`,
      performedBy: req.user.id,
    });

    res.status(200).json({ message: 'Stock transferred successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Transfer failed', error: err.message });
  }
};

// Get audit logs (admin only)
export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .sort({ createdAt: -1 })
      .populate('performedBy', 'email');
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch audit logs', error: err.message });
  }
};

// Get inventory (admin sees all, manager sees assigned store)
export const getInventory = async (req, res) => {
  try {
    let inventory;

    if (req.user.role === 'admin') {
      inventory = await Inventory.find(); // Admin gets all inventory
    } else if (req.user.role === 'manager') {
      const store = await Store.findOne({ managerEmail: req.user.email });
      if (!store) return res.status(404).json({ message: 'Store not found' });

      inventory = await Inventory.find({ storeName: store.storeName });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Low stock alerts (threshold = 10)
export const getLowStockAlerts = async (req, res) => {
  try {
    const storeName = await getUserStoreName(req.user, req.query.storeName);

    if (!storeName || !(await storeExists(storeName))) {
      return res.status(400).json({ message: 'Invalid store or unauthorized access' });
    }

    const lowStockItems = await Inventory.find({ storeName, quantity: { $lte: 10 } });

    res.status(200).json(lowStockItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get low stock alerts', error: error.message });
  }
};
