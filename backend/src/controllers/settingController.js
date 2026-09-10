import pool from "../db.js";

async function DeleteAccount(req, res) {
  const userid = req.user.userid;

  console.log(userid);

  try {
    await pool.query("DELETE FROM users WHERE userid = $1", [userid]);
    res.json({
      success: true,
      message: "Account Deleted Sucessfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export { DeleteAccount };
