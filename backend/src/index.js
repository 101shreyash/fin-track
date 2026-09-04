import express from "express"
import "dotenv/config"
import authrouter from "./routes/authroutes.js";
import infoRouter from "./routes/infoRoute.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";


const app = express();
const port = process.env.EXPRESSPORT


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


app.use("/auth" , authrouter)
app.use("/api" , infoRouter)


app.listen(port , (() => {console.log(`App is listening on ${port}`)}))