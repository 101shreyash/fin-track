import { Link } from "react-router-dom";
import NavBar from "./navbar";

function TrackFinance() {
  const year = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    weekday: "long",
    year: "numeric",
  });

  return (
    <div style={{ marginTop: "4%", textAlign: "center" }}>
      <NavBar/>

      <br /><br /><br />
      <h1 className="sub-head"> Welcome , Shreyash </h1>
      <h1 className="sub-head"> Its {year} </h1>
      <h2 className="sub-head">How much was your today's Expense</h2>
      <input
        style={{ height: "0.3in", width: "3in" }}
        className="initial-input"
        type="number"
        placeholder="0$"
      />
      <h2 className="sub-head">Spent On?</h2>
      <form>
        <select
          required
          className="select-currency"
          style={{ height: "0.3in", width: "3in" }} >
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
          placeholder="0$"
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
            height: "1in",
            padding: "10px 20px",
            boxSizing: "border-box",
            resize: "none",
          }}
          placeholder="Spent money on something I didn’t really need. I’ll be more mindful of my spending and make better financial decisions next time."
        />
        <br />
        <br />
        <br />

        <button type="submit" className="btn">
          Track Now{" "}
        </button>
      </form>
    </div>
  );
}

export default TrackFinance;
