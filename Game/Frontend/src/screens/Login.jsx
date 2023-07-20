import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link,useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials,setcredentials]=useState({});
  let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/login",{
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
    else{
      alert("Oops wrong credentials");
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
          
          <button type="submit" className="m-3 btn btn-success">
            {" "}
            Submit
          </button>
          <Link to="/Signup" className="m-3 btn btn-danger">
            I'm a new user
          </Link>
        </form>
      </div>
    </div>
  );
}
