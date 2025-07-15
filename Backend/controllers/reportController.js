import Report from '../models/reportModel.js';

export const getLatestReport = async (req, res) => {
  try {
    const report = await Report.findOne().sort({ createdAt: -1 });
    if (!report) return res.status(404).json({ message: 'No reports found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Optional: addReport if you want to POST new reports
export const addReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
