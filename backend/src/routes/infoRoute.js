import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import userInfo from "../controllers/infoController.js";

const router = express.Router();

router.post("/userinfo", authenticate, userInfo);

export default router;
