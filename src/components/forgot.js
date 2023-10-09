import React, { Component, useState } from "react";
import "./style.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

function Forgot()
{
  const [email, setEmail] = useState("");

  const getEmail = (e) =>
  {
    setEmail(e.target.value);
  }

  const resetPassword = (e) =>
  {
    e.preventDefault();
    
    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Success");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);

    });
  }
    return(
        <>
            <form>
    <div class="main1">
      
      <div class="back1">

        <div class="forgot">
          
          <div class="form-group">
            <label for="exampleInputEmail1">Email Address:</label>
            <input type="email" class="col-6 form-control" onChange={getEmail} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email Address"/>
          </div>
          <button type="submit" onClick={resetPassword} class="btn btn-primary" id="submit">Submit</button> 

        </div>

      </div>
    </div>
</form>

        </>
    );
}

export default Forgot;