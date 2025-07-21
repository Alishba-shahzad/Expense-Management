import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenses"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is working");
});

// Routes
app.use("/api/expenses", expenseRoutes); 

// MongoDB connect
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
