// routes/managerRoutes.js
import express from 'express';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Store Manager route is working' });
});

export default router;
