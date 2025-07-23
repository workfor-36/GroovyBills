import jwt from 'jsonwebtoken';

// Middleware to verify JWT from any role (admin, manager, cashier)
export const authenticate = (req, res, next) => {
  const token =
    req.cookies.admin_token ||
    req.cookies.manager_token ||
    req.cookies.cashier_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = decoded; // { id, role, store (optional) }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

// Role check: Admin or Manager
export const verifyUser = (req, res, next) => {
  if (!req.user || !['admin', 'manager'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied: Admin or Manager only' });
  }
  next();
};

// Cashier-only route
export const verifyCashier = (req, res, next) => {
  if (!req.user || req.user.role !== 'cashier') {
    return res.status(403).json({ message: 'Access denied: Cashier role required' });
  }
  next();
};

// Admin-only route
export const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admin only' });
  }

  // ✅ Log confirmation if user is admin
  console.log('✅ Admin verified:', req.user.email);
  next();
};


// Manager-only route
export const verifyManager = (req, res, next) => { 
  if (!req.user || req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Access denied: Manager only' });
  }
  next();
};
