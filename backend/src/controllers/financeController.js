import pool from "../db.js";

async function keepFinance(req, res) {
  const userid = req.user.userid;
  const financemonth = new Date()
    .toLocaleString("en-US", { month: "long" })
    ?.toLowerCase();

  // Expenses And Spent At
  const expenseInput = req.body?.expense;
  let expense = Number(req.body?.expense);
  let spent_at = req.body?.spentat;

  // Income And Gains
  const incomeInput = req.body.income;
  let income = Number(req.body.income);
  let gainedat = req.body.gainedat;

  // Notes
  const notes = req.body?.notes;

  // Receipt
  const receiptimg = req.file.filename;

  if (!expenseInput || expenseInput === undefined) {
    expense = 0;
  }

  if (expense < 0) {
    return res.status(400).json({
      success: false,
      message: "Expnese Number could not be less than 0 enter valid number",
    });
  }

  if (expenseInput?.includes(" ")) {
    return res.status(400).json({
      success: false,
      message: "Expnese Number should not consits of any spaces",
    });
  }

  if (
    Number.isNaN(expense) === true ||
    expenseInput?.includes("+") ||
    expenseInput === "Infinity" ||
    expenseInput === "1e5" ||
    expenseInput === "2e5"
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Expnese Should not consits of any letters or special symbols. Enter valid Number",
    });
  }

  if (!incomeInput || incomeInput === undefined) {
    income = 0;
  }

  if (income < 0) {
    return res.status(400).json({
      success: false,
      message: "Income Number could not be less than 0 enter valid number",
    });
  }

  if (incomeInput?.includes(" ")) {
    return res.status(400).json({
      success: false,
      message: "Income Number should not consits of any spaces",
    });
  }

  if (
    Number.isNaN(income) === true ||
    incomeInput?.includes("+") ||
    incomeInput === "Infinity" ||
    incomeInput === "1e5" ||
    incomeInput === "2e5"
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Income Should not consits of any letters or special symbols. Enter valid Number",
    });
  }

  if (!spent_at) {
    spent_at = "No Expenses";
  }

  if (!gainedat) {
    gainedat = "No Earnings";
  }

  if (
    /^[a-zA-Z ]+$/.test(spent_at) === false ||
    /^[a-zA-Z ]+$/.test(gainedat) === false
  ) {
    return res.status(400).json({
      success: false,
      message:
        "SpentAt and Gained At Description should only include alphabets not numbers and special characters",
    });
  }

  if (spent_at?.length > 40 || gainedat?.length > 40) {
    return res.status(400).json({
      success: false,
      message: "Finance Description Could be a bit shorter ",
    });
  }

  if (notes?.length > 250) {
    return res.json({
      success: false,
      message: `Note too long make it a bit shorter. Don't extend it more than 250 characters right now its ${notes?.length} characters long`,
    });
  }

  // Expenses
  console.log("expenseinput", expense);
  console.log("spentAt", spent_at);

  // Income
  console.log("incomeinput", income);
  console.log("gainedAt", gainedat);

  //Note
  console.log("note", notes);

  // Receipt Image

  console.log("receipt", receiptimg);

  // Month

  console.log(financemonth);
}

export default keepFinance;
