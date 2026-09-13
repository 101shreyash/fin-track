import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Usersetting() {

  const navigate = useNavigate();
  let {register , handleSubmit , reset} =  useForm();

  async function ChangeCurrencyType(data) {

    const currencytype =  data.currencytype;

    const result = await fetch("http://localhost:8001/api/changecurrency" , {
      method : "PATCH",
      body : JSON.stringify({currencytype : currencytype}),
      credentials : "include",
      headers : ({
        'Content-type' : 'application/json'
      })
    })

    const msg = await result.json()

    if (result.status === 401 && msg.message === "Session Expired try to login Again" && msg.success === false) {

     toast.error("Session Expired try to login Again" , {duration : 2000})
     navigate("/login")

    }

    if (msg.success === true && msg.message === `Currency type is now set to ${currencytype}` && result.status === 200) {

       toast.success(`Currency type is now set to ${currencytype}`)
       return reset();

    }



  }



return <div style={{marginTop : "4%" , textAlign : "center"}}>


<h1 style={{fontSize : "40px"}}>User Settings </h1>
<br />

<h1 style={{fontSize : "40px" , color : "red"}}>Edit Profile</h1>
<br />

<form onSubmit={handleSubmit(ChangeCurrencyType)}>
<h2>Change Currency Type</h2>
<select style={{width : "8%" , height : "0.3in"}} {...register("currencytype")}>
          <option>USD</option>
          <option>NPR</option>
          <option>EUR</option>
          <option>AUD</option>
          <option>CAD</option>
          <option>INR</option>

</select>

 &nbsp; &nbsp; <button>Submit</button>


</form>

<br /><br />
<Link to="password" className="setting-btn">Change Account Password</Link>
<br /><br />
<Link to="changename" className="setting-btn">Change Display Name</Link>
<br /><br />
<h1 style={{fontSize : "40px" , color : "red"}}> ⚠️ Danger ZONE </h1>
<Link className="setting-btn">Backup Data</Link>
<br /><br />
<Link to= "delete" className="setting-btn">Delete Fintrack Account</Link>
<br /><br />


</div>

}


export default Usersetting;
