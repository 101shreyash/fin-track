import pool from "../db.js";

function ViewProfile(req, res) {
  const userid = req.user.userid;

  async function DbCall() {
    try {
      const result = await pool.query(
        "SELECT full_name , currency_type FROM users WHERE userid = $1",
        [userid],
      );

     return res.status(200).json({
        sucess: true,
        message:  result.rows[0]
      });

    }

    catch (error) {
      console.log(error);
      res.status(500).json({
        sucess: false,
        message: "Server Error",
      });
    }
  }

  DbCall();
}

export default ViewProfile;
