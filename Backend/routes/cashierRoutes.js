// routes/cashierRoutes.js
import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Cashier route working' });
});

export default router;
