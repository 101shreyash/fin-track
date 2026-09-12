
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";



function DeleteAccount() {

 let {register , handleSubmit , reset} =  useForm();
 let navigate = useNavigate();

 async function AfterSubmit(data) {

  const userpassword = data.password;

  try {

    const result = await fetch("http://localhost:8001/api/deleteaccount" , {

      method : "DELETE",
      credentials : "include",
      body : JSON.stringify({password : userpassword}),
      headers : ({
        'Content-type' : 'application/json'
      })

    })

    const msg = await result.json();
    console.log(msg);


    if (result.status === 400 && msg.message === "Password didn't matched delete operation failed" && msg.success === false) {

      toast.error("Password didn't matched account deletation failed" , {duration : 2100})
      return reset();
    }


    if (msg.message === "Session Expired try to login Again" && result.status === 401 && msg.success === false) {

      toast.error("Session Expired try to login Again" , {duration : 1200})
     return navigate("/login")

    }

    if (result.status === 200 && msg.message === "Accoount Deleted Sucessfully" && msg.success === true) {

       navigate("/")
      return toast.success("Account Deleted Sucessfully" , {duration : 1500})

    }



  }


  catch (error) {

    console.log(error.message);
    return toast.error("Server Error" , {duration : "1200"})

  }




 }

  return (
    <div style={{ marginTop: "5%", textAlign: "center"}}>
      <h1
        style={{ fontSize: "50px", color: "red", }} > ⚠️ Warning!</h1>
      <p style={{ fontSize: "18px"}}> Deleting your FinTrack account is <strong>permanent and  irreversible.</strong> </p>
      <p style={{ fontSize: "20px"}}> <strong> Your account is linked to your financial history which means deleting your account would delete all of your records:</strong> </p>

      <p style={{fontSize: "18px", fontWeight : "800"}}>
       So Before continuing, make sure you have exported or <Link className="backup-link">Backedup</Link> up anything
        you may want to keep.
      </p>

      <h3 style={{color: "red"}}  >
      And This action cannot  undone.
      </h3>

      <p style={{ fontSize: "17px"}}>
        If you are certain you want to permanently remove your FinTrack
        account and its associated data, continue below by entering your account password
      </p>

      <br /><br />

    <form onSubmit={handleSubmit(AfterSubmit)}>

  <h1>Enter Your Password To Delete Your Account !</h1>
  <input style={{height : "0.3in"}} type="password" placeholder="Enter your password"  required {...register("password")}/>

 &nbsp; &nbsp;
      <button className="delete-btn"> DELETE ACCOUNT</button>
      </form>

    </div>
  );
}

export default DeleteAccount;
