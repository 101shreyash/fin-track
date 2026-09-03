import express from "express"
import "dotenv/config"
import authrouter from "./routes/authroutes.js";
import jwt from "jsonwebtoken";


const app = express();
const port = process.env.EXPRESSPORT


app.use(express.json());
app.use(express.urlencoded({extended : true}))


app.use("/auth" , authrouter)


app.listen(port , (() => {console.log(`App is listening on ${port}`)}))