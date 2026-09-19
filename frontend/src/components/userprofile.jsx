import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useInsertionEffect, useState } from "react";
import NavBar from "./navbar";
import CalenderPicker from "./DatePicker";
import toast from "react-hot-toast";

function UserProfile() {
  const year = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    weekday: "long",
    year: "numeric",
  });
  const month = new Date()
    .toLocaleString("en-us", { month: "long" })
    .toLowerCase();
  const day = new Date().toLocaleString("en-Us", { day: "numeric" });

  let { register, handleSubmit } = useForm();
  let [selectedmonth, setselectedmonth] = useState("");

  let [totalincome, settotalincome] = useState();
  let [totalexpense, settotalexpense] = useState();

  let navigate = useNavigate();

  async function ViewDetails(data) {
    setselectedmonth(data.selectmonth);
    const choosenMonth = data.selectmonth;

    try {
      const result = await fetch(
        `http://localhost:8001/api/monthsummary/${choosenMonth}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        },
      );

      const msg = await result.json();

      if (
        (msg.message === "Session Expired try to login Again" &&
          msg.success === false,
        result.status === 401)
      ) {
        navigate("/login");
        return toast.error("Session Expired try to login Again", {
          duration: 2000,
        });
      }

      settotalincome(msg.message.totalincome);
      settotalexpense(msg.message.totalexpenses);
    } catch (error) {
      toast.error("Server Error");
      console.log(error.message);
    }
  }

  return (
    <div style={{ marginTop: "3%", textAlign: "center" }}>
      <Link to="/trackfinance" className="common-links">
        Track Finance
      </Link>
      &nbsp;&nbsp;&nbsp;
      <NavBar />
      <br />
      <br />
      <h1>Welcome Shreyash, Its {year}</h1>
      <br />
      <h3>Select an appropriate date and view record</h3>
      <CalenderPicker />
      <h1>View Total Summary of the Selected Month</h1>
      <form onSubmit={handleSubmit(ViewDetails)}>
        <select
          style={{ height: "0.4in", width: "3in" }}
          {...register("selectmonth")}
        >
          <option hidden>{month}</option>
          <option>january</option>
          <option>february</option>
          <option>march</option>
          <option>april</option>
          <option>may</option>
          <option>june</option>
          <option>july</option>
          <option>august</option>
          <option>september</option>
          <option>october</option>
          <option>november</option>
          <option>december</option>
        </select>
        &nbsp;&nbsp;
        <button type="submit" className="btn">
          View
        </button>
        {selectedmonth ? (
          <h1 style={{ fontSize: "60px" }}>{selectedmonth} Records</h1>
        ) : (
          ""
        )}
        {selectedmonth ? (
          <p style={{ fontSize: "30px" }} className="sub-head">
            {" "}
            Total Income :{" "}
            {totalincome
              ? totalincome
              : "Income is not Recorded for this month"}{" "}
          </p>
        ) : (
          ""
        )}
        {selectedmonth ? (
          <p style={{ fontSize: "30px" }} className="sub-head">
            {" "}
            Total Expenses :{" "}
            {totalexpense
              ? totalexpense
              : " Expenses is not Recorded for this month"}{" "}
          </p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default UserProfile;
