import React, { Component, useState } from "react";
import "../components/style.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Forgot()
{
    return(
        <>
            <form>
    <div class="main1">
      
      <div class="back1">

        <div class="forgot">
          
          <div class="form-group">
            <label for="exampleInputEmail1">Email Address:</label>
            <input type="email" class="col-6 form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email Address"/>
          </div>
          <button type="submit" class="btn btn-primary" id="submit">Submit</button> 

        </div>

      </div>
    </div>
    
</form>
  
        </>
    )
}

export default Forgot;