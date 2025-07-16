import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import stockRoutes from './routes/stockRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js';
import reportRoutes from './routes/reportRoutes.js'
import storeSummaryRoutes from './routes/storeSummaryRoutes.js'
import adminDashboardRoutes from './routes/adminDashboardRoutes.js'


const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // frontend origin
  credentials: true,              // allow cookies from frontend
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/storesummary', storeSummaryRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);

export default app;
