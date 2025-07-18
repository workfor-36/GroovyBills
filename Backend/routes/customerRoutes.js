import express from 'express';
import {
  getAllCustomers,
  updateCustomer,
  deleteCustomer
} from '../controllers/customerController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getAllCustomers);
router.put('/:id', authenticate, updateCustomer);
router.delete('/:id', authenticate, deleteCustomer);

export default router;
