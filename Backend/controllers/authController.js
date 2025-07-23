import Cashier from '../models/Cashier.js';
import StoreManager from '../models/StoreManager.js';
import jwt from 'jsonwebtoken';

const generateToken = (userId, role, store = null) => {
const payload = { id: userId, role, email }; // 👈 include email!
  if (store) payload.store = store;

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

export const loginCashier = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Cashier.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, 'cashier');

    res.cookie('cashier_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).json({
      message: 'Cashier login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: 'cashier'
      }
    });
  } catch (err) {
    console.error('Cashier login error:', err);
    res.status(500).json({ message: 'Server error during cashier login' });
  }
};

export const loginManager = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await StoreManager.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

const manager_token = generateToken(user._id, 'manager', user.email, user.store);

    res.cookie('manager_token', manager_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).json({
      message: 'Store Manager login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: 'manager',
        store: user.store
      }
    });
  } catch (err) {
    console.error('Manager login error:', err);
    res.status(500).json({ message: 'Server error during manager login' });
  }
};
