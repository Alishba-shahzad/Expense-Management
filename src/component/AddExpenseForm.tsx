// src/components/AddExpenseForm.tsx

import { useState } from "react";

type Props = {
  userId: string;
  onExpenseAdded: () => void; // to refresh the expense list after adding
};

export default function AddExpenseForm({ userId, onExpenseAdded }: Props) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newExpense = {
      userId,
      amount: parseFloat(amount),
      category,
      note,
      date: new Date(date).toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      });

      if (res.ok) {
        setAmount("");
        setNote("");
        setDate("");
        onExpenseAdded();
      } else {
        alert("Failed to add expense");
      }
    } catch (err) {
      console.error(err);
      alert("Error: Failed to add expense");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold">Add New Expense</h2>

      <div>
        <label className="block font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Note</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Expense
      </button>
    </form>
  );
}
