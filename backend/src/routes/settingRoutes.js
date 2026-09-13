import express from "express"
import authenticate from "../middleware/authMiddleware.js";
import { ChangeCurrency, ChangeDisplayName, ChangePassword, DeleteAccount } from "../controllers/settingController.js";


const Router = express();


Router.delete("/deleteaccount" , authenticate  ,  DeleteAccount)
Router.patch("/changepassword" , authenticate  ,  ChangePassword)
Router.patch("/changecurrency" , authenticate , ChangeCurrency)
Router.patch("/changedisplayname" , authenticate , ChangeDisplayName )


export default Router;
