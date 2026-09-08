import { Link } from "react-router-dom";
import {useForm} from "react-hook-form"
import { useState } from "react";

function UserProfile() {

  const year = new Date().toLocaleString("en-US", {month: "long",day: "numeric",weekday: "long", year: "numeric"});
  const month = new Date().toLocaleString("en-us" , {month : "long"}).toLowerCase()
  const day = new Date().toLocaleString("en-Us" , {day : "numeric"})

  let {register , handleSubmit} = useForm();
  let [selectedmonth , setselectedmonth]= useState("");

  function ViewDetails(data) {

   setselectedmonth(data.selectmonth)


  }

  return<div style={{marginTop : "3%" , textAlign : "center"}}>

         <Link to="/trackfinance" className="common-links">Track Finance</Link>
         <Link to="/" className="common-links">Logout</Link>
         <Link to="/faq" className="common-links">FAQ</Link>
         <br /><br />
  <h1 className="sub-head">Welcome Shreyash , Its {year}</h1>
  <br /><br />

<h1 className="main-head">{month} {day} RECORDS </h1>
  <p  style={{fontSize : "30px"}} className="sub-head">  Expenses : $0 </p>
  <p  style = {{fontSize : "30px"}}className="sub-head"> Income : $0</p>


  <form onSubmit={handleSubmit(ViewDetails)}>

    <h1>View Total Expenses And Income  of The Month</h1>

   <select style={{ height: "0.4in", width: "3in" }} {...register("selectmonth")} >

  <option hidden>{month}</option>
  <option>january</option>
  <option>february</option>
  <option>march</option>
  <option>april</option>
  <option>may</option>
  <option>june</option>
  <option>july</option>
  <option>august</option>
  <option>september</option>
  <option>october</option>
  <option>november</option>
  <option>december</option>
</select>
&nbsp;&nbsp;
<button type="submit" className="btn">View</button>

{selectedmonth ? <h1 className="main-head"> {selectedmonth} RECORDS  </h1> : ""}
{selectedmonth ? <p  style={{fontSize : "30px"}} className="sub-head">  Total Expenses : $0 </p> : ""}
{selectedmonth ? <p  style={{fontSize : "30px"}} className="sub-head">  Total Income : $0 </p> : ""}
{selectedmonth ? <p  style={{fontSize : "30px"}} className="sub-head">  Spent Mostly On : CatergoryX </p> : ""}
{selectedmonth ? <p  style={{fontSize : "30px"}} className="sub-head">  Gained Mostly Through : CatergoryX </p> : ""}



  </form>




  </div>

}


export default UserProfile;
