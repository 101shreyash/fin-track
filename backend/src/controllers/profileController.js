import pool from "../db.js";

// Fetching UserFullname and The Currency Type they've choosed

function ViewProfile(req, res) {
  const userid = req.user.userid;

  async function DbCall() {
    try {
      const result = await pool.query(
        "SELECT full_name , currency_type FROM users WHERE userid = $1",
        [userid],
      );

      return res.status(200).json({
        success: true,
        message: result.rows[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        sucess: false,
        message: "Server Error",
      });
    }
  }

  DbCall();
}

// Checking Wether Fullname Exists or not so that user can skip
// add fullname part in frontend

async function checkFullName(req, res) {
  const userid = req.user.userid;

  try {
    const result = await pool.query(
      "SELECT full_name FROM users WHERE userid =$1",
      [userid],
    );
    const userfullname = result.rows[0]?.full_name;

    if (userfullname === "fullname") {
      return res.status(404).json({
        success: false,
        message: "Fullname doesnot exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fullname exists",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Server Error",
    });
  }
}

export { checkFullName, ViewProfile };
