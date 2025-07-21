import Inventory from '../models/Inventory.js';
import Bill from '../models/Bill.js';

export const createBill = async (req, res) => {
  const { storeName, products } = req.body; // products = [{ productName, quantity, price }]
  
  try {
    const inventoryUpdates = [];

    for (const item of products) {
      const product = await Inventory.findOne({ storeName, productName: item.productName });

      if (!product || product.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${item.productName}` });
      }

      product.quantity -= item.quantity;
      inventoryUpdates.push(product.save());
    }

    await Promise.all(inventoryUpdates);

    const totalAmount = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const bill = await Bill.create({ storeName, products, totalAmount });

    res.status(201).json({ message: 'Bill created successfully', bill });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create bill', error: err.message });
  }
};
