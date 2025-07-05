// controllers/storeController.js
import Store from '../models/Store.js';
import Cashier from '../models/Cashier.js';
import StoreManager from '../models/StoreManager.js';

export const createStore = async (req, res) => {
  const {
    storeName,
    storeAddress,
    managerName,
    managerEmail,
    cashierName,
    cashierEmail
  } = req.body;

  if (!storeName || !storeAddress || !managerName || !managerEmail || !cashierName || !cashierEmail) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const store = await Store.create({
      storeName,
      storeAddress,
      managerName,
      managerEmail,
      cashierName,
      cashierEmail
    });

    const defaultPassword = 'groovy123';

    // Create Cashier
    const cashierExists = await Cashier.findOne({ email: cashierEmail });
    if (!cashierExists) {
      await Cashier.create({ name: cashierName, email: cashierEmail, password: defaultPassword });
    }

    // Create Manager
    const managerExists = await StoreManager.findOne({ email: managerEmail });
    if (!managerExists) {
      await StoreManager.create({ name: managerName, email: managerEmail, password: defaultPassword });
    }

    res.status(201).json({ message: 'Store and users created successfully', store });
  } catch (err) {
    console.error('Error creating store:', err);
    res.status(500).json({ message: 'Server error while creating store' });
  }
};
