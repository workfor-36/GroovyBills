import Bill from '../models/Bill.js';
import Inventory from '../models/Inventory.js';
import Store from '../models/Store.js';

export const getReportSummary = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today.setDate(today.getDate() - 7));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [dailySales, weeklySales, monthlySales, allBills] = await Promise.all([
      Bill.aggregate([{ $match: { createdAt: { $gte: startOfDay } } }, { $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
      Bill.aggregate([{ $match: { createdAt: { $gte: startOfWeek } } }, { $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
      Bill.aggregate([{ $match: { createdAt: { $gte: startOfMonth } } }, { $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
      Bill.find()
    ]);

    const gstCollected = allBills.reduce((sum, b) => sum + (b.gstAmount || 0), 0);
    const gstPending = gstCollected * 0.15;

    const inventory = await Inventory.find();
    const turnoverRate = inventory.length
      ? ((inventory.reduce((sum, item) => sum + (item.turnoverCount || 0), 0) / inventory.length) * 100).toFixed(1) + '%'
      : '0%';

    const restocksThisMonth = inventory.reduce((sum, item) => sum + (item.restocks || 0), 0);

    const productSales = {};
    const customerSpending = {};

    allBills.forEach(bill => {
      bill.products.forEach(p => {
        productSales[p.name] = (productSales[p.name] || 0) + p.quantity;
      });
      customerSpending[bill.customerName || 'Anonymous'] = (customerSpending[bill.customerName || 'Anonymous'] || 0) + bill.totalAmount;
    });

    const topProducts = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => name);

    const highValueCustomers = Object.entries(customerSpending)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => name);

    const stores = await Store.find();
    const totalRevenue = allBills.reduce((sum, b) => sum + b.totalAmount, 0);
    const avgDailySales = (totalRevenue / (new Date().getDate() || 1)).toFixed(2);

    res.status(200).json({
      sales: {
        daily: dailySales[0]?.total || 0,
        weekly: weeklySales[0]?.total || 0,
        monthly: monthlySales[0]?.total || 0
      },
      tax: {
        gstCollected,
        gstPending
      },
      inventory: {
        turnoverRate,
        restocksThisMonth
      },
      insights: {
        topProducts,
        highValueCustomers
      },
      analytics: {
        stores: stores.length,
        totalRevenue,
        avgDailySales
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load store report', error: err.message });
  }
};
