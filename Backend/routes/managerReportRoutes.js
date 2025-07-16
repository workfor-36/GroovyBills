import express from 'express';
import { getManagerReport } from '../controllers/managerReportController.js';
import { verifyManager } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyManager, getManagerReport);

export default router;
