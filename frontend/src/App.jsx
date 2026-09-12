
import { Route  , Routes} from "react-router-dom";
import Homepage from "./components/homepage";
import Signup from "./components/signup";
import Login from "./components/login";
import UserInfo from "./components/userinfo";
import TrackFinance from "./components/trackfinance";
import AboutUs from "./components/aboutus";
import UserProfile from "./components/userprofile";
import FrequentQuestions from "./components/faq";
import UserReceipts from "./components/receipts";
import Usersetting from "./components/setting";
import  DeleteAccount from "./components/delete";
import Password from "./components/password";


function App() {

  return <>

  <Routes>

    <Route path="/" element ={<Homepage/>}/>
    <Route path="/signup" element ={<Signup/>}/>
    <Route path="/login" element ={<Login/>}/>
    <Route path="/userinfo" element ={<UserInfo/>}/>
    <Route path="/trackfinance" element ={<TrackFinance/>}/>
    <Route path="/aboutus" element ={<AboutUs/>}/>
    <Route path="/faq" element ={<FrequentQuestions/>}/>
    <Route path="/profile" element ={<UserProfile/>}/>
    <Route path="/receipts" element ={<UserReceipts/>}/>
    <Route path="/setting" element ={<Usersetting/>}/>
    <Route path="/setting/delete" element ={<DeleteAccount/>}/>
    <Route path="/setting/password" element ={<Password/>}/>
    <Route path="*" element ={<h1 style={{textAlign : "center" , marginTop : "10%"}}>404 Page Not found</h1>}/>


  </Routes>


  </>

}

export default App;
