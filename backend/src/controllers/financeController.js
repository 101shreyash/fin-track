import pool from "../db.js";
import multer from "multer";

const upload = multer({ dest: "receipts/" });

async function keepFinance(req, res) {
  const userid = req.user.userid;

  //Expenses And Spending

  const expenseInput = req.body.expense;
  const expense = Number(req.body.expense);
  const spentat = req.body.spentat;

  // Income And Gain
  const income = req.body.income; // Number
  const gainedat = req.body.gainedat; // Text

  // Current  month
  const financemonth = new Date()
    .toLocaleString("en-US", { month: "long" })
    .toLowerCase();

  // Receipt Image Url And FinanceNotes
  const notes = req.body.notes;

  if (expenseInput.includes("+")) {
    return res.status(400).json({
      success: "false",
      message: "Enter a valid number",
    });
  }

  if (expenseInput.includes(" ")) {
    return res.status(400).json({
      success: "false",
      message: "Numbers Shouldnot consists of spaces please try again",
    });
  }

  if (expense < 0) {
    return res.status(400).json({
      success: false,
      message: `Expense Couldnot be less than 0 Enter valid Number`,
    });
  }

  if (Number.isNaN(expense) === true) {
    return res.status(400).json({
      success: false,
      message: `Enter a valid number make sure there is no Alphabets and Special Characters`,
    });
  }

  console.log("Reached");
  console.log(expense);


}

export default keepFinance;
