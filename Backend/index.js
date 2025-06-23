import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express()

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI

// Conection to MongoDb
try {
  mongoose.connect(URI,{
    useNewURLParser:true,
    useUnifiedTopology:true,
  });
  console.log("Connected to MongoDB");
  
} catch (error) {
  console.log("Error:",error);
  
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})