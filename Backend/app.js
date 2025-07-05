import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import storeRoutes from './routes/storeRoutes.js';

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

export default app;
