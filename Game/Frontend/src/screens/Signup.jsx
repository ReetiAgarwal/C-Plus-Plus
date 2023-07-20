import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function Signup() {
    const [credentials,setcredentials]=useState({});
    let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
        },
        body:JSON.stringify(credentials)
       
    });
    const json=await response.json();
    console.log(json);
    console.log(credentials);
    if(json.success){
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
    
    }
    const onChange=(event)=>{
      setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <div>
      <div>
        {" "}
        <Navbar />
      </div>

      <div className="container">
        <form onSubmit={handleSubmit}> 
        <div className="htmlForm-group">
            <label htmlFor="exampleInputEmail1">UserName</label>
            <input
              type="text"
              className="htmlForm-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="name"
              onChange={onChange}
            />
           
          </div>
          <div className="htmlForm-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="htmlForm-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              onChange={onChange}
            />
            
          </div>
          <div className="htmlForm-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="htmlForm-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={onChange}
            />
          </div>
           <div className="htmlForm-group">
            <label htmlFor="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              className="htmlForm-control"
             
              placeholder="Password"
              name="password"
            />
          </div>
       
          
          <button type="submit" className="m-3 btn btn-success">  Submit
          
          </button>
          <Link to="/Login" className="m-3 btn btn-danger">Already a user!</Link>
          
        </form>
      </div>
    </div>
  );
}
