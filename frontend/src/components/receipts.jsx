import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UserReceipts() {
  const defaultmonth = new Date().toLocaleString("en-US", { month: "long" }) .toLocaleLowerCase();
  let { register, handleSubmit } = useForm();
  let [choosedmonth, setchoosedmonth] = useState(defaultmonth);
  let [defaultarraylength, setdefaultarraylength] = useState(0);

  const navigate = useNavigate();

  let [receiptsurl, setreceiptsurl] = useState([]);

  console.log(defaultarraylength);
  console.log(receiptsurl.length);

  function prevButton() {
    if (defaultarraylength > 0) {
      return setdefaultarraylength(defaultarraylength - 1);
    }
  }

  function nextButton() {

    if (defaultarraylength < receiptsurl.length) {

      return setdefaultarraylength(defaultarraylength + 1);

    }

  }

  async function AfterSubmit(data) {
    setchoosedmonth(data.choosedmonth);

    try {

      const result = await fetch(
        `http://localhost:8001/api/viewreceipts/${data.choosedmonth}`,
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
        msg.message === "Session Expired try to login Again" &&
        msg.success === false &&
        result.status === 401
      ) {
        toast.error("Session Expired try to login Again", { duration: 2000 });
        return navigate("/login");
      }

      if (Array.isArray(msg.message) === true) {
        return   setreceiptsurl(msg.message);
      }


    }
    catch (error) {
      console.log(error.message);
      return toast.error(error.message);
    }

  }

  return (
    <div style={{ marginTop: "6%", textAlign: "center" }}>

      <form onChange ={handleSubmit(AfterSubmit)}>

        <h1 className="main-head">Select Month</h1>

        <select
          style={{ height: "0.5in", width: "12%" }}
          {...register("choosedmonth")}
           >
          <option hidden>Select Month</option>
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

      <br />
      <br />
      <br />

 {receiptsurl.length > 0 ?  <h1 style={{fontSize : "60px"}}>{choosedmonth} Receipts </h1>  :  ""}


    {receiptsurl.length > 0 ? <h1> Receipt Number 00{defaultarraylength}</h1> : ""}
    {defaultarraylength === receiptsurl.length ? <h1>No Receipt Found .</h1> : ""}

    {receiptsurl.length > 0 ? <img alt="receipt-image" src={`http://localhost:8001/api/uploads/${receiptsurl[defaultarraylength]?.receipt_img_url}`} className="receipt-img" />  :  ""}

      <br />
      <br />

      {receiptsurl.length > 0 ? <button onClick={prevButton} className="btn">  &lt; prev  </button> : ""}
       &nbsp;&nbsp;
      {receiptsurl.length > 0 ? <button onClick={nextButton} className="btn"> &gt; next </button> :  "" }

    </div>
  );
}

export default UserReceipts;
