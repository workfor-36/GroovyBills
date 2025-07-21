import express from 'express';
import { authenticate, verifyUser, verifyAdmin } from '../middleware/authMiddleware.js';
import {
  getInventory,
  adjustStock,
  transferStock,
  getLowStockAlerts,
  getAuditLogs
} from '../controllers/inventoryController.js';

const router = express.Router();

// Authenticate all routes first
router.use(authenticate);

// Shared routes for admin + manager
router.post('/adjust', verifyUser, adjustStock);
router.post('/transfer', verifyUser, transferStock);
router.get('/', verifyUser, getInventory);
router.get('/low-stock', verifyUser, getLowStockAlerts);

// Admin-only route
router.get('/logs', verifyAdmin, getAuditLogs);

export default router;
