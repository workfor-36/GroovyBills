const express = require('express');
const router = express.Router();
const {
  addStockItem,
  getAllStock,
  getStockItemById,
  updateStockItem,
  deleteStockItem
} = require('../controllers/stockController');

router.post('/', addStockItem);
router.get('/', getAllStock);
router.get('/:id', getStockItemById);
router.put('/:id', updateStockItem);
router.delete('/:id', deleteStockItem);

module.exports = router;
