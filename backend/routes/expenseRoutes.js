const express = require("express");
const Expense = require("../models/Expense");
const router = express.Router();

// Add Expense
router.post("/", async (req, res) => {
  try {
    const { name, amount, category } = req.body;
    const expense = new Expense({ name, amount, category });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Expenses
router.get("/", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Delete Expense
router.delete("/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense Deleted" });
});

module.exports = router;
