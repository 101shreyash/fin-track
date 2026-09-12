import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

function Signup() {
  let { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  async function AfterSignup(data) {
    try {
      const username = data.username;
      const password = data.password;

      const result = await fetch("http://localhost:8001/auth/signup", {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const msg = await result.json();
      console.log(msg);

      if (
        (result.status === 400) & (msg.success === false) &&
        msg.message ===
          "Username should'nt contain less than 5 characters and more than 20"
      ) {
        toast.error(
          "Username should'nt contain less than 5 characters and more than 20",
          { duration: 4000 },
        );
        return reset();
      }

      if (
        (result.status === 400) & (msg.success === false) &&
        msg.message === "Password should'nt contain less than 8 characters"
      ) {
        toast.error("Password should'nt contain less than 8 characters", {
          duration: 4000,
        });
        return reset();
      }

      if (
        result.status === 400 &&
        msg.success === false &&
        msg.message ===
          "Username should only contain alphabets and numbers and shouldn't contain spaces"
      ) {
        toast.error(
          "Username should only contain alphabets and numbers and shouldn't contain spaces",
          { duration: 4000 },
        );
        return reset();
      }

      if (
        result.status === 409 &&
        msg.success === false &&
        msg.message === "Username alredy exits try something unique"
      ) {
        toast.error("Username alredy exits try something unique", {
          duration: 3000,
        });
        return reset();
      }

      if (
        (result.status === 200) & (msg.success === true) &&
        msg.message === "Signup Sucessfull"
      ) {
        toast.success("Signup Sucessfull", { duration: 1000 });
        return navigate("/login");
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  }

  return (
    <div style={{ marginTop: "10%", textAlign: "center" }}>
      <form onSubmit={handleSubmit(AfterSignup)}>
        <h1 className="sub-head">Signup Now to Get Started</h1>
        <input
          style={{ height: "0.3in" }}
          className="initial-input"
          type="text"
          placeholder="Enter your username"
          required
          {...register("username")}
        />
        &nbsp;&nbsp;
        <input
          style={{ height: "0.3in" }}
          className="initial-input"
          type="password"
          placeholder="Enter your password"
          required
          {...register("password")}
        />
        &nbsp;&nbsp;
        <button type="submit">Signup</button>
        <br />
        <br />
        <p>
          Alredy Have an account ?{" "}
          <Link to="/login" className="common-links">
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
