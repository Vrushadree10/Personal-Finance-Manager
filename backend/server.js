const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env

// Initialize App
const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Allow frontend to access backend

// Connect to MongoDB Atlas (Use your actual connection string in .env)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// Define Expense Schema
const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Ensure title is required
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Expense Model
const Expense = mongoose.model("Expense", expenseSchema);

// POST: Add Expense
app.post("/api/expenses", async (req, res) => {
  try {
    const { title, amount } = req.body;
    if (!title || !amount) {
      return res.status(400).json({ message: "Title and amount are required" });
    }
    const newExpense = new Expense({ title, amount });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Error saving expense", error });
  }
});

// GET: Fetch All Expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses.map(exp => ({
        ...exp._doc,
        amount: `₹${exp.amount}` // Add INR currency symbol when sending response
      })));      
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
});

// DELETE: Remove an Expense by ID
app.delete("/api/expenses/:id", async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
});

// PUT: Update an Expense by ID
app.put("/api/expenses/:id", async (req, res) => {
  try {
    const { title, amount } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount },
      { new: true, runValidators: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
