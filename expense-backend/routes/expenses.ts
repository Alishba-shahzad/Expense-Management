import { Router, Request, Response } from "express";
import Expense from "../models/expense";

const router = Router();

// Get all expenses for a user
router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// Add new expense
router.post("/", async (req: Request, res: Response) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: "Failed to add expense" });
  }
});

// Delete an expense
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

// ✅ This makes it a module in TypeScript
export default router;
