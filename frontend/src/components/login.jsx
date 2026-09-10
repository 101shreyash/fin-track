import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  let { register, handleSubmit, reset } = useForm();

  async function AfterLogin(data) {
    try {
      const username = data.username;
      const password = data.password;

      const result = await fetch("http://localhost:8001/auth/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const msg = await result.json();
      console.log(msg);

      if (
        result.status === 400 &&
        msg.success === false &&
        msg.message === "Username or Password did not matched"
      ) {
        toast.error("Username or Password did not matched", { duration: 2000 });
        return reset();
      }

      if (
        result.status === 200 &&
        msg.success === true &&
        msg.message === "Logged In Sucessfull"
      ) {
        toast.success("Logged In Sucessfull", { duration: 1000 });
        return navigate("/userinfo");
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  }

  return (
    <div style={{ marginTop: "10%", textAlign: "center" }}>
      <form onSubmit={handleSubmit(AfterLogin)}>
        <h1 className="sub-head">Login Now to Get Started</h1>
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
        <button type="submit">Login</button>
        <br />
        <br />
        <p>
          {" "}
          New here in fintrack ?{" "}
          <Link to="/signup" className="footer-link">
            Signup Now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
