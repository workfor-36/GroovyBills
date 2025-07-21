// routes/storeRoutes.js
import express from 'express';
import { createStore,getAllStores,updateManagerEmail, updateCashierEmail } from '../controllers/storeController.js';
import { authenticate, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply middleware to verify admin login
router.post('/create', authenticate, verifyAdmin, createStore);  // This route is now protected by authentication middleware
router.get('/all-stores', authenticate, verifyAdmin, getAllStores);


export default router;
