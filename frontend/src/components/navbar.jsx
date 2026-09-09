import { Link } from "react-router-dom";


function NavBar() {
  return (
    <>
        <Link to="/profile" className="common-links">Records</Link>
        <Link to="/faq" className="common-links">FAQ</Link>
        {/* <Link to="/" className="common-links">Logout</Link> */}
        <button style={{border : "none" , background : "none"}} className="common-links">Logout</button>
    </>
  );
}

export default NavBar;
