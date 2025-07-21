// controllers/adminController.js
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send as cookie
    res.cookie('token', token, {
      httpOnly: true,            // Ensures only the server can access the cookie (security feature)
      secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
      sameSite: 'strict',        // Prevent cross-site cookie sending (improves security)
      maxAge: 24 * 60 * 60 * 1000  // 1 day
    });

    res.status(200).json({ message: 'Admin login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during admin login' });
  }
};
