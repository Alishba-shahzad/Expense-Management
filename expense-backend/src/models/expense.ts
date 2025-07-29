import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
  userId: string;
  category: string;
  amount: number;
  note?: string;
  date: Date;
}

const expenseSchema: Schema<IExpense> = new Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  note: { type: String },
  date: { type: Date, default: Date.now }
});

export default mongoose.model<IExpense>("Expense", expenseSchema);
