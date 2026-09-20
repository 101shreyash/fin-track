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
  const receiptimg = req.file?.filename;

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
    return res.status(400).json({
      success: false,
      message: `Note too long make it a bit shorter. Don't extend it more than 250 characters right now its ${notes?.length} characters long`,
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO userfinance (userid, day_income , gained_at , day_expenses , spent_at , finance_month) VALUES ($1,$2,$3,$4,$5,$6) RETURNING userfinance.finance_id",
      [userid, income, gainedat, expense, spent_at, financemonth],
    );

    const financeId = result.rows[0].finance_id;

    await pool.query(
      "INSERT INTO userinfo (userid , finance_id ,  receipt_img_url , notes , finance_month) VALUES ($1,$2,$3,$4,$5);",
      [userid, financeId, receiptimg, notes, financemonth],
    );

    return res.status(200).json({
      success: true,
      message: "Financial Record Saved",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
}

async function MonthSummary(req, res) {
  const userid = req.user.userid;
  const month = req.params.month;

  if (!month) {
    return res.status(400).json({
      success: false,
      message: "Month is required",
    });
  }

  if (
    /^january|february|march|april|may|june|july|august|september|october|november|december$/.test(
      month,
    ) === false
  ) {
    return res.status(400).json({
      success: false,
      message: "Enter valid Month",
    });
  }

  try {
    const result = await pool.query(
      "SELECT SUM (day_income) AS totalincome , SUM (day_expenses) AS totalexpenses FROM userfinance WHERE userid = $1 AND finance_month = $2",
      [userid, month],
    );

    const totalincome = result.rows[0].totalincome;
    const totalexpenses = result.rows[0].totalexpenses;

    if (totalincome === null && totalexpenses === null) {
      return res.status(404).json({
        success: false,
        message: "No record Found For the Following Month",
      });
    }

    return res.json({
      success: true,
      message: result.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server Error",
    });
  }
}

async function ViewReceipts(req, res) {
  const month = req.params?.month;
  const userid = req.user.userid;

  if (!month) {
    return res.status(400).json({
      success: true,
      message: "Month is required",
    });
  }

  if (
    /^january|february|march|april|may|june|july|august|september|october|november|december$/.test(
      month,
    ) === false
  ) {
    return res.status(400).json({
      success: false,
      message: "Enter Valid Month",
    });
  }

  try {
    const result = await pool.query(
      "SELECT receipt_img_url FROM userinfo WHERE userid = $1 AND finance_month = $2;",
      [userid, month],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No receipt Recorded For the following Month",
      });
    }

    return res.status(200).json({
      success: true,
      message: result.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
}

async function DateSummary(req, res) {
  const date = req.params.date;
  const userid = req.user.userid;

  if (!date) {
   return res.status(400).json({
      success: false,
      message: "Date is required",
    });
  }


  try {
const result = await pool.query(`SELECT SUM (day_income) as totalincome , SUM (day_expenses) as totalexpense FROM userfinance WHERE userid = $1 AND todays_date :: TEXT ILIKE $2` , [userid , `${date}`] );



if (result.rowCount === 0 ) {
  return res.json({
    success : false,
    message : "No record Found"
  })

}

return res.status(400).json({
  success : true,
  message : result.rows[0]
})



  }

  catch (error) {
    console.log(error);
    return res.json({
      success : false,
      message: "Server Error",
    });
  }
}

export { keepFinance, MonthSummary, ViewReceipts, DateSummary };
