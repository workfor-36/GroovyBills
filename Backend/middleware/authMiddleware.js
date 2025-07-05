import jwt from 'jsonwebtoken';

export const protect = (role) => (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== role) throw new Error('Role mismatch');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' });
  }
};



// middlewares/authMiddleware.js


export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') throw new Error('Role mismatch');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' });
  }
};
