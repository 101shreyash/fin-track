import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Password() {
  let { register, handleSubmit , reset} = useForm();
  let navigate = useNavigate();

  async function AfterSubmit(data) {
    try {
      const currentpassword = data.currentpassword;
      const newpassword = data.newpassword;
      const retypedpassword = data.retypedpassword;

      const result = await fetch("http://localhost:8001/api/changepassword", {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({
          currentpassword: currentpassword,
          newpassword: newpassword,
          retypedpassword: retypedpassword,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const msg = await result.json();
      console.log(msg);

      if ( msg.message === "Session Expired try to login Again" &&  result.status === 401 && msg.success === false) {

        navigate("/login");
        return toast.error("Session Expired please login Again", {
          duration: 2000,
        });

      }

     if (msg.message === "New password must have at least 8 chracters. Please try again" && result.status === 400)  {
          reset();
         return toast.error(  "New password must have at least 8 chracters. Please try again", { duration: 3700 })

        }


       if (result.status === 401 && msg.message === "Re-typed password didnot matched with new password try again") {

          reset();
        return  toast.error("Re-typed password didnot matched with new password try again" , {duration : 3700})

        }

        if (result.status === 401 && msg.message === "Current Password Did'nt Matched please try again.") {

         reset();
         return  toast.error("Current Password Did'nt Matched please try again with valid one" , {duration : 3200})

        }

        if (result.status === 200 && msg.success === true && msg.message === "Password Changed Sucessfully") {


          toast.success("Password Changed Sucessfully" , {duration : 1700})
          return navigate("/login")

        }

    }




    catch (error) {

      toast.error("Server Error" , {duration : 2000})
      console.log(error);
    }


  }

  return (
    <div style={{ marginTop: "5%", textAlign: "center" }}>
      <h1 className="main-head">Change Account Password</h1>
      <br />
      <br />

      <form onSubmit={handleSubmit(AfterSubmit)}>
        <h2>Enter Your Current Password</h2>
        <input
          type="text"
          placeholder="Enter Current Password"
          style={{ height: "0.3in", width: "15%" }}
          required
          {...register("currentpassword")}
        />
        <br />
        <h2>Enter New Password</h2>

        <input
          type="text"
          placeholder="Enter New Password"
          style={{ height: "0.3in", width: "15%" }}
          required
          {...register("newpassword")}
        />
        <br />
        <h2>Retype New Password</h2>
        <input
          type="text"
          placeholder="Retype New Password"
          style={{ height: "0.3in", width: "15%" }}
          required
          {...register("retypedpassword")}
        />
        <br />
        <br />
        <button>Change password</button>
      </form>
    </div>
  );
}

export default Password;
