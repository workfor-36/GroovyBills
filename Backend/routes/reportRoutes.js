import express from 'express';
import { getLatestReport, addReport } from '../controllers/reportController.js';

const router = express.Router();

router.get('/', getLatestReport);
router.post('/', addReport); // Optional for admin/report entry

export default router;
