// controllers/authController.js
import Cashier from '../models/Cashier.js';
import StoreManager from '../models/StoreManager.js';
import jwt from 'jsonwebtoken';

const generateToken = (userId, role, store = null) => {
  const payload = { id: userId, role };
  if (store) payload.store = store; 

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};


export const loginCashier = async (req, res) => {
  const { email, password } = req.body;

  const user = await Cashier.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user._id, 'cashier');

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  });

  res.status(200).json({ message: 'Cashier login successful' });
};

export const loginManager = async (req, res) => {
  const { email, password } = req.body;

  const user = await StoreManager.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  

  const token = generateToken(user._id, 'manager', user.store); // ⬅️ Pass store ID

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  });

  res.status(200).json({ message: 'Store Manager login successful' });
};

