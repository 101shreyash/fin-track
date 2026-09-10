import pool from "../db.js";

function keepFinance(req, res) {
  const userid = req.user.userid;

  // assumed request body

  const dayIncome = req.body.income === "" ? 0 : req.body.income;
  const dayExpenses = req.body.expense === "" ? 0 : req.body.expense;
  const spentAt = req.body.spentin;
  const gainedAt = req.body.gainedin;
  const note = req.body.note?.toLowerCase();
  const fullMonth = new Date()
    .toLocaleString("en-US", { month: "long" })
    .toLowerCase();

  if (dayIncome < 0 || dayExpenses < 0) {
    return res.status(400).json({
      success: false,
      message: "You cannot insert negative values",
    });
  }

  if (spentAt?.length > 50) {
    return res.status(400).json({
      success: false,
      message:
        "Spent at Description should be short eg.. Food & Grocery , Electricity Bills ..",
    });
  }

  if (gainedAt?.length > 50) {
    return res.status(400).json({
      success: false,
      message:
        "Gained at Description should be short eg.. Usual Paychecks , Salary , Loan Recovered ..",
    });
  }

  async function TrackFinance() {
    try {
      await pool.query(
        "INSERT INTO userfinance (userid , day_income , day_expenses , spent_at , note , finance_month) VALUES ($1,$2,$3,$4,$5,$6)",
        [userid, dayIncome, dayExpenses, spentAt, note, fullMonth],
      );

      return res.status(200).json({
        success: true,
        message: "Saved the record",
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }

  TrackFinance();
} // keep finance Scope Ends here

export default keepFinance;
