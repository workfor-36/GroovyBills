import Inventory from '../models/Inventory.js';
import AuditLog from '../models/AuditLog.js';

// Adjust stock
export const adjustStock = async (req, res) => {
  const { storeName, product, quantity } = req.body;

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
      performedBy: req.user.id
    });

    res.status(200).json({ message: 'Stock adjusted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to adjust stock', error: err.message });
  }
};

// Transfer stock
export const transferStock = async (req, res) => {
  const { fromStore, toStore, product, quantity } = req.body;

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
      performedBy: req.user.id
    });

    res.status(200).json({ message: 'Stock transferred successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Transfer failed', error: err.message });
  }
};

// Get inventory
export const getInventory = async (req, res) => {
  try {
    const data = await Inventory.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch inventory' });
  }
};

// Get low stock alerts (e.g. threshold = 5)
export const getLowStockAlerts = async (req, res) => {
  const threshold = 5;
  try {
    const alerts = await Inventory.find({ quantity: { $lt: threshold } });
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch low stock alerts' });
  }
};

// Get audit logs
export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ date: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs' });
  }
};
