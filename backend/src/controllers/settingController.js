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
      return res .status(400).json({
        success : false,
        message : "Password didn't matched delete operation failed"
      });
    }


    await pool.query("DELETE FROM users WHERE userid = $1", [userid]);

   return res.status(200).json({
      success : true,
      message : "Accoount Deleted Sucessfully"
    })

  }


  catch (error) {

    console.log(error);

    return res.status(500).json({
      success : false,
      message : "Server Error"
    })


  }


}


async function ChangePassword(req,res) {

  const userid = req.user?.userid;
  const currentpassword = req.body?.currentpassword
  const newpassword = req.body?.newpassword
  const retypedpassword = req.body?.retypedpassword

  if (!currentpassword) {

    return res.status(400).json({
      success : false,
      message : "Password field cannot be blank. Current Password is Required."
    })

  }


  if (!newpassword) {

   return res.status(400).json({
      success : false,
      message : "Password field cannot be blank. New Password is Required."
    })
  }

  if (!retypedpassword) {

    return res.status(400).json({
      success : false,
      message : "Password field cannot be blank. Please re-type your Password."
    })

  }

  if (newpassword.length < 8) {

   return res.status(400).json({
      success : false,
      message : "New password must have at least 8 chracters. Please try again"
    })

  }

  if (newpassword !== retypedpassword) {

   return res.status(401).json({
      success : false,
      message : "Re-typed password didnot matched with new password try again"
    })

  }

 const query =  await pool.query("SELECT hash_password FROM users WHERE userid = $1" , [userid])

 const hashedpassword = query.rows[0].hash_password
 const matched = await bcrypt.compare(currentpassword , hashedpassword)


if (!matched) {

  return res.status(401).json({
    success : false,
    message : "Current Password Did'nt Matched please try again."
  })

}

const newhashedpassword = await bcrypt.hash(newpassword , 13)
await pool.query("UPDATE users SET hash_password = $1 WHERE userid = $2;" , [newhashedpassword , userid])

return res.status(200).json({

  success : true,
  message : "Password Changed Sucessfully"

})



}

export { DeleteAccount , ChangePassword };
