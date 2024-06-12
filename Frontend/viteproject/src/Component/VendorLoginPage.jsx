import React, { useState } from "react";
import "../VendorLogin.css";
import VLogo from "../Pictures/logofire.png";
import { Link, useNavigate } from "react-router-dom";
import VendorHome from "./VendorHome";
import NAV from "../Component/NAV";

export default function VendorLoginPage({handleVendor}) {
  const navigate= useNavigate();
  const [InputCheck,setInputCheck]=useState(false);
  const [passCheck,setpassCheck]=useState(false)
  const [serverCheck,setserverCheck]=useState(false)
    const [Login,setLogin]=useState({

    })
    const handleLoginInputs=(e)=>{
        e.preventDefault();
        const {name,value}=e.target;

        setLogin({
            ...Login,
            [name]:value
        })
    }

   const VendorLoginCheck=async(e)=>{
    e.preventDefault();
    const {email,password}=Login;
    if(!email || !password){
      return setpassCheck(false), setInputCheck(true);
    }
    setInputCheck(false)
    const res= await fetch('http://localhost:3001/CHECKLOGIN',{
        method:'POST',
        headers:{
            'Content-type': 'application/json',
        },
        credentials: "include",
        body:JSON.stringify(Login)
    })
    const data = await res.json();
    if(res.status===401){
      setpassCheck(true);
      console.log('User Not Found')
    }
    else if(res.status===402){
      setpassCheck(true)
      console.log('Invalid Password')
    }
    else if(res.status===403){
      setpassCheck(false)
      setserverCheck(true);
      console.log('Server Error while generating token')
    }
    else{
      handleVendor();
      setpassCheck(false)
      setserverCheck(false);
      console.log('user loged in')
      navigate('/vendorhome')
    }


   }
  return (
    <div className="vendorback">
       <div className='stickynav-edit'>
      <NAV />
      </div>
         <section >
            <div className="container">
            <div className="Vendor-parent">
              <div className="VendorPic"></div>
              <form>
                <div className="VendorFormbody">
                  <div className="Vendor-form-logo">
                    <div className="getVlogo">
                      <img src={VLogo} alt="" width={100} />
                      <h3>
                        <b>G</b>ET <b>G</b>AS
                      </h3>
                      <p>
                        Welcome Back, valued vendor! As you log in, remember
                        that your contributions are the cornerstone of our
                        success.Thank you for being an essential part of our
                        journey. Let's log in and continue building success
                        together!
                      </p>
                    </div>
                    {InputCheck?<div className="alert alert-danger" role="alert">
                          Please fill all the <b>Fields</b>
                        </div>:""}
                    {passCheck?<div className="alert alert-danger" role="alert">
                          Invalid <b>Email</b> or <b>Password</b>
                        </div>:""}
                        {serverCheck?<div className="alert alert-danger" role="alert">
                          Server Error Please try again after 15 mins for Further Details You can Contact Us 
                        </div>:""}
                  </div>
                  <div className="Input-parent">
                    <div className="Vendor-inputbox">
                      
                      <input
                        type="text"
                        required="required"
                        id="email"
                        name="email"
                        onChange={handleLoginInputs}
                      />
                      <span>Email</span>

                    </div>
                    <div className="Vendor-inputbox">
                    
                      <input
                        type="password"
                        required="required"
                        id="password"
                        name="password"
                        onChange={handleLoginInputs}
                      />
                      <span>Password</span>
                      
                    </div>
                  </div>
                  <div>
                    <div className="Contact-btn-box1 mt-2">
                    <Link to='/vendorLogin'>
                      <button className="handle-vendor-login-register" > 
                        Create an account
                      </button>
                      </Link>
                      {/* <Link className="Contact-us">Contact Us</Link> */}
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="Login"
                    className="Login-vendor-btn"
                    onClick={VendorLoginCheck}
                  />
                </div>
              </form>
            </div>
            </div>
         </section>
    </div>
  )
}
