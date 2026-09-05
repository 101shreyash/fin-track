import pool from "../db.js";

function defaultCurrency(req, res) {
  const userid = req.user.userid;
  const currencytype = req.body.currency;

  if (!currencytype) {
    return res.json({
      success: true,
      message: "You have to mention you default currency type",
    });
  }

  if (currencytype?.length !== 3) {
    return res.status(400).json({
      success: false,
      message: "Invalid valid Currency Code it should be exactly of 3 characters",
    });
  }

  if (/[0-9]/.test(currencytype) === true) {
    return res.status(400).json({
      success: false,
      message:
        "Currency Code doesnot contains number enter valid currency code",
    });
  }

  async function upDateCurrencyCode() {
    try {
      await pool.query(
        "UPDATE users SET currency_type = $1 WHERE userid = $2",
        [currencytype, userid],
      );
      res.status(200).json({
        success: true,
        message: `${currencytype} is now your default currency type`,
      });
    } catch (error) {
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

  upDateCurrencyCode();
}

function askFullName(req, res) {
  const userid = req.user.userid;
  const fullname = req.body.fullname;

  if (!fullname) {
    return res.status(400).json({
      success: false,
      message: "fullname is required!",
    });
  }

  if (fullname?.length > 50) {
    return res.status(400).json({
      success: false,
      message: "Full name too long enter valid name!",
    });
  }

  if (fullname?.length < 5) {
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

  async function updateFullName() {
    try {

     await pool.query("UPDATE users SET full_name = $1 WHERE userid = $2;" , [fullname , userid])

    return res.status(200).json({

      success : true,
      message : `Welcome to the platform ${fullname}`
     })

    } 
    
    catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }

  updateFullName();
} // askfullname function scope ends here

export { askFullName, defaultCurrency };
