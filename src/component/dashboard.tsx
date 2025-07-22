"use client";

import AddExpenseForm from "./AddExpenseForm";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


type Expense = {
  userId: string;
  _id: string;
  amount: number;
  category: string;
  note?: string;
  date: string;
};

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [uid, setUid] = useState<string | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const user = auth.currentUser;
  const userId = user?.uid || "";
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/expenses/${user.uid}`);
      if (!res.ok) throw new Error("Failed to fetch expenses");
      const data: Expense[] = await res.json();
      setExpenses(data);

      const totalAmount = data.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );
      setTotal(totalAmount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const deleteExpense = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchExpenses(); // refresh list
      } else {
        alert("Failed to delete expense");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting expense");
    }
  };

  
  const updateExpense = async (id: string, updatedData: any) => {
    try {
      const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!res.ok) {
        alert("Failed to save expense"); 
        return;
      }
  
      const updated = await res.json();
      console.log("Updated expense:", updated);
    } catch (err) {
      console.error(" Update error:", err);
      alert("Request failed");
    }
  };
  

  // const handleEdit = (expense: any) => {
  //   setEditingExpense(expense); // pass this to AddExpenseForm if you want to edit
  // };

  const logout = async () => {
    await auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    fetchExpenses();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        console.log("User UID:", user.uid);
      } else {
        console.log("No user signed in");
      }
    });

    return () => unsubscribe();
  }, [user]);
return (
  <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-r from-sky-600 to-sky-700">
    
    {/* bar */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
      <h1 className="text-2xl font-bold text-black">Dashboard</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <span className="text-sm sm:text-base text-white">{user?.email}</span>
        <button
          onClick={logout}
          className="bg-black text-white px-4 py-2 rounded text-sm sm:text-end"
        >
          Logout
        </button>
      </div>
    </div>

    <div className="mb-6">
      <AddExpenseForm
        userId={userId}
        onExpenseAdded={fetchExpenses}
        editingExpense={editingExpense}
        clearEditing={() => setEditingExpense(null)}
        onUpdateExpense={updateExpense}
      />
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-gray-700">Total Expenses</h2>
        <p className="text-2xl font-bold">${total}</p>
      </div>
      
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-gray-700">This Month</h2>
        <p className="text-2xl font-bold">Coming soon</p>
      </div>
    </div>

    {/* Table Section */}
    <div className="bg-white rounded shadow p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>

      {loading ? (
        <p>Loading...</p>
      ) : expenses.length === 0 ? (
        <p className="text-gray-500">No expenses found.</p>
      ) : (
        <table className="min-w-[600px] w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Date</th>
              <th className="p-2">Category</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Note</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp: Expense) => (
              <tr key={exp._id} className="border-t">
                <td className="p-2">
                  {new Date(exp.date).toLocaleDateString()}
                </td>
                <td className="p-2">{exp.category}</td>
                <td className="p-2">${exp.amount}</td>
                <td className="p-2">{exp.note}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => setEditingExpense(exp)} 
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteExpense(exp._id)}
                    className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);
};
export default Dashboard;