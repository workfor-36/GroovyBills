import express from 'express';
import { createBill, getBillsByStore } from '../controllers/billController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authenticate, createBill);
router.get('/store/:storeName', authenticate, getBillsByStore);

export default router;
