import mongoose, { Document, Schema } from "mongoose";

// ✅ Define TypeScript interface
export interface IExpense extends Document {
  userId: string;
  category: string;
  amount: number;
  note?: string;
  date: Date;
}

// ✅ Define Mongoose schema
const expenseSchema: Schema = new Schema<IExpense>({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  note: { type: String },
  date: { type: Date, default: Date.now },
});

// ✅ Export model
const Expense = mongoose.model<IExpense>("Expense", expenseSchema);
export default Expense;
