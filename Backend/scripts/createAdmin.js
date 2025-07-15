// scripts/createAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

await mongoose.connect(process.env.MongoDBURI);

const createAdmin = async () => {
  const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (exists) {
    console.log('⚠️ Admin already exists');
    process.exit();
  }

  const admin = new Admin({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });

  await admin.save();
  console.log('✅ Admin created successfully');
  process.exit();
};

createAdmin().catch((err) => {
  console.error('❌ Error creating admin:', err.message);
  process.exit(1);
});
