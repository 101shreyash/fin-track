import bcrypt from "bcrypt";
import pool from "../db.js";
import jwt from "jsonwebtoken"


function signup(req, res) {
  const username = req.body?.username?.toLowerCase();
  const password = req.body.password;

  if (!username) {
   return res.status(400).json({
      success: false,
      message: "Username is required",
    });
  }

  if (username?.length < 5 || username?.length > 20) {
    return res.status(400).json({
      success: false,
      message:
        "Username should'nt contain less than 5 characters and more than 20",
    });
  }

  if (/^[a-zA-Z0-9]+$/.test(username) === false) {
    return res.status(400).json({
      success: false,
      message:
        "Username should only contain alphabets and numbers and shouldn't contain spaces",
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }

  if (password?.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password should'nt contain less than 8 characters",
    });
  }

  async function DbCall() {
    const hashpassword = await bcrypt.hash(password, 13);

    try {
      await pool.query(
        "INSERT INTO users (username,hash_password) VALUES ($1,$2)",
        [username, hashpassword],
      );

      return res.status(200).json({
        success: true,
        message: "Signup Sucessfull",
      });
    }
    catch (error) {

      if (error.code === "23505") {

        return res.status(409).json({
          success : false,
          message : "Username alredy exits try something unique"
        })

      }

      console.log(error.message);
      console.log(error);

     return  res.status(500).json({
        message: "Server error",
      });
      console.log(error.message);
    }
  }

  DbCall();
}


function Login(req,res) {

  const username = req.body?.username?.toLowerCase()
  const plainpassword = req.body?.password

  async function DbCall() {

   const result =  await pool.query("SELECT userid , username , hash_password FROM users WHERE username = $1" , [username])

   if (result.rowCount === 0) {

    return res.status(400).json({
      success : false,
      message : "Username or Password did not matched"
    })

   }

  const hash_password = result.rows[0].hash_password
  const userid = result.rows[0].userid
  const  usrname = result.rows[0].username

  try {

    const matched = await bcrypt.compare(plainpassword , hash_password)

    if (!matched) {

      return res.status(400).json({
      success : false,
      message : "Username or Password did not matched"
    })
    }


    const token = jwt.sign({userid : userid , username : usrname} , process.env.JWTSECKEY , {expiresIn : "3h"})
    return res.cookie("jwt" , token).status(200).json({

      success : true,
      message : "Logged In Sucessfull",

    })


  }

  catch (error) {

    console.log(error)
    console.log(error.message);

   return res.status(500).json({
      message : "Server Error"
    })


  }


  }

  DbCall();


}


function Logout(req,res) {

  return res.clearCookie("jwt").status(200).json({
    success : true,
    message : "Logout Sucessfull"
  })


}


export {signup , Login , Logout};
