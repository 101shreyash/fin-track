import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  let { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  function AfterSubmit(data) {
    console.log(data);
    navigate("/trackfinance");
  }

  return (
    <div style={{ marginTop: "5%", textAlign: "center" }}>
      <form onSubmit={handleSubmit(AfterSubmit)}>
        <h1 className="sub-head">Enter Your Fullname </h1>
        <input style={{height : "0.3in", width : "4in"}} type="text" placeholder="Enter your fullname" {...register("fullname")} required/>
        <h1 className="sub-head"> Choose Your default Currency</h1>
        <p style={{ fontSize: "18px" }}> Note : We are planning to add more Currency codes in the future</p>
        <select style={{height : "0.3in", width : "4in"}} {...register("currency")}>
          <option>USD</option>
          <option>NPR</option>
          <option>EUR</option>
          <option>AUD</option>
          <option>CAD</option>
          <option>INR</option>
        </select>

        <br /> <br /> <br />
        <button className="btn" type="submit">Get Started</button>
      </form>
    </div>
  );
}

export default UserInfo;
