import express from "express"
import authenticate from "../middleware/authMiddleware.js";
import { DeleteAccount } from "../controllers/settingController.js";



const Router = express();


Router.delete("/deleteaccount" , authenticate  ,  DeleteAccount)


export default Router;
