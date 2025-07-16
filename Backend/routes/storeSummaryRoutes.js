import express from 'express';
import {
  createStoreSummary,
  getAllStoreSummaries
} from '../controllers/storeSummaryController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Only admin can create summaries
router.post('/create', verifyAdmin, createStoreSummary);

// Accessible to any authenticated dashboard/report user
router.get('/', getAllStoreSummaries);

export default router;
