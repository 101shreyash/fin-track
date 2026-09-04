import express from "express"
import userInfo from "../controllers/infoController.js";
import authenticate from "../middleware/authMiddleware.js";


const router = express.Router()

router.post("/userinfo" , authenticate , userInfo)


export default router;