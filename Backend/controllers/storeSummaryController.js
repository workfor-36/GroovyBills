import StoreSummary from '../models/storeSummaryModel.js';
import Store from '../models/Store.js';

// Create store summary (only if store exists)
export const createStoreSummary = async (req, res) => {
  try {
    const { storeId, sale, discount, cashcollection } = req.body;

    if (!storeId || sale == null || discount == null || cashcollection == null) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the store exists
    const storeExists = await Store.findById(storeId);
    if (!storeExists) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const summary = await StoreSummary.create({
      storeId,
      sale,
      discount,
      cashcollection
    });

    res.status(201).json({ message: 'Store summary created', summary });
  } catch (err) {
    console.error('Error creating store summary:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all summaries with store details
export const getAllStoreSummaries = async (req, res) => {
  try {
    const summaries = await StoreSummary.find()
      .populate('storeId', 'storeName storeAddress')  // include only specific fields
      .sort({ createdAt: -1 });

    res.json(summaries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
