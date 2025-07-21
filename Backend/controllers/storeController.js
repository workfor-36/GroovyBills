import Store from '../models/Store.js';
import Cashier from '../models/Cashier.js';
import StoreManager from '../models/StoreManager.js';

export const createStore = async (req, res) => {
  try {
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

    // 1. Check globally if cashier or manager email exists anywhere
    const cashierExists = await Cashier.findOne({ email: cashierEmail });
    const managerExists = await StoreManager.findOne({ email: managerEmail });

    if (cashierExists) {
      return res.status(400).json({ message: 'Cashier email already exists' });
    }

    if (managerExists) {
      return res.status(400).json({ message: 'Manager email already exists' });
    }

    // 2. Create the store first (without manager/cashier emails)
    const store = await Store.create({
      storeName,
      storeAddress
    });

    const defaultPassword = 'groovy123';

    // 3. Create cashier and manager with store reference
    await Cashier.create({
      name: cashierName,
      email: cashierEmail,
      password: defaultPassword,
      store: store._id
    });

    await StoreManager.create({
      name: managerName,
      email: managerEmail,
      password: defaultPassword,
      store: store._id
    });

    // 4. Update store with manager and cashier info
    store.managerName = managerName;
    store.managerEmail = managerEmail;
    store.cashierName = cashierName;
    store.cashierEmail = cashierEmail;

    await store.save();

    res.status(201).json({ message: 'Store and users created successfully', store });

  } catch (err) {
    console.error("❌ Error creating store:", err.message);
    res.status(500).json({ message: 'Server error while creating store' });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find().sort({ createdAt: -1 }); // simple fetch
    res.status(200).json(stores);
  } catch (err) {
    console.error("❌ Error fetching stores:", err.message);
    res.status(500).json({ message: 'Server error while fetching stores' });
  }
};



// controllers/storeController.js


export const updateManagerEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    // Check if the email is already taken by another manager
    const existingManager = await StoreManager.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ message: 'Manager email already exists' });
    }

    const manager = await StoreManager.findOneAndUpdate(
      { _id: id },
      { email },
      { new: true }
    );

    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    // Optionally, you can also update the store manager's email
    const store = await Store.findOneAndUpdate(
      { _id: manager.store },
      { managerEmail: email },
      { new: true }
    );

    res.status(200).json({ message: 'Manager email updated successfully', store, manager });
  } catch (err) {
    console.error("❌ Error updating manager email:", err.message);
    res.status(500).json({ message: 'Server error while updating manager email' });
  }
};

export const updateCashierEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    // Check if the email is already taken by another cashier
    const existingCashier = await Cashier.findOne({ email });
    if (existingCashier) {
      return res.status(400).json({ message: 'Cashier email already exists' });
    }

    const cashier = await Cashier.findOneAndUpdate(
      { _id: id },
      { email },
      { new: true }
    );

    if (!cashier) {
      return res.status(404).json({ message: 'Cashier not found' });
    }

    // Optionally, you can also update the store cashier's email
    const store = await Store.findOneAndUpdate(
      { _id: cashier.store },
      { cashierEmail: email },
      { new: true }
    );

    res.status(200).json({ message: 'Cashier email updated successfully', store, cashier });
  } catch (err) {
    console.error("❌ Error updating cashier email:", err.message);
    res.status(500).json({ message: 'Server error while updating cashier email' });
  }
};

