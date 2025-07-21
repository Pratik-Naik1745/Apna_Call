import express from "express";
import mongoose  from "mongoose";
import { Server } from "socket.io";
import {createServer} from "node:http"
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";

import UserRoute from "./routes/userrouter.js"

const app=express();
const server=createServer(app);
const io=connectToSocket(server);

app.set("port",(process.env.PORT)|| 8000);
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use("/api/v1/users",UserRoute);


app.get("/home",(req,res)=>{
     res.send("Hello World")
})

const start=async()=>{
    const connectionDB= await mongoose.connect("mongodb+srv://pratiknaik20012004:83HxcYmfHRjc3Gj0@cluster0.ohgqcfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    
    console.log(`Mongo Connected DB Host ${connectionDB.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("server is running");
    })
}

start();