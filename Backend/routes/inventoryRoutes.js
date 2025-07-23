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
router.post('/adjust', authenticate,verifyAdmin, adjustStock);
router.post('/transfer',authenticate, verifyAdmin, transferStock);
router.get('/', authenticate,verifyAdmin, getInventory);
router.get('/low-stock', verifyAdmin, getLowStockAlerts);

// Admin-only route
router.get('/logs', verifyAdmin, getAuditLogs);
router.get('/test-admin', authenticate, verifyAdmin, (req, res) => {
  res.send('Hello Admin');
});


export default router;
