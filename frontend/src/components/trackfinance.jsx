import { Link, useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

function TrackFinance() {
  let [username, setusername] = useState("");
  let [currencytype, setcurrencytype] = useState("");

  const navigate = useNavigate();

  async function getUsername() {
    try {
      const result = await fetch("http://localhost:8001/api/profileinfo", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      const msg = await result.json();

      if (
        msg.message === "Session Expired try to login Again" &&
        result.status === 401 &&
        msg.success === false
      ) {
        navigate("/login");
        return toast.error("Session Expired try to login Again", {
          duration: 1800,
        });
      }

      setcurrencytype(msg.message.currency_type);
      return setusername(msg.message.full_name);
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  }

  useEffect(() => {
    getUsername();
  }, []);

  const year = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    weekday: "long",
    year: "numeric",
  });

  return (
    <div style={{ marginTop: "2%", textAlign: "center" }}>
      <NavBar />

      <br />
      <br />
      <br />

      <h1 className="sub-head"> Welcome , {username} </h1>

      <h1 className="sub-head"> Its {year} </h1>
      <h2 className="sub-head">How much was your today's Expense</h2>
      <input
        style={{ height: "0.3in", width: "3in" }}
        className="initial-input"
        type="number"
        placeholder={`0 ${currencytype}$`}
      />
      <h2 className="sub-head">Spent On?</h2>
      <form>
        <select
          required
          className="select-currency"
          style={{ height: "0.3in", width: "3in" }}
        >
          <option hidden>Select Category</option>

          <option>Shopping</option>
          <option>Food & Dining</option>
          <option>Groceries</option>
          <option>Transportation</option>
          <option>Fuel / Gas</option>
          <option>Rent</option>
          <option>Utilities</option>
          <option>Electricity</option>
          <option>Internet</option>
          <option>Phone / Mobile</option>
          <option>Health & Medical</option>
          <option>Education</option>
          <option>Entertainment</option>
          <option>Travel</option>
          <option>Clothing</option>
          <option>Subscriptions</option>
          <option>Insurance</option>
          <option>Personal Care</option>
          <option>Fitness & Sports</option>
          <option>Gifts & Donations</option>
          <option>Home & Household</option>
          <option>Electronics</option>
          <option>Pets</option>
          <option>Taxes</option>
          <option>Others</option>
        </select>
        <h2 className="sub-head">How much Profit You had Today</h2>
        <input
          className="initial-input"
          type="number"
          placeholder={`0 ${currencytype}$`}
          style={{ height: "0.3in", width: "3in" }}
        />
        <h2 className="sub-head">Earned From?</h2>
        <select
          required
          className="select-currency"
          style={{ height: "0.3in", width: "3in" }}
        >
          <option hidden>Select Category</option>
          <option>Salary</option>
          <option>Business</option>
          <option>Freelancing</option>
          <option>Investment</option>
          <option>Stocks</option>
          <option>Cryptocurrency</option>
          <option>Real Estate</option>
          <option>Rental Income</option>
          <option>Interest</option>
          <option>Dividends</option>
          <option>Commission</option>
          <option>Bonus</option>
          <option>Side Business</option>
          <option>Online Business</option>
          <option>Content Creation</option>
          <option>Affiliate Income</option>
          <option>Royalties</option>
          <option>Refund</option>
          <option>Cashback</option>
          <option>Gifts</option>
          <option>Allowance</option>
          <option>Pension</option>
          <option>Grant / Scholarship</option>
          <option>Others</option>
        </select>
        <br />
        <br />
        <h2 className="sub-head">Any Note? (Optional)</h2>
        <textarea
          style={{
            width: "40%",
            height: "0.6in",
            padding: "10px 20px",
            boxSizing: "border-box",
            resize: "none",
          }}
          placeholder="Spent money on something I didn’t really need. I’ll be more mindful of my spending and make better financial decisions next time."
        />

        <br />
        <br />

        <h2 className="sub-head">Upload Receipt (OPTIONAL)</h2>

        <input type="file" accept=".jpeg , .png , .jpg" />

        <br />
        <br />
        <br />
        <button type="submit" className="btn">
          Track Now
        </button>
      </form>
    </div>
  );
}

export default TrackFinance;
