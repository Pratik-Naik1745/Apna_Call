import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import "../App.css";
import IconButton from '@mui/material/IconButton';
import RestoreIcon from '@mui/icons-material/Restore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../contexts/AuthContext';





 function Home() {

let navigate=useNavigate();
const [meetingcode,setMeetingCode]=useState("");

const {addToUserHistory}=useContext(AuthContext);

let handleJoinVideoCall=async()=>{
  await addToUserHistory(meetingcode)
  navigate(`/${meetingcode}`);
}

  return (
    <>
    <div className="navBar">
      <div style={{alignItems:"center",display:"flex"}}>
        <h2>Apna Video Call</h2>

      </div>
      <div style={{display:'flex',alignItems:"center"}}>
        <IconButton onClick={()=>{
          navigate("/history")
        }}>

         <RestoreIcon />
         <p>History</p>
         </IconButton>

         <Button onClick={()=>{
          localStorage.removeItem("token")
          navigate("/auth")
         }}>
          Logout
         </Button>
        
      </div>
    </div>
    <div className="meetContainer">
      <div className="leftPanel">
        <div>
          <h2>Providing Quality Video Call Just like Quality Education</h2>
          <div style={{display:"flex",gap:"10px"}}>
          <TextField onChange={e=>setMeetingCode(e.target.value)} id='outlined-basic' label="Meeting Code" variant='outlined'></TextField>
          <Button onClick={handleJoinVideoCall} variant='contained'>Join </Button>
          </div>
        </div>
      </div>
      <div className="rightPanel">
        <img src="./image.png" alt="" />
      </div>
    </div>
    </>
  )
}

export default withAuth(Home);
