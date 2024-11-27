import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

app.use(express.json())
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, statusCode, message })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'api/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log(path.join(__dirname, 'uploads'));

app.post('/uploadImg', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ url: fileUrl });
});

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

app.listen(3000, () => {
    console.log(`Server is runnig port 3000`);

})
