import { Link } from "react-router-dom";


function NavBar() {
  return (
    <>
         <Link to="/aboutus" className="common-links">Aboutus</Link>
        <Link to="/profile" className="common-links">Profile</Link>
        <Link to="/faq" className="common-links">FAQ</Link>
        <Link to="/" className="common-links">Logout</Link>
    </>
  );
}

export default NavBar;
