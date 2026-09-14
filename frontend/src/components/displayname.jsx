import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ChangeDisplayName() {
  let [prevname, setprevname] = useState();
  let {register , handleSubmit , reset} = useForm();
 let  navigate =  useNavigate();


  async function userPrevName() {
    try {
      const result = await fetch("http://localhost:8001/api/profileinfo", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      const msg = await result.json();
      setprevname(msg.message.full_name);
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  }

  useEffect(() => {
    userPrevName();
  }, []);


  async function NetworkCall(data) {

    const displayname = data.displayname

    try {

     const result =  await fetch("http://localhost:8001/api/changedisplayname" , {
        method : "PATCH",
        credentials : "include",
        body : JSON.stringify({displayname : displayname}),
        headers : ({
          'Content-type' : 'application/json'
        })
      })


      const msg = await result.json()
      console.log(msg);

      if (msg.message === "Session Expired try to login Again" && result.status === 401) {

         navigate("/login")
       return  toast.error("Session Expired please login Again" , {duration : 1800})

      }

      if (msg.message === "Name should not consits of numbers and symbols" && result.status === 400) {

         toast.error("Name should not consits of numbers and symbols" , {duration : 2300})
      return reset();

      }

      if (msg.message === `Alright From Now On We Will Call You ${displayname}` && result.status === 200 && msg.success === true) {

       toast.success(`Alright from now on we will call You ${displayname}` , {duration : 2000})
      return navigate ("/trackfinance");

      }





    }

    catch (error) {

      console.log(error);
     return  toast.error(error.message)

    }



  }

  return (
    <div style={{ marginTop: "7%", textAlign: "center" }}>
      <h1> Till now We've called you ,  {prevname} </h1>
        <h2>If you dont like that you can change below .</h2>
        <br /><br />
      <form onSubmit={handleSubmit(NetworkCall)}>
        <input type="text"  placeholder="Enter New Name"  style={{ height: "0.3in", width: "20%" }}  required {...register("displayname")}/>
        &nbsp; &nbsp;
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

export default ChangeDisplayName;
