// Global Installation

import express from "express"
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config"

// Routers

import authrouter from "./routes/authroutes.js";
import infoRouter from "./routes/infoRoute.js";
import financeRouter from "./routes/financeRoute.js"
import profileRouter from "./routes/profileRoute.js"


const app = express();
const port = process.env.EXPRESSPORT


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())


app.use("/auth" , authrouter)
app.use("/api" , infoRouter)
app.use("/api" , financeRouter)
app.use("/api" , profileRouter)


app.listen(port , (() => {console.log(`App is listening on ${port}`)}))
