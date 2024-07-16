import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js" 
import usersRoute from "./routes/users.js" 
import hotelsRoute from "./routes/hotels.js" 
import roomsRoute from "./routes/rooms.js" 
import morgan from "morgan";
import bodyParser from "body-parser";
import { cookie } from "express-validator";
import cookieParser from "cookie-parser";
// on peut l'appeler comme on veut car on a ecrit express default

const app = express()

dotenv.config()

const connect = async()=>{

    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log(error)
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected!")
})

mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected!")
})

connect()
// middlewares
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);
app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
  success:false,
  status:errorStatus,
  message:errorMessage,
  stack:err.stack,

  })
})

const port = 8080;
app.listen(port,()=>{
    console.log("Connected to backend at port "+ port)
})