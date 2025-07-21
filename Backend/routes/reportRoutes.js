import express from 'express';
import { getReportSummary } from '../controllers/reportController.js';
import { authenticate, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/summary', authenticate, verifyAdmin, getReportSummary);

export default router;
