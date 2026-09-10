import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import {checkFullName,ViewProfile} from "../controllers/profileController.js";

const Router = express.Router();

Router.get("/profileinfo", authenticate, ViewProfile);
Router.get("/checkfullname", authenticate, checkFullName);

export default Router;
