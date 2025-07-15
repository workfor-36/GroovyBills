import StoreSummary from '../models/storeSummaryModel.js';

// Get all store summaries
export const getAllStoreSummaries = async (req, res) => {
  try {
    const summaries = await StoreSummary.find().sort({ store: 1 });
    res.json(summaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new store summary
export const addStoreSummary = async (req, res) => {
  try {
    const { store, sale, discount, cashcollection } = req.body;
    const newSummary = new StoreSummary({ store, sale, discount, cashcollection });
    await newSummary.save();
    res.status(201).json(newSummary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete store summary
export const deleteStoreSummary = async (req, res) => {
  try {
    const deleted = await StoreSummary.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Store summary not found' });
    res.json({ message: 'Store summary deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
