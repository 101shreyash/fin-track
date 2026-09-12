import { Link } from "react-router-dom";
import NavBar from "./navbar";

function Homepage() {

    return <div style={{marginTop : "10%" , textAlign : "center"}}>
      <Link to="/aboutus" className="common-links">Aboutus</Link> &nbsp;&nbsp;&nbsp;
        <Link to="faq" className="common-links">FAQ</Link>
       <h1 className="main-head">Start your FinTrack journey</h1>
     <h2 className="sub-head">Know Where Your Money Goes and Why</h2>
       <br /><br /><br />
       <Link to= "/signup" className="common-links">Get Started</Link>
    </div>

}


export default Homepage;
