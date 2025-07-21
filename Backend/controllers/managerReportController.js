import Bill from '../models/Bill.js';
import ProductSale from '../models/ProductSale.js';
import Store from '../models/Store.js';

export const getManagerReport = async (req, res) => {
  try {
    const managerEmail = req.user.email; // Comes from auth middleware
    const store = await Store.findOne({ managerEmail });

    if (!store) return res.status(404).json({ message: 'Store not found for this manager' });

    const { _id: storeId } = store;

    // 1. Sales & GST Data
    const sales = await Bill.find({ storeId });
    const salesData = sales.map(bill => ({
      date: bill.createdAt.toISOString().split('T')[0],
      totalSales: bill.totalAmount,
      gst: bill.gst
    }));

    // 2. Inventory Turnover
    const inventory = await ProductSale.find({ storeId });
    const inventoryMap = new Map();
    for (const item of inventory) {
      const key = item.productName;
      if (!inventoryMap.has(key)) {
        inventoryMap.set(key, { product: key, sold: 0, restocked: 0 });
      }
      inventoryMap.get(key).sold += item.sold;
      inventoryMap.get(key).restocked += item.restocked;
    }
    const inventoryTurnover = Array.from(inventoryMap.values());

    // 3. Top Products
    const topProducts = await ProductSale.aggregate([
      { $match: { storeId } },
      { $group: { _id: "$productName", unitsSold: { $sum: "$sold" } } },
      { $sort: { unitsSold: -1 } },
      { $limit: 5 }
    ]).then(res => res.map(r => ({ name: r._id, unitsSold: r.unitsSold })));

    // 4. High-Value Customers (based on totalAmount)
    const customerMap = new Map();
    for (const bill of sales) {
      if (!bill.customerName || !bill.totalAmount) continue;
      if (!customerMap.has(bill.customerName)) {
        customerMap.set(bill.customerName, 0);
      }
      customerMap.set(bill.customerName, customerMap.get(bill.customerName) + bill.totalAmount);
    }
    const topCustomers = Array.from(customerMap.entries())
      .map(([name, totalSpent]) => ({ name, totalSpent }))
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);

    res.json({
      salesData,
      inventoryTurnover,
      topProducts,
      topCustomers
    });

  } catch (error) {
    console.error('Manager Report Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
