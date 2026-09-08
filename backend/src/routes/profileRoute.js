import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import ViewProfile from "../controllers/profileController.js";


const Router = express.Router();

Router.get("/profileinfo" , authenticate , ViewProfile)


export default Router;
