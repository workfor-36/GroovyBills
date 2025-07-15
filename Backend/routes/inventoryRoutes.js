import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  adjustStock,
  transferStock,
  getInventory,
  getLowStockAlerts,
  getAuditLogs
} from '../controllers/inventoryController.js';

const router = express.Router();

router.post('/adjust', protect('admin'), adjustStock);
router.post('/transfer', protect('admin'), transferStock);
router.get('/', protect('admin'), getInventory);
router.get('/low-stock', protect('admin'), getLowStockAlerts);
router.get('/logs', protect('admin'), getAuditLogs);

export default router;
