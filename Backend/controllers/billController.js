import Bill from '../models/Bill.js';

// 💾 Create a bill (by cashier)
export const createBill = async (req, res) => {
  const { invoiceNo, storeName, customer, products, total } = req.body;

  try {
    const bill = await Bill.create({
      invoiceNo,
      storeName,
      cashierEmail: req.user.email,
      customer,
      products,
      total,
      date: new Date()
    });

    res.status(201).json({ message: 'Bill created', bill });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create bill', error: err.message });
  }
};

// 📄 Get all bills by store (visible to cashier and manager)
export const getBillsByStore = async (req, res) => {
  const { storeName } = req.params;

  try {
    const bills = await Bill.find({ storeName }).sort({ date: -1 });
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bills', error: err.message });
  }
};
