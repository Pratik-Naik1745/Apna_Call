import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


export default function LandingPage() {

  const router=useNavigate();



  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Apna Video call</h2>
        </div>
        <div className="navList">
           <Button onClick={()=>{
            router("/aabfd")
          }} variant="contained">Join As Guest</Button>
          
          <Button onClick={()=>{
            router("/auth")
          }} variant="contained">Register</Button>

          <Button onClick={()=>{
            router("/auth")
          }} variant="contained">Login</Button>

          
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="loved">
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your loved
            Ones
          </h1>
          <p>Cover a distance by apna video call</p>
          <div className="get" role="button">
            <Link className="but" to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div className="mobile">
          <img src="./mobile.png" alt="" />
        </div>
      </div>
    </div>
  );
}
