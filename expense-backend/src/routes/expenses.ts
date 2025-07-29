import { Router, Request, Response } from "express";
import Expense from "../models/expense";
import verifyToken, { AuthenticatedRequest } from "../firebase/verifyToken";

const router = Router();

//  SECURE: Add New Expense with Firebase Auth Token
router.post("/add-expense", verifyToken, async (req: AuthenticatedRequest, res) => {
  const { category, amount, note, date } = req.body;
  const userId = req.user?.uid;

  if (!userId) return res.status(401).json({ error: "Unauthorized - no token" });

  if (!category || !amount || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newExpense = new Expense({
      userId,
      category,
      amount,
      note,
      date,
    });

    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully", expense: newExpense });
  } catch (err) {
    console.error("Add expense error:", err);
    res.status(500).json({ error: "Server error while saving expense" });
  }
});

// ✅ GET all expenses for a user (by userId in URL param)
router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// ✅ DELETE expense by ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

// ✅ UPDATE expense by ID
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(updatedExpense);
  } catch (err) {
    console.error("Error updating expense:", err);
    res.status(500).json({ message: "Server error while updating" });
  }
});

export default router;
