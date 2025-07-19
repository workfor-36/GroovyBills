// routes/storeRoutes.js
import express from 'express';
import { createStore } from '../controllers/storeController.js';
import {authenticate, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Only admin can create store
router.post('/create', authenticate,verifyAdmin, createStore);

export default router;
