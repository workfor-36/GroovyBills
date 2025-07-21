import Bill from '../models/Bill.js';
import ProductSale from '../models/ProductSale.js';
import mongoose from 'mongoose';

export const getAdminDashboardData = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Bills
    const billsToday = await Bill.find({
      date: { $gte: todayStart, $lte: todayEnd }
    });

    const totalBillsToday = billsToday.length;
    const totalItemsSold = billsToday.reduce((acc, b) => acc + (b.itemsSold || 0), 0);
    const cashCollected = billsToday.reduce((acc, b) => acc + (b.cashCollected || 0), 0);

    // Product Sales
    const productSalesToday = await ProductSale.aggregate([
      {
        $match: {
          date: { $gte: todayStart, $lte: todayEnd }
        }
      },
      {
        $group: {
          _id: '$productName',
          sold: { $sum: '$soldUnits' }
        }
      },
      { $sort: { sold: -1 } }
    ]);

    const topSellingProducts = productSalesToday.slice(0, 5).map(p => ({
      name: p._id,
      sold: p.sold
    }));

    const lowSoldProducts = productSalesToday.slice(-5).map(p => ({
      name: p._id,
      sold: p.sold
    }));

    res.json({
      totalBillsToday,
      totalItemsSold,
      cashCollected: `₹${cashCollected.toLocaleString()}`,
      topSellingProducts,
      lowSoldProducts
    });

  } catch (err) {
    console.error('Admin Dashboard Error:', err);
    res.status(500).json({ message: 'Failed to fetch admin dashboard data' });
  }
};
