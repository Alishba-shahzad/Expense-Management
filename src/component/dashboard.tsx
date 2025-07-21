"use client";
// import { useEffect, useState } from "react";
// import { auth, db } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
//   Timestamp,
// } from "firebase/firestore";

// interface Expense {
//   id: string;
//   amount: number;
//   category: string;
//   note: string;
//   date: string;
// }

// const Dashboard = () => {
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [total, setTotal] = useState<number>(0);
//   const user = auth.currentUser;
//   const navigate = useNavigate();

//   const fetchExpenses = async () => {
//     if (!user) return;
//     const q = query(
//       collection(db, "expenses"),
//       where("userId", "==", user.uid)
//     );
//     const querySnapshot = await getDocs(q);
//     const data: Expense[] = [];
//     let totalAmount = 0;
//     querySnapshot.forEach((doc) => {
//       const d = doc.data();
//       totalAmount += d.amount;
//       data.push({
//         id: doc.id,
//         amount: d.amount,
//         category: d.category,
//         note: d.note,
//         date: d.date,
//       });
//     });
//     setExpenses(data);
//     setTotal(totalAmount);
//   };

//   const addExpense = async () => {
//     if (!user) return;
//     const newExpense = {
//       userId: user.uid,
//       amount: 150,
//       category: "Transport",
//       note: "Bus ticket",
//       date: new Date().toISOString().split("T")[0],
//     };
//     await addDoc(collection(db, "expenses"), newExpense);
//     fetchExpenses();
//   };

//   const logout = async () => {
//     await auth.signOut();
//     navigate("/");
//   };

//   useEffect(() => {
//     if (!user) navigate("/");
//     fetchExpenses();
//   }, []);

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <div>
//           <span className="mr-4">{user?.email}</span>
//           <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
//             Logout
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//         <div className="bg-white shadow p-4 rounded">
//           <h2 className="text-gray-500">Total Expenses</h2>
//           <p className="text-2xl font-bold">${total}</p>
//         </div>
//         <div className="bg-white shadow p-4 rounded">
//           <h2 className="text-gray-500">This Month</h2>
//           <p className="text-2xl font-bold">🔥 Dynamic coming soon</p>
//         </div>
//         <div className="bg-white shadow p-4 rounded">
//           <h2 className="text-gray-500">Add Expense</h2>
//           <button
//             onClick={addExpense}
//             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             + Add Dummy Expense
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded shadow p-4">
//         <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2">Date</th>
//               <th className="p-2">Category</th>
//               <th className="p-2">Amount</th>
//               <th className="p-2">Note</th>
//             </tr>
//           </thead>
//           <tbody>
//             {expenses.map((exp) => (
//               <tr key={exp.id} className="border-t">
//                 <td className="p-2">{exp.date}</td>
//                 <td className="p-2">{exp.category}</td>
//                 <td className="p-2">${exp.amount}</td>
//                 <td className="p-2">{exp.note}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState } from "react";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";

// type Expense = {
//   _id: string;
//   amount: number;
//   category: string;
//   note: string;
//   date: string;
// };

// const Dashboard = () => {
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const user = auth.currentUser;
//   const navigate = useNavigate();

//   const logout = async () => {
//     await auth.signOut();
//     navigate("/");
//   };
//   const handleAddTestExpense = async () => {
//     if (!user) return;

//     const res = await fetch("http://localhost:4000/api/expenses", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId: user.uid,
//         amount: 250,
//         category: "Food",
//         note: "Pizza",
//         date: new Date().toISOString(),
//       }),
//     });

//     const newExpense = await res.json();
//     setExpenses((prev) => [newExpense, ...prev]);
//   };

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       if (!user) return;

//       try {
//         const res = await fetch(
//           `http://localhost:4000/api/expenses/${user.uid}`
//         );
//         const data = await res.json();
//         setExpenses(data);
//       } catch (err) {
//         console.error("Error fetching expenses:", err);
//       }
//     };

//     fetchExpenses();
//   }, [user]);

//   return (

//     <div className="min-h-screen bg-gray-100 p-8">
//       <h2 className="text-3xl font-bold mb-6 text-center text-violet-700">
//         Your Expenses
//       </h2>
//       <button
//         onClick={logout}
//         className="bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>
//       <button
//         onClick={handleAddTestExpense}
//         className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//       >
//         ➕ Add Test Expense
//       </button>

//       <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
//         {expenses.length === 0 ? (
//           <p className="text-gray-500">No expenses found.</p>
//         ) : (
//           <ul className="space-y-4">
//             {expenses.map((expense) => (
//               <li
//                 key={expense._id}
//                 className="flex justify-between border-b pb-2"
//               >
//                 <div>
//                   <p className="text-lg font-medium">{expense.category}</p>
//                   <p className="text-sm text-gray-500">{expense.note}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-indigo-600 font-semibold">
//                     ${expense.amount}
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     {new Date(expense.date).toDateString()}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

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
        alert("Failed to save expense"); // <-- ye yahan aa raha
        return;
      }
  
      const updated = await res.json();
      console.log("Updated expense:", updated);
    } catch (err) {
      console.error("❌ Update error:", err);
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
    <div className="min-h-screen p-6 bg-gray-100">
      <AddExpenseForm
        userId={userId}
        onExpenseAdded={fetchExpenses}
        editingExpense={editingExpense}
        clearEditing={() => setEditingExpense(null)}
        onUpdateExpense={updateExpense}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-violet-700">Dashboard</h1>
        <div>
          <span className="mr-4">{user?.email}</span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-gray-500">Total Expenses</h2>
          <p className="text-2xl font-bold">${total}</p>
        </div>
        
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-gray-500">This Month</h2>
          <p className="text-2xl font-bold">Coming soon </p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-gray-500">Add Expense</h2>
          <p className="mt-2 text-sm text-gray-400">Use form above</p>
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>

        {loading ? (
          <p>Loading...</p>
        ) : expenses.length === 0 ? (
          <p className="text-gray-500">No expenses found.</p>
        ) : (
          <table className="w-full text-left border-collapse">
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
                      onClick={() => setEditingExpense(exp)} // yeh function edit state me data set karega
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteExpense(exp._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
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
