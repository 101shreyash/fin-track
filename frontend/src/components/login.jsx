import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();


    function AfterLogin() {

        navigate("/userinfo")

    }


    return <div style={{marginTop : "10%" , textAlign : "center"}}>

        <form onSubmit={AfterLogin}>

            <h1 className="sub-head">Login Now to Get Started</h1>
            <input style={{height : "0.3in"}} className="initial-input" type="text" placeholder="Enter your username" required />
            &nbsp;&nbsp;
            <input  style={{height : "0.3in"}} className="initial-input" type="password" placeholder="Enter your password" required />
            &nbsp;&nbsp;
            <button type="submit">Login</button>
            <br /><br />
            <p> New here in fintrack ? <Link to="/signup" className="footer-link">Signup Now</Link></p>


        </form>



    </div>



}


export default Login;
