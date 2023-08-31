import React, { Component, useState } from "react";
import "../components/style.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { BrowserRouter, Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { auth } from "../firebase";

function LogIn()
{
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const getEmail = (e) =>{
      setEmail(e.target.value);
  };

  const getPass = (e) =>{
    setPass(e.target.value);
};

const Login = (e) => {
  e.preventDefault();

  signInWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Success");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
};

  
    return(
        <>
            <form>
    <div class="main">
      
      <div class="back">

        <div class="login">
          
          <div class="form-group">
            <label for="exampleInputEmail1">Username:</label>
            <input type="email" class="col-6 form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" onChange={getEmail}/>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password:</label>
            <input type="password" class="col-6 form-control" id="exampleInputPassword1" placeholder="Password" onChange={getPass}/>
          </div>
          <div class="form-group form-check">
            <label class="form-check-label" for="exampleCheck1">forgot password? <a href="/reset">reset</a></label>
          </div>
          <button class="btn btn-primary" onClick={Login}>Login</button> 

        </div> 

      </div>
    </div>
    
</form>
        </>
    );
}

export default LogIn;