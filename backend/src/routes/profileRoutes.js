
import express from "express"
import ViewProfile from "../controllers/profileController.js";
import authenticate from "../middleware/authMiddleware.js";



const router = express.Router();


router.post("/viewprofile" , authenticate ,  ViewProfile )


export default router;