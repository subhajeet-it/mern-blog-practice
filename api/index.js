import express from "express";
const app=express();
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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