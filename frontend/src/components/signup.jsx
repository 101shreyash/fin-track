import { Link } from "react-router-dom";

function Signup() {


    return <div className="signup-form">

        <form>

            <h1>Signup Now to Get Started</h1>
            <input className="initial-input" type="text" placeholder="Enter your username" required />
            &nbsp;&nbsp;
            <input className="initial-input" type="password" placeholder="Enter your password" required />
            &nbsp;&nbsp;

            <button type="submit">Signup</button>
            <p>Alredy Have an account ? <Link to="/login" className="footer-link">Login Now</Link></p>


        </form>



    </div>


}


export default Signup;