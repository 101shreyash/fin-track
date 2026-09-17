import { useState } from "react";
import { useForm } from "react-hook-form";

function UserReceipts() {
  const defaultmonth = new Date()
    .toLocaleString("en-US", { month: "long" })
    .toLocaleLowerCase();
  let { register, handleSubmit } = useForm();
  let [choosedmonth, setchoosedmonth] = useState(defaultmonth);

  function AfterSubmit(data) {
     setchoosedmonth(data.choosedmonth);

    console.log(data.choosedmonth);

  }

  return (
    <div style={{ marginTop: "6%", textAlign: "center" }}>
      <form onChange={handleSubmit(AfterSubmit)}>
        <h1 className="main-head">Select Month</h1>
        <select style={{ height: "0.5in", width: "12%" }}  {...register("choosedmonth")}
        >
          <option hidden>{defaultmonth}</option>
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
      </form>
      <h1 className="main-head">{choosedmonth} Receipts</h1>
        <img src="./image.png" alt="receipt" className="receipt-img" />
      <br /><br />
      <button className="btn"> &lt; prev </button>
      &nbsp; &nbsp;
      <button className="btn"> &gt; next </button>
    </div>
  );
}

export default UserReceipts;
