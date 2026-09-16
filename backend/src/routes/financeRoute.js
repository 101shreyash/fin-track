import express from "express";
import keepFinance from "../controllers/financeController.js";
import authenticate from "../middleware/authMiddleware.js";
import upload from "../middleware/multipartMiddleware.js";

const Router = express.Router();

Router.post("/keepfinance", authenticate , upload.single("receiptimg") ,  keepFinance);

export default Router;
