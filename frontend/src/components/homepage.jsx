import { Link } from "react-router-dom";

function Homepage() {

    return <div className="homepage-hero">
    
       <h1 className="main-head">Start your FinTrack journey</h1>
     <h2 className="sub-head">Know Where Your Money Goes and Why</h2>
       <br /><br /><br />
       <Link to= "/signup" className="quick-links">Get Started</Link>
    </div>
    
}


export default Homepage;