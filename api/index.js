import express from "express";
const app=express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

app.use(express.json())
app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);

app.use((err,req,res,next)=>{
    let statusCode=err.statusCode || 500;
    let message=err.message || "Internal Server Error";
    res.status(statusCode).json({success:false,statusCode,message})
})

mongoose.connect(process.env.MONGO, {
})
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

app.listen(3000,()=>{
    console.log(`Server is runnig port 3000`);
    
})
