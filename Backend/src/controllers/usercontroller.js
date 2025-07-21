import { User } from "../models/usemodel.js";
import httpStatus from "http-status";
import bcrypt,{hash} from "bcrypt";
import {Meeting} from "../models/meetingmodel.js"

import crypto from "crypto";


const login=async(req,res)=>{
    const {username,password}=req.body;
    
    // if username and password likh nahi raha to
    if(!username || !password){
        return res.status(400).json({message:"Please provide password and usename"});
    }
     
    try{
        const user=await User.findOne({username});
        // user is not found
        if(!user){
        return res.status(httpStatus.NOT_FOUND).json({message:"User Not found"});
        } 
        
        let ispasswordcorrect= await bcrypt.compare(password,user.password);
        if(ispasswordcorrect){
            let token=crypto.randomBytes(20).toString("hex");

            user.token=token;
            //return user;
            await user.save();
            return res.status(httpStatus.OK).json({token:token});  
        }
        else{
            return res.status(httpStatus.UNAUTHORIZED).json({message:"Invalid Username"})
        }
    }catch(e){
        return res.status(500).json({message:`something went wrong ${e}`});
    }
}



const register= async(req,res)=>{
    const { name,username,password}=req.body;

    try{
     // if user is already exist then we print
      const existinguser=await User.findOne({username});
      if(existinguser){
        return res.status(httpStatus.FOUND).json({message:"user already exist"});
      }
    
      // store password 
      const hashedPassword=await bcrypt.hash(password,10);

      const newUser=new User({
        name:name,
        username:username,
        password:hashedPassword
      });

      // create a new user
      await newUser.save();
      res.status(httpStatus.CREATED).json({message:"User is cretaed"});
    }catch(e){
        res.json({message:`Something went Wrong ${e}`})
    }
}

const getUserHistory = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ token: token });
        const meetings = await Meeting.find({ user_id: user.username })
        res.json(meetings)
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}
export {login,register,getUserHistory,addToHistory}