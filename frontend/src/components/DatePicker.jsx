import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function CalenderPicker() {
  let [date, setdate] = useState(null);

  function ChangeDate(pickeddate) {
    setdate(pickeddate);

    const yy = pickeddate.getFullYear();
    const mm = pickeddate.getMonth() + 1; // Because javascript stores month index from 0 like 0 - january 1 - febreuary
    const dd = pickeddate.getDate();

    console.log(`${yy}-${mm}-${dd}`);
  }


  return (
    <>
    <DatePicker className="date-picker" placeholderText="View Record via Date" selected={date} onChange={ChangeDate} >
    </DatePicker>
    </>
  )


}

export default CalenderPicker;
