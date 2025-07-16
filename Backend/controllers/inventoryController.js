import Inventory from '../models/Inventory.js';
import AuditLog from '../models/AuditLog.js';
import Store from '../models/Store.js';

// Helper to get the store based on role
const getUserStoreName = async (user, storeNameFromReq = null) => {
  if (user.role === 'admin') return storeNameFromReq;
  const store = await Store.findOne({ managerEmail: user.email });
  return store?.storeName;
};

// Adjust stock
export const adjustStock = async (req, res) => {
  const { product, quantity } = req.body;
  const storeName = await getUserStoreName(req.user, req.body.storeName);

  if (!storeName) return res.status(400).json({ message: 'Store not found or unauthorized' });

  try {
    const existing = await Inventory.findOne({ storeName, product });
    if (existing) {
      existing.quantity = quantity;
      await existing.save();
    } else {
      await Inventory.create({ storeName, product, quantity });
    }

    await AuditLog.create({
      action: 'adjust',
      details: `Adjusted ${product} in ${storeName} to ${quantity}`,
      performedBy: req.user.id,
    });

    res.status(200).json({ message: 'Stock adjusted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to adjust stock', error: err.message });
  }
};

// Transfer stock
export const transferStock = async (req, res) => {
  const { toStore, product, quantity } = req.body;
  const fromStore = await getUserStoreName(req.user, req.body.fromStore);

  if (!fromStore) return res.status(400).json({ message: 'Unauthorized or store not found' });

  try {
    const from = await Inventory.findOne({ storeName: fromStore, product });
    const to = await Inventory.findOne({ storeName: toStore, product });

    if (!from || from.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock in source store' });
    }

    from.quantity -= quantity;
    await from.save();

    if (to) {
      to.quantity += quantity;
      await to.save();
    } else {
      await Inventory.create({ storeName: toStore, product, quantity });
    }

    await AuditLog.create({
      action: 'transfer',
      details: `Transferred ${quantity} ${product} from ${fromStore} to ${toStore}`,
      performedBy: req.user.id,
    });

    res.status(200).json({ message: 'Stock transferred successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Transfer failed', error: err.message });
  }
};

// Get inventory by user's store or query
export const getInventory = async (req, res) => {
  try {
    const storeName = await getUserStoreName(req.user, req.query.storeName);
    if (!storeName) return res.status(400).json({ message: 'Unauthorized or store not found' });

    const data = await Inventory.find({ storeName });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch inventory', error: err.message });
  }
};

// Low stock alerts
export const getLowStockAlerts = async (req, res) => {
  const threshold = 5;
  try {
    const storeName = await getUserStoreName(req.user, req.query.storeName);
    if (!storeName) return res.status(400).json({ message: 'Unauthorized or store not found' });

    const alerts = await Inventory.find({
      storeName,
      quantity: { $lt: threshold },
    });
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch low stock alerts', error: err.message });
  }
};

// Get audit logs (only admin)
export const getAuditLogs = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can view audit logs' });
    }

    const logs = await AuditLog.find().sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs', error: err.message });
  }
};
