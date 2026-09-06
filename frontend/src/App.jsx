
import { Route  , Routes} from "react-router-dom";
import Homepage from "./components/homepage";
import Signup from "./components/signup";
import Login from "./components/login";
import UserInfo from "./components/userinfo";


function App() {

  return <>
    

  <Routes>

    <Route path="/" element ={<Homepage/>}/>
    <Route path="/signup" element ={<Signup/>}/>
    <Route path="/login" element ={<Login/>}/>
    <Route path="/userinfo" element ={<UserInfo/>}/>


  </Routes>
  
  
  </>
  
}

export default App;