import express from 'express';
import { authenticate, verifyManager } from '../middleware/authMiddleware.js';
import { getManagerDashboard } from '../controllers/managerDashboardController.js';

const router = express.Router();

router.get('/manager', authenticate, verifyManager, getManagerDashboard);

export default router;
