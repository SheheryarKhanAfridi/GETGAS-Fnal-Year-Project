import React, { useState } from 'react';
import '../registeration.css'
import { Link, useNavigate } from 'react-router-dom';
import NAV from "../Component/NAV";
import VLogo from "../Pictures/logofire.png";
import Alert from '@mui/material/Alert';


function Register() {

  const [fieldsCheck, setfieldsCheck] = useState(true);
  const [Emptyresponsecheck,setEmptyresponsecheck]=useState(false)
  const [Emptyresponsecheck2,setEmptyresponsecheck2]=useState(false)
  const [Emptyresponsecheck3,setEmptyresponsecheck3]=useState(false)
  const [checkEmail, setcheckEmail] = useState(false)
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    cpassword: '',
  });

  const navigate = useNavigate();

  const handleInputs = (e) => {
    setEmptyresponsecheck(false)
    setEmptyresponsecheck2(false)
    setEmptyresponsecheck3(false)
    setcheckEmail(false)
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const sendData = async(e)=>{
    e.preventDefault();

    function checkGmail(email) {
      return email.includes('@gmail.com');
    }
    const Gmail=checkGmail(user.email);
    if(Gmail==false){
      setcheckEmail(true)
      return
    }
    
    try {
      const res = await fetch('http://localhost:3001/register', { 
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
          body: JSON.stringify(user),
        });
    
        const data= res.json();
        if(res.status===400){
          console.log('empty data')
          setEmptyresponsecheck(true)
          return
        }
        else if(res.status===401){
          setEmptyresponsecheck3(true)
          return
        }
        else if(res.status===402){
          setEmptyresponsecheck2(true)
          return
        }
        else if(res.status===200){
          console.log('User Registered')
          navigate('/Login');
        }
    } catch (error) {
      console.log('Error while registeration')
    }
  }

  

  return (
    <div>
      <div className='stickynav-edit'>
      <NAV/>
      </div>
    
    <section>
        <div className="container">
            <div className="Vendor-parent ">
              <div className="VendorPic"></div>
              <form method="POST">
                <div className="VendorFormbody ">
                  <div className="Vendor-form-logo ">
                    <div className="getVlogo ">
                      <img src={VLogo} alt="" width={100} />
                      <h3>
                        <b>G</b>ET <b>G</b>AS
                      </h3>
                    </div>
                    <p>Welcome to GETGAS</p>
                    
                  </div>
                 {Emptyresponsecheck? <Alert severity="warning">Fill all the Fields</Alert>:''}
                  <div className="Input-parent ">
                   
                    <div className="Vendor-inputbox">
                      <input
                        type="text"
                        required="required"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleInputs}
                      />
                      <span>Name</span>
                    </div>
                    {Emptyresponsecheck2?<Alert severity="warning" className='m-3'>Email already Exist</Alert>:''}
                    {checkEmail?<Alert severity="warning" className='m-3'>Invalid Email</Alert>:''}
                    <div className="Vendor-inputbox">
                      <input
                        type="email"
                        required="required"
                        id="email"
                        name="email"
                       
                        value={user.email}
               onChange={handleInputs}
                      />
                      <span>Email</span>
                      <p></p>
                      
                    </div>
            
                    <div className="Vendor-inputbox">
                      <input
                        type="text"
                        required="required"
                        id="address"
                        name="address"
                        value={user.address}
               onChange={handleInputs}
                      />
                      <span>Address</span>
                    </div>
                    <div className="Vendor-inputbox">
                      <input
                        type="number"
                        required="required"
                        id="phone"
                        name="phone"
                        value={user.phone}
               onChange={handleInputs}
                      />
                      <span>Phone</span>
                    </div>
                    {Emptyresponsecheck3?<Alert severity="warning" className='m-3'>Password is not matched</Alert>:''}
                    <div className="Vendor-inputbox">
                      <input
                        type="password"
                        required="required"
                        id="password"
                        name="password"
                        value={user.password}
               onChange={handleInputs}
                      />
                      <span>Password</span>
                    </div>
                    <div className="Vendor-inputbox">
                      <input
                        type="password"
                        required="required"
                        id="cpassword"
                        name="cpassword"
                        value={user.cpassword}
               onChange={handleInputs}
                      />
                      <span>Confirm Pass</span>
                      
                    </div>
                  </div>
                  <div>
                    <div className="Contact-btn-box">
                    <Link to='/Login'>
                      <button className="handle-vendor-login-register">
                        Login
                      </button>
                      </Link>
                      {/* <Link className="Contact-us" to='/vendorregister'>Regsiter</Link> */}
                   <Link to='/vendorlogin'>
                    <button  className='handle-vendor-login-register2'>
                    Register as Vendor
                    </button>
                   </Link>
                      
                    </div>
                    
                  </div>
                  <input
                    type="submit"
                    value="Register"
                    className="Login-vendor-btn"
               onClick={sendData}
                    
                  />
                </div>
              </form>
            </div>
          
        </div>
      </section>
     
    </div>

  );
}

export default Register;


