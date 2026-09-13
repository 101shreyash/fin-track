import pool from "../db.js";
import bcrypt from "bcrypt";

async function DeleteAccount(req, res) {
  const userid = req.user?.userid;
  const reqpassword = req.body?.password;

  // console.log(userid);

  if (!reqpassword || reqpassword.length < 1) {
    return res.status(400).json({
      success: false,
      message: "To Delete Your account You must include your account password",
    });
  }

  try {
    const query = await pool.query(
      "SELECT hash_password FROM users WHERE userid = $1",
      [userid],
    );

    const hashedpassword = query.rows[0]?.hash_password;

    const matched = await bcrypt.compare(reqpassword, hashedpassword);

    if (!matched) {
      return res.status(400).json({
        success: false,
        message: "Password didn't matched delete operation failed",
      });
    }

    await pool.query("DELETE FROM users WHERE userid = $1", [userid]);

    return res.status(200).json({
      success: true,
      message: "Accoount Deleted Sucessfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

async function ChangePassword(req, res) {
  const userid = req.user?.userid;
  const currentpassword = req.body?.currentpassword;
  const newpassword = req.body?.newpassword;
  const retypedpassword = req.body?.retypedpassword;

  if (!currentpassword) {
    return res.status(400).json({
      success: false,
      message: "Password field cannot be blank. Current Password is Required.",
    });
  }

  if (!newpassword) {
    return res.status(400).json({
      success: false,
      message: "Password field cannot be blank. New Password is Required.",
    });
  }

  if (!retypedpassword) {
    return res.status(400).json({
      success: false,
      message: "Password field cannot be blank. Please re-type your Password.",
    });
  }

  if (newpassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: "New password must have at least 8 chracters. Please try again",
    });
  }

  if (newpassword !== retypedpassword) {
    return res.status(401).json({
      success: false,
      message: "Re-typed password didnot matched with new password try again",
    });
  }

  const query = await pool.query(
    "SELECT hash_password FROM users WHERE userid = $1",
    [userid],
  );

  const hashedpassword = query.rows[0].hash_password;
  const matched = await bcrypt.compare(currentpassword, hashedpassword);

  if (!matched) {
    return res.status(401).json({
      success: false,
      message: "Current Password Did'nt Matched please try again.",
    });
  }

  const newhashedpassword = await bcrypt.hash(newpassword, 13);
  await pool.query("UPDATE users SET hash_password = $1 WHERE userid = $2;", [
    newhashedpassword,
    userid,
  ]);

  return res.status(200).json({
    success: true,
    message: "Password Changed Sucessfully",
  });
}

async function ChangeCurrency(req, res) {
  const userid = req.user.userid;
  const currencytype = req.body.currencytype.toUpperCase();

  if (!currencytype) {
    return res.status(400).json({
      success: false,
      message: "To change You Must include your currency type",
    });
    ``;
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

  try {
    await pool.query("UPDATE users SET currency_type = $1 where userid = $2;", [
      currencytype,
      userid,
    ]);
    res.status(200).json({
      success: true,
      message: `Currency type is now set to ${currencytype}`,
    });
  } catch (error) {
    if (error.code === "22P02") {
      return res.status(422).json({
        success: false,
        message: `We do not support ${currencytype} Currency as of now . But It may be added in the future`,
      });
    }
  }

  res.status(500).json({
    success: false,
    message: "Server Error",
  });
  console.log(error.message);
}

async function ChangeDisplayName(req, res) {
  const userid = req.user.userid;
  const displayname = req.body.displayname;

  if (displayname === "fullname") {
    return res.status(400).json({
      success: false,
      message: "Fullname is reserved word by default try different names",
    });
  }

  if (!displayname) {
    return res.status(400).json({
      success: false,
      message: "Your Name is required!",
    });
  }

  if (displayname?.length > 50) {
    return res.status(400).json({
      success: false,
      message: "Name too long enter a valid name!",
    });
  }

  if (displayname?.length < 1) {
    return res.status(400).json({
      success: false,
      message: "Name too short!",
    });
  }

  if (/^[a-zA-Z ]+$/.test(displayname) === false) {
    return res.status(400).json({
      success: false,
      message: "Name should not consits of numbers and symbols",
    });
  }

  try {
    await pool.query(" UPDATE users SET full_name = $1 WHERE userid = $2;", [
      displayname,
      userid,
    ]);
    res.status(200).json({
      success: true,
      message: `Alright From Now On We Will Call You ${displayname}`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export { DeleteAccount, ChangePassword, ChangeCurrency, ChangeDisplayName };
