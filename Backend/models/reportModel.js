import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  sales: {
    daily: Number,
    weekly: Number,
    monthly: Number
  },
  tax: {
    gstCollected: Number,
    gstPending: Number
  },
  inventory: {
    turnoverRate: String,
    restocksThisMonth: Number
  },
  insights: {
    topProducts: [String],
    highValueCustomers: [String]
  },
  analytics: {
    stores: Number,
    totalRevenue: String,
    avgDailySales: String
  }
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);
export default Report;
