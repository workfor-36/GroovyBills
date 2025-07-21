// controllers/billingController.js
import Cart from '../models/cartModel.js';
import Stock from '../models/stockModel.js';

export const checkout = async (req, res) => {
  try {
    const { items, cashierEmail } = req.body;

    let total = 0;
    for (const item of items) {
      const stock = await Stock.findById(item.productId);
      if (!stock || stock.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${item.name}` });
      }

      // Subtract stock
      stock.quantity -= item.quantity;
      await stock.save();

      total += item.price * item.quantity;
    }

    // Save the cart (billing record)
    const cart = new Cart({ items, total, cashierEmail });
    await cart.save();

    res.status(200).json({ message: 'Checkout successful', bill: cart });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ message: 'Server error during checkout' });
  }
};
