import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Usersetting() {

  const navigate = useNavigate();

  function DeleteAccount() {


        navigate("delete")

  }

return <div style={{marginTop : "4%" , textAlign : "center"}}>

<h1 className="main-head">User Settings</h1>
<button className="quick-links" style={{border : "none" , background : "none" }}> Change ProfilePicture</button>
<br /><br />
<button className="quick-links" style={{border : "none" , background : "none"}}> Change Display Name</button>
<br /><br />
<h1 style={{fontSize : "40px" , color : "red"}}>! Danger ZONE </h1>
<button onClick={DeleteAccount} className="quick-links" style={{border : "none" , background : "none"}}> Delete Fintrack Account</button>

</div>

}


export default Usersetting;
