import express from "express"
import keepFinance from "../controllers/financeController.js";
import authenticate from "../middleware/authMiddleware.js";


const Router = express.Router();


Router.post("/keepfinance" ,  authenticate,  keepFinance)



export default Router;