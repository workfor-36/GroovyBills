import express from 'express';
import { getAdminDashboardData } from '../controllers/adminDashboardController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyAdmin, getAdminDashboardData);

export default router;
