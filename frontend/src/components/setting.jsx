import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Usersetting() {

  const navigate = useNavigate();

  function DeleteAccount() {

        navigate("delete")
  }

return <div style={{marginTop : "4%" , textAlign : "center"}}>


<h1 className="main-head">User Settings </h1>

<br /><br />
<h1 style={{fontSize : "40px" , color : "red"}}>Edit Profile</h1>
<br />
<Link to="changecurrency" className="setting-btn">Change Currency Type</Link>
<br /><br />
<Link to="password" className="setting-btn">Change Account Password</Link>
<br /><br />
<Link className="setting-btn">Change Display Name</Link>
<br /><br />
<h1 style={{fontSize : "40px" , color : "red"}}> ⚠️ Danger ZONE </h1>
<Link className="setting-btn">Backup Data</Link>
<br /><br />
<Link to= "delete" className="setting-btn">Delete Fintrack Account</Link>
<br /><br />


</div>

}


export default Usersetting;
