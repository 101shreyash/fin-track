import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

function UserInfo() {
  let { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  async function CheckFullName() {
    try {
      const result = await fetch("http://localhost:8001/api/checkfullname", {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const msg = await result.json();

      if (
        msg.message === "Fullname exists" &&
        result.status === 200 &&
        msg.success === true
      ) {
        return navigate("/trackfinance");
      }

    } // try block ends here

    catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  }

  useEffect(() => {
    CheckFullName();
  }, []);

  async function AfterSubmit(data) {
    const fullname = data.fullname;
    const currencytype = data.currencytype;

    try {
      const result = await fetch("http://localhost:8001/api/userinfo", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ currency: currencytype, fullname: fullname }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const msg = await result.json();
      console.log(msg);

      if (result.status === 200 && msg.success === true) {
        toast.success(msg.message, { duration: 3000 });
        return navigate("/trackfinance");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div style={{ marginTop: "5%", textAlign: "center" }}>
      <form onSubmit={handleSubmit(AfterSubmit)}>
        <h1 className="sub-head">Enter Your Fullname </h1>
        <input
          style={{ height: "0.3in", width: "4in" }}
          type="text"
          placeholder="Enter your fullname"
          {...register("fullname")}
          required
        />
        <h1 className="sub-head"> Choose Your default Currency</h1>
        <p style={{ fontSize: "18px" }}>
          {" "}
          Note : We are planning to add more Currency codes in the future
        </p>
        <select
          style={{ height: "0.3in", width: "4in" }}
          {...register("currencytype")}
        >
          <option>USD</option>
          <option>NPR</option>
          <option>EUR</option>
          <option>AUD</option>
          <option>CAD</option>
          <option>INR</option>
        </select>
        <br /> <br /> <br />
        <button className="btn" type="submit">
          Get Started
        </button>
      </form>
    </div>
  );
}

export default UserInfo;
