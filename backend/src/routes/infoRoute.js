import express from "express"
import authenticate from "../middleware/authMiddleware.js";
import { askFullName, defaultCurrency } from "../controllers/infoController.js";

const router = express.Router()

router.post("/fullname" , authenticate , askFullName)

router.post("/currencytype" , authenticate , defaultCurrency)


export default router;