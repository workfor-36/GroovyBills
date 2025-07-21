import Customer from '../models/Customer.js';

// 🧾 Add or update customer during billing
export const addOrUpdateCustomer = async (customerData, billAmount) => {
  const { name, phone, email } = customerData;

  const existing = await Customer.findOne({ phone });

  if (existing) {
    existing.totalSpent += billAmount;
    existing.lastVisit = new Date();
    await existing.save();
    return existing;
  } else {
    const newCustomer = new Customer({
      name,
      phone,
      email,
      totalSpent: billAmount,
      lastVisit: new Date()
    });
    await newCustomer.save();
    return newCustomer;
  }
};

// 📊 Get all customers for frontend
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ lastVisit: -1 });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch customers', error: err.message });
  }
};

// ✏️ Edit customer details (optional)
export const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// 🗑 Delete customer
export const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed', error: err.message });
  }
};
