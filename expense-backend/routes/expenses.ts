import { Router, Request, Response } from "express";
import Expense from "../models/expense";

const router = Router();

// GET /api/expenses/:userId → fetch all expenses of a user
router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// POST /api/expenses → add new expense
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, category, amount, note, date } = req.body;
    const newExpense = new Expense({ userId, category, amount, note, date });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to add expense" });
  }
});

// DELETE 
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

// PUT /api/expenses/:id

router.put("/:id", async (req, res) => {
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
    console.error(" Error updating:", err);
    res.status(500).json({ message: "Server error while updating" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).send("Not found");
    res.json(updated);
  } catch (error) {
    res.status(500).send("Server error");
  }
});






export default router;
