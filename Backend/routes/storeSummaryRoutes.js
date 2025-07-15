import express from 'express';
import {
  getAllStoreSummaries,
  addStoreSummary,
  deleteStoreSummary
} from '../controllers/storeSummaryController.js';

const router = express.Router();

router.get('/', getAllStoreSummaries);
router.post('/', addStoreSummary);
router.delete('/:id', deleteStoreSummary);

export default router;
