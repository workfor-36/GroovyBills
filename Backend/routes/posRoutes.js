import express from 'express';
import { createBill } from '../controllers/posController.js';
import { authenticate, verifyUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/bill', authenticate, verifyUser, createBill);

export default router;
