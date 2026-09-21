import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CalenderPicker() {
  let [date, setdate] = useState(null);
  const navigate = useNavigate();

  let [totalincome, settotalincome] = useState(null);
  let [totalexpense, settotalexpense] = useState(null);

  async function ChangeDate(pickeddate) {
    setdate(pickeddate);

    // yyyy
    const yy = pickeddate.getFullYear();
    const finalyy = yy.toString();

    // mm
    const mm = pickeddate.getMonth() + 1; // the reason we did +1 is because javascript treats 0 as january and 1 as february
    const stringMonth = mm.toString();
    const finalmm = stringMonth.padStart(2, "0");

    // dd

    const dd = pickeddate.getDate();
    const stringDate = dd.toString();
    const finaldd = stringDate.padStart(2, "0");

    const finalValue = `${finalyy}-${finalmm}-${finaldd}`;

    const result = await fetch(
      `http://localhost:8001/api/datesummary/${finalValue}`,
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
      msg.success === false &&
      msg.message === "Session Expired try to login Again" &&
      result.status === 401
    ) {
      toast.error("Session Expired try to login Again");
      return navigate("/login");
    }

    const outputincome = msg.message.totalincome;
    const outputexpense = msg.message.totalexpense;

    //  console.log(totalincome);
    //  console.log(totalexpense);

    {
      outputincome !== null ? settotalincome(outputincome) : null;
    }
    {
      outputexpense !== null ? settotalexpense(outputexpense) : null;
    }
  }

  return (
    <>
      <DatePicker
        className="date-picker"
        placeholderText="View Record via Date"
        selected={date}
        onChange={ChangeDate}
      ></DatePicker>

      <br />
      <br />
      {totalincome === null ? (
        <h1> Expenses : Not Found till now.</h1>
      ) : (
        <h1>Expenses : {totalexpense}</h1>
      )}
      {totalincome === null ? (
        <h1> Income : Not Found till now. </h1>
      ) : (
        <h1>Income : {totalincome}</h1>
      )}
      <br />
      <br />
      <br />
    </>
  );
}

export default CalenderPicker;
