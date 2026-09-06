import pool from "../db.js";

function userInfo(req, res) {
  
  const userid = req.user.userid;
  const currencytype = req.body.currency;
  const fullname = req.body.fullname;

  if (!currencytype) {
    return res.status(400).json({
      success: false,
      message: "You have to mention your default currency type",
    });
  }

  if (currencytype?.length !== 3) {
    return res.status(400).json({
      success: false,
      message: "Invalid Currency Code it should be exactly of 3 characters",
    });
  }

  if (/[0-9]/.test(currencytype) === true) {
    return res.status(400).json({
      success: false,
      message:
        "Currency Code should not contain numbers ,  enter valid currency code",
    });
  }


  if (!fullname) {
    return res.status(400).json({
      success: false,
      message: "fullname is required!",
    });
  }

  if (fullname?.length > 50) {
    return res.status(400).json({
      success: false,
      message: "Full name too long enter your valid name!",
    });
  }

  if (fullname?.length < 1) {
    return res.status(400).json({
      success: false,
      message: "Full name too short!",
    });
  }

  if (/^[a-zA-Z ]+$/.test(fullname) === false) {
    return res.status(400).json({
      success: false,
      message: "Full name should not consits of numbers and symbols",
    });
  }


  async function updateUserinfo() {
    try {
      await pool.query(
        "UPDATE users  SET full_name = $1 , currency_type = $2  WHERE userid = $3",
        [ fullname , currencytype, userid],
      );
      res.status(200).json({
        success: true,
        message: ` Welcome ${fullname} , ${currencytype} is now your default currency type`,
      });
    } catch (error) {

      console.log(error);
      

      if (error.code === "22P02") {
        return res.status(422).json({
          success: false,
          message: `We do not support ${currencytype} Currency as of now . But It may be added in the future`,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }

  updateUserinfo();
}



export default userInfo;
