// routes/billingRoutes.js
import express from 'express';
import { checkout } from '../controllers/billingController.js';
import { verifyCashier } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/checkout', verifyCashier, (req, res) => {
  res.json({ message: 'Authorized access' });
});

export default router;
