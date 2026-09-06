import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();


    function AfterLogin() {

        navigate("/userinfo")
        
    }


    return <div className="signup-form">

        <form onSubmit={AfterLogin}>

            <h1>Login Now to Get Started</h1>
            <input className="initial-input" type="text" placeholder="Enter your username" required />
            &nbsp;&nbsp;
            <input className="initial-input" type="password" placeholder="Enter your password" required />
            &nbsp;&nbsp;
            <button type="submit">Login</button>
            <p> New here to fintrack ? <Link to="/signup" className="footer-link">Signup Now</Link></p>


        </form>



    </div>


}


export default Login;