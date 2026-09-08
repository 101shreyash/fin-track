import express from "express"
import { signup , Login, Logout } from "../controllers/authcontroller.js";
import authenticate from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/signup" , signup)
router.post("/login" , Login)
router.delete("/logout"  ,  authenticate , Logout)

export default router;
