// routes/storeRoutes.js
import express from 'express';
import { createStore } from '../controllers/storeController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Only admin can create store
router.post('/create', verifyAdmin, createStore);

export default router;
