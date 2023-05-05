import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Authroute from "../common/authroute";
import { Button } from 'antd';
export default function ResetPassword() {
    const {http}=Authroute();
    const [email,setEmail]=useState('');

   
    const reset = () => {
        http.post('/auth/reset-password',{ email: email}).then((response)=>{
            return response
        }).then((res)=>{
            console.log(res);
            alert('Reset Link is send to your email address')
        })
      }
  return (
    <div className='my-5 container card'>

    <div className="my-5 container card text-center" style={{width: "300px"}}>
    <div className="my-2 card-header h5 text-white bg-primary">Password Reset</div>
    <div className="card-body px-5">
        <p className="card-text py-2">
            Enter your email address and we'll send you an email with instructions to reset your password.
        </p>
        <div className="form-outline">
            <input type="email" id="typeEmail" className="form-control my-3" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label className="form-label" for="typeEmail" >Email input</label>
        </div>
        <Button  className="btn btn-primary w-100" onClick={reset}>Reset password</Button>
        <div className="d-flex justify-content-between mt-4">
            <Link className="" to={"/signin"}>Login</Link>
            <Link className="" to={"/signup"}>Register</Link>
        </div>
    </div>
</div>
    </div>
  )
}
