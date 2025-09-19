import express from 'express';
import mongoose from 'mongoose';
// import blouseRoutes from './routes/blouses.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import laceRoutes from './routes/laces.js';
import blouseRoutes from './routes/blouses.js'
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/api/blouses', blouseRoutes);
app.use("/api/laces", laceRoutes);

// Connect DB and Start Server
mongoose.connect('mongodb://localhost:27017/blouseDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(5000, () => console.log('Server running on port 5000'));
});
