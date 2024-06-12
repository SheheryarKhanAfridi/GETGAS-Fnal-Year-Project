import React, { useState } from "react";
import "../VendorLogin.css";
import VLogo from "../Pictures/logofire.png";
import NAV from "../Component/NAV";
import { Link, useNavigate } from "react-router-dom";

export default function VendorLogin() {
  const navigate=useNavigate();
  const [emailcheck, setemailcheck] = useState(true);
  const [passCheck, setpassCheck] = useState(true);
  const [fieldsCheck, setfieldsCheck] = useState(true);
  const [Vregisteration, setVregisteration] = useState({});

  const VendorRegisterReq = (e) => {
    e.preventDefault();
    setpassCheck(true)
    setfieldsCheck(true)
    setemailcheck(true)
    const { name, value } = e.target;
    setVregisteration({
      ...Vregisteration,
      [name]: value,
    });
  };
  const ShowVendor =  async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = Vregisteration;
    if (!name || !email || !password || !cpassword) {
      return setfieldsCheck(false);
    } else {
      setfieldsCheck(true);
    }
    const IsVendorEmail =
      (typeof email === "string" && email.includes("vendor@gmail.com")) ||
      email.includes("Vendor@gmail.com");
    if (IsVendorEmail) {
      setemailcheck(true);
    } else {
      return setemailcheck(false);
    }
    if (password === cpassword) {
      setpassCheck(true);
    } else {
      return setpassCheck(false);
    }
    console.log(Vregisteration);

    const res= await fetch('http://localhost:3001/Vendorregister',{
      method:'POST',
      headers: {
        'Content-type': 'application/json', 
      },
      body:JSON.stringify(Vregisteration)
    })
    const data=res.json();
    if(res.status===200){
      navigate('/vendorhome')
    }
    else if(res.status===400){
      alert('empty response')
    }
    else if(res.status===401){
     alert('email already exist')
    }

  };

  
  return (
    <div className="vendorback">
      
      <div className='stickynav-edit'>
      <NAV/>
      </div>
      <section>
        <div className="container">
            <div className="Vendor-parent">
              <div className="VendorPic"></div>
              <form method="POST">
                <div className="VendorFormbody">
                  <div className="Vendor-form-logo">
                    <div className="getVlogo">
                      <img src={VLogo} alt="" width={100} />
                      <h3>
                        <b>G</b>ET <b>G</b>AS
                      </h3>
                    </div>
                    <p>Wellcome Vendor</p>
                  </div>
                  <p>
                    <b>NOTE</b>: Email must contain 'vendor' before the @ symbol
                  </p>
                  <div className="Input-parent">
                    {fieldsCheck ? (
                      ""
                    ) : (
                      <div className="alert alert-warning" role="alert">
                        Please fill all the Fields
                      </div>
                    )}
                    <div className="Vendor-inputbox">
                      <input
                        type="text"
                        required="required"
                        id="name"
                        name="name"
                        onChange={VendorRegisterReq}
                      />
                      <span>Name</span>
                    </div>
                    <div className="Vendor-inputbox">
                      <input
                        type="email"
                        required="required"
                        id="email"
                        name="email"
                        onChange={VendorRegisterReq}
                      />
                      <span>Email</span>
                      <p></p>
                      {emailcheck ? (
                        ""
                      ) : (
                        <div className="alert alert-danger" role="alert">
                          Email must contain 'vendor' before the @ symbol
                        </div>
                      )}
                      
                    </div>
                    <div className="Vendor-inputbox">
                      <input
                        type="password"
                        required="required"
                        id="password"
                        name="password"
                        onChange={VendorRegisterReq}
                      />
                      <span>Password</span>
                    </div>
                    <div className="Vendor-inputbox">
                      <input
                        type="password"
                        required="required"
                        id="cpassword"
                        name="cpassword"
                        onChange={VendorRegisterReq}
                      />
                      <span>Confirm Pass</span>
                      {passCheck ? (
                        ""
                      ) : (
                        <div className="alert alert-danger" role="alert">
                          <p>Password is not Matched</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="Contact-btn-box1">
                    <Link to='/vendorLoginPAGE'>
                      <button
                        className="handle-vendor-login-register"
                      > Already have an account
                       </button>
                      </Link>
                      {/* <Link className="Contact-us" to='/vendorregister'>Regsiter</Link> */}
                      {/* <Link className="Contact-us">Contact Us</Link> */}
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="Register"
                    className="Login-vendor-btn"
                    onClick={ShowVendor}
                  />
                </div>
              </form>
            </div>
          
        </div>
      </section>
    </div>
  );
}
