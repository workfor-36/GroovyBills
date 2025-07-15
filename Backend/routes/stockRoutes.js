import express from 'express';
import {
  addStockItem,
  getAllStock,
  getStockItemById,
  updateStockItem,
  deleteStockItem
} from '../controllers/stockController.js';

const router = express.Router();

router.post('/', addStockItem);
router.get('/', getAllStock);
router.get('/:id', getStockItemById);
router.put('/:id', updateStockItem);
router.delete('/:id', deleteStockItem);

export default router;

