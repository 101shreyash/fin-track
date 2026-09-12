import express from "express"
import authenticate from "../middleware/authMiddleware.js";
import { ChangePassword, DeleteAccount } from "../controllers/settingController.js";



const Router = express();


Router.delete("/deleteaccount" , authenticate  ,  DeleteAccount)
Router.patch("/changepassword" , authenticate  ,  ChangePassword)


export default Router;
