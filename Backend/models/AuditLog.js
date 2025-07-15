import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  action: String,           // 'adjust' | 'transfer'
  details: String,          // Description of action
  performedBy: String,      // admin/cashier/manager name or ID
  date: { type: Date, default: Date.now }
});

export default mongoose.model('AuditLog', auditLogSchema);
