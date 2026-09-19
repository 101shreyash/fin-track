import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import upload from "../middleware/multipartMiddleware.js";

import { keepFinance, MonthSummary } from "../controllers/financeController.js";

const Router = express.Router();

Router.post("/keepfinance", authenticate , upload.single("receiptimg"), keepFinance);
Router.get("/monthsummary/:month", authenticate, MonthSummary);

export default Router;
