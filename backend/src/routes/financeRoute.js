import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import upload from "../middleware/multipartMiddleware.js";

import { DateSummary, keepFinance, MonthSummary, ViewReceipts } from "../controllers/financeController.js";

const Router = express.Router();



Router.use("/uploads" , express.static("receipts"));

Router.post("/keepfinance",authenticate,upload.single("receiptimg"),keepFinance);
Router.get("/monthsummary/:month", authenticate, MonthSummary);
Router.get("/viewreceipts/:month", authenticate, ViewReceipts);
Router.get("/datesummary/:date", authenticate, DateSummary);




export default Router;

