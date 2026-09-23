import { Route, Routes } from "react-router-dom";
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
import DeleteAccount from "./components/delete";
import Password from "./components/password";
import ChangeDisplayName from "./components/displayname";
import {SkipProtection} from "./components/skiproute";
import { RouteProtection } from "./components/skiproute";


function App() {
  return (
    <>

      <SkipProtection/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/faq" element={<FrequentQuestions />} />

<Route path="/userinfo" element={<RouteProtection><UserInfo /></RouteProtection>} />
<Route path="/trackfinance" element={<RouteProtection><TrackFinance /></RouteProtection>} />
<Route path="/profile" element={<RouteProtection><UserProfile /></RouteProtection>} />
<Route path="/receipts" element={<RouteProtection> <UserReceipts /> </RouteProtection>} />
<Route path="/setting" element={<RouteProtection><Usersetting /></RouteProtection>} />
<Route path="/setting/delete" element={<RouteProtection><DeleteAccount /></RouteProtection>} />
<Route path="/setting/password" element={<RouteProtection><Password /></RouteProtection>} />
<Route path="/setting/changename" element={<RouteProtection><ChangeDisplayName /></RouteProtection>} />



  <Route path ="*"element={  <h1 style={{ textAlign: "center", marginTop: "10%" }}>  404 Page Not found </h1>}/>


      </Routes>
    </>
  );
}

export default App;
