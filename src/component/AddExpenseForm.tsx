import { useEffect, useState } from "react";

type Expense = {
  _id?: string;
  userId: string;
  amount: number;
  category: string;
  note?: string;
  date: string;
};

type Props = {
  userId: string;
  onExpenseAdded: () => void;
  editingExpense: Expense | null;
  clearEditing: () => void;
  onUpdateExpense: (id: string, updatedData: any) => Promise<void>;
};

export default function AddExpenseForm({
  userId,
  onExpenseAdded,
  editingExpense,
  clearEditing,
}: Props) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  // Fill form when editingExpense is set
  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setNote(editingExpense.note || "");
      setDate(editingExpense.date.split("T")[0]); // only yyyy-mm-dd
    }
  }, [editingExpense]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const expenseData = {
      userId,
      amount: parseFloat(amount),
      category,
      note,
      date: new Date(date).toISOString(),
    };

    try {
      let res;
      if (editingExpense) {
        //Update Existing Expense
        res = await fetch(
          `http://localhost:5000/api/expenses/${editingExpense._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expenseData),
          }
        );
      } else {
        //Add New Expense
        res = await fetch("http://localhost:5000/api/expenses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expenseData),
        });
      }

      if (res.ok) {
        setAmount("");
        setCategory("Food");
        setNote("");
        setDate("");
        clearEditing();
        onExpenseAdded();
      } else {
        alert("Failed to save expense");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving expense");
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-200 p-5  border border-spacing-5 border-indigo-400 rounded shadow max-w-md mx-auto"
    >
      
      <h2 className="text-xl text-center font-bold">
        {editingExpense ? "Edit Expense" : "Add New Expense"}
      </h2>

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
          <option value="Shopping">Shopping</option>
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

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="bg-gradient-to-r from-sky-600 to-sky-700 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>

        {editingExpense && (
          <button
            type="button"
            onClick={clearEditing}
            className="text-gray-600 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
