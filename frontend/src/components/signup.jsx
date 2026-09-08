import { Link } from "react-router-dom";

function Signup() {


    return <div style={{marginTop : "10%" , textAlign : "center"}}>

        <form>

            <h1 className="sub-head">Signup Now to Get Started</h1>
            <input style={{height : "0.3in"}} className="initial-input" type="text" placeholder="Enter your username" required />
            &nbsp;&nbsp;
            <input  style={{height : "0.3in"}} className="initial-input" type="password" placeholder="Enter your password" required />
            &nbsp;&nbsp;
            <button type="submit">Signup</button>
            <br /><br />
            <p>Alredy Have an account ? <Link to="/login" className="footer-link">Login Now</Link></p>


        </form>



    </div>


}


export default Signup;
