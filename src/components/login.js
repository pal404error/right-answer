import React, { Component, useState } from "react";
import "../components/style.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LogIn()
{
    return(
        <>
            <form>
    <div class="main">
      
      <div class="back">

        <div class="login">
          
          <div class="form-group">
            <label for="exampleInputEmail1">Username:</label>
            <input type="email" class="col-6 form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"/>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password:</label>
            <input type="password" class="col-6 form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>
          <div class="form-group form-check">
            <label class="form-check-label" for="exampleCheck1">forgot password? <a href="">reset</a></label>
          </div>
          <button type="submit" class="btn btn-primary">Login</button> 

        </div> 

      </div>
    </div>
    
</form>
  
        </>
    )
}

export default LogIn;