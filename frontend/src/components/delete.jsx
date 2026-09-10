
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function DeleteAccount() {

 let {register , handleSubmit , reset} =  useForm();

 function AfterSubmit(data) {

  const userpassword = data.password;
  console.log(userpassword);
  reset();


 }

  return (
    <div style={{ marginTop: "5%", textAlign: "center"}}>
      <h1
        style={{ fontSize: "50px", color: "red", }} > ⚠️ Warning!</h1>
      <p style={{ fontSize: "18px"}}> Deleting your FinTrack account is <strong>permanent and potentially irreversible.</strong> </p>
      <p style={{ fontSize: "20px"}}> <strong> Your account is linked to your financial history which means deleting your account would delete all of your records:</strong> </p>

      <p style={{fontSize: "18px", fontWeight : "800"}}>
       So Before continuing, make sure you have exported or <Link className="backup-link">Backedup</Link> up anything
        you may want to keep.
      </p>

      <h3 style={{color: "red"}}  >
        This action cannot  undone.
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
