import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function ChangeDisplayName() {
  let [prevname, setprevname] = useState();

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

  return (
    <div style={{ marginTop: "7%", textAlign: "center" }}>
      <h1> Till now We've called you  ,{prevname} if you dont like that you change Below </h1>
      <form>
        <input type="text"  placeholder="Enter New Name"  style={{ height: "0.3in", width: "20%" }}  required/>
        &nbsp;
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ChangeDisplayName;
