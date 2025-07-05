// routes/authRoutes.js
import express from 'express';
import { loginCashier, loginManager } from '../controllers/authController.js';

const router = express.Router();

router.post('/cashier/login', loginCashier);
router.post('/manager/login', loginManager);

export default router;
