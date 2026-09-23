import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SkipProtection() {
  let navigate = useNavigate();

  async function CheckAuth() {
    const result = await fetch("http://localhost:8001/auth/authcheck", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });

    const msg = await result.json();

    if (msg.authenticated === true) {
      return navigate("/trackfinance");
    }
  }

  useEffect(() => {
    CheckAuth();
  }, []);
}

function RouteProtection(props) {
  let [authenticated, setauthenticated] = useState(null);
  let navigate = useNavigate();

  async function CheckAuth() {
    try {
      const result = await fetch("http://localhost:8001/auth/authcheck", {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const msg = await result.json();

      if (msg.success === false) {
        toast.error("You need to login First", { duration: 3000 });
        return navigate("/login");
      } else {
        return setauthenticated(true);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Server Error");
    }
  }

  useEffect(() => {
    CheckAuth();
  }, []);

  return authenticated === true ? props.children : null;
}

export { SkipProtection, RouteProtection };
