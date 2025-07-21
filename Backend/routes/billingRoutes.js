// routes/billingRoutes.js
import express from 'express';
import { checkout } from '../controllers/billingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/checkout', protect('cashier'), checkout);

export default router;
