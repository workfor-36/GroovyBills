import Bill from '../models/Bill.js';

export const getManagerDashboard = async (req, res) => {
  try {
    const storeName = req.user.storeName; // Assuming populated from JWT
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Fetch today's bills
    const todayBills = await Bill.find({
      storeName,
      createdAt: { $gte: todayStart }
    });

    const totalBillsToday = todayBills.length;
    const totalItemsSold = todayBills.reduce((sum, bill) =>
      sum + bill.products.reduce((s, p) => s + p.quantity, 0), 0
    );
    const cashCollected = todayBills.reduce((sum, bill) => sum + bill.totalAmount, 0);

    // Calculate product sales
    const productSales = {};
    todayBills.forEach(bill => {
      bill.products.forEach(({ name, quantity }) => {
        productSales[name] = (productSales[name] || 0) + quantity;
      });
    });

    const sortedProducts = Object.entries(productSales)
      .map(([name, sold]) => ({ name, sold }))
      .sort((a, b) => b.sold - a.sold);

    const topSellingProducts = sortedProducts.slice(0, 5);
    const lowSoldProducts = sortedProducts.slice(-5);

    res.status(200).json({
      totalBillsToday,
      totalItemsSold,
      cashCollected,
      topSellingProducts,
      lowSoldProducts
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load manager dashboard', error: err.message });
  }
};
