import React, { useState, useEffect } from "react";
import Rlogo from "../Pictures/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import "../login.css";
import NAV from "./NAV";
import VLogo from "../Pictures/logofire.png";
import '../registeration.css'


export default function Login({ toggleLogin }) {
  const handletoggle = () => {
    
    toggleLogin();
  };
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [checkvalidation, setcheckvalidation] = useState(false);
  const [errorcheck, seterroecheck] = useState(false);
 
  const checkUserLogin = async () => {
    const res = await fetch("http://localhost:3001/Userlogin", {
      method: "POST",
      credentials: "include",
    });

    try {
      const data = await res.json();

      if (res.status === 400) {
        console.log(data.error);
        navigate("/");
      } else {
        console.log(data.error); // User not found
      }
    } catch (error) {
      console.error("Error occurred while checking user login status:", error);
    }
  };
  const checkadmin=async()=>{
    if(password =='admin1234'){
      const res=await fetch("http://localhost:3001/adminLogin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
  
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if(res.status==200){
        console.log('admin login')
        navigate('/AdminHome')
      }
    }
    else{
      seterroecheck(true)
    }
   
  }
  const Login = async (e) => {
    e.preventDefault();

    if(email=='admin@gmail.com'){
      checkadmin()
    }
    

    if (!email || !password) {
      setcheckvalidation(true);
      return;
    } else {
      setcheckvalidation(false);
    }

    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (res.status === 400 || !data) {
      seterroecheck(true);
    } else {
      toggleLogin();
      navigate("/Order");
    }
  };
  useEffect(() => {
    checkUserLogin();
  }, []);

  return (
    <>
      <div className="stickynav-edit">
        <NAV />
      </div>
      
      <section >
            <div className="container back">
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
                     
                    </div>
                      
                  </div>
                  <div className="Input-parent">
                    {errorcheck?<div className="alert-danger text-center p-1">incorrect password or email</div>:''}
                    <div className="Vendor-inputbox">
                      
                      <input
                        type="text"
                        required="required"
                        id="email"
                        name="email"
                        onChange={(e) => {
                          setemail(e.target.value);
                          seterroecheck(false)
                        }}
                      />
                      <span>Email</span>
                    </div>
                    <div className="Vendor-inputbox">
                    
                      <input
                        type="password"
                        required="required"
                        id="password"
                        name="password"
                        onChange={(e) => {
                          setpassword(e.target.value);
                          seterroecheck(false)
                        }}
                      />
                      <span>Password</span>
                      
                    </div>
                  </div>
                  <div>
                    <div className="Contact-btn-box">
                     
                     
                    </div>
                  </div>
                    <Link to='/vendorLogin'>
                      <button className="logn-as-vendor-btn" > 
                        Registeration
                      </button>
                      </Link>
                  <Link to='/vendorLoginPAGE'>
                      <button
                        className=" handle-vendor-login-register-login "
                      > Login as Vendor
                       </button>
                      </Link>
                  
                  <input
                    type="submit"
                    value="Login"
                    className="Login-vendor-btn"
                    onClick={Login}
                  />
                </div>
              </form>
            </div>
            </div>
         </section>
    </>
  );
}
