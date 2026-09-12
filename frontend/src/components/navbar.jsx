import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  async function Logout() {
    try {
      const result = await fetch("http://localhost:8001/auth/logout", {
        method: "DELETE",
        credentials: "include",
      });

      const msg = await result.json();

      if (
        msg.success === true &&
        msg.message === "Logout Sucessfull" &&
        result.status === 200
      ) {
        toast.success("Logout Sucessfull", { duration: 1500 });
        return navigate("/");
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  }

  return (
    <>
      <Link to="/profile" className="common-links">
        Records
      </Link>
      &nbsp; &nbsp; &nbsp;

      <Link to="/receipts" className="common-links">
        Receipts
      </Link>
            &nbsp; &nbsp; &nbsp;

      <Link to="/faq" className="common-links">
        FAQ
      </Link>
            &nbsp; &nbsp; &nbsp;

      <button
        onClick={Logout}
        style={{ border: "none", background: "none",  fontSize : "20px"}}
        className="common-links"
      >
        Logout
              &nbsp; &nbsp; &nbsp;

      </button>
      <Link to="/setting" className="common-links">Setting</Link>
    </>
  );
}

export default NavBar;
