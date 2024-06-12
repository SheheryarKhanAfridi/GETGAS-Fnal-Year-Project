import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Pictures/logofire.png';
import '../App.css';
import '../Component/Order'
import '../Vendornav.css'
import VLogo from "../Pictures/logofire.png";
import Ohistory from './Ohistory';

function Navbar({isLoggedIn}) {
  const navigate=useNavigate();
  const [userName, setuserName] = useState(null);
  const [showOrderH, setshowOrderH] = useState(false)
  const checkVendorOrUser =async () =>{
    const res= await fetch('http://localhost:3001/checkuser',{
      method:'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials:'include'
    })
     if(res.status===201){
      const data = await res.json();
      const { name } = data; 
      setuserName(name);
    }
    else if(res.status===202){
      console.log('None')
    }
    else if(res.status===400){
      console.log('Unauthorized User')
    }
    else if(res.status===401){
      console.log('Data not Found')
    }
  } 
  useEffect(() => {
    checkVendorOrUser();
  }, [])
  
  const pageRefresh=()=>{
    isLoggedIn()
    navigate('/signout')
    setuserName(null)
    
  }
 

  return (
    <div>
        <nav className="navbar navbar-expand-lg ">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="" width={60} />
            <div className='getlogo'>
          <h3><b>G</b>ET <b>G</b>AS</h3>
        </div>
          </Link>
          
          <button className="navbar-toggler custom-toggler navbarmenubut" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" >
            <i className="fa-solid fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse items---nav" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0 menuhover">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/About" className="nav-link">
                  About us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Contact" className="nav-link">
                  Contact us
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/AdminHome" className="nav-link">
                  admin
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/Account" className="nav-link">
                  Account
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Our Service
                </a>
                <ul
                  className="dropdown-menu fw-normal text-decoration-none"
                  aria-labelledby="navbarDropdown"
                >
                  
                  {
                  userName===null?
                  'Please Login first'
                 :
                  <li>
                     <Link to="/Order" className="dropdown-item">
                     Order Gas
                   </Link>
                     <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to='/orderhistory'>
                      Order History
                    </Link>
                    <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to='/inspection'>
                      Inspection Service
                    </Link>
                    
                  </li>
                  }
                  
                </ul>
              </li>
            </ul>
            
            
            {userName === null ? (
        <>
          
            <Link to="/Register" className="nav-link">
              Registration
            </Link>
          
            <Link to="/Login" className="nav-link">
              Login
            </Link>
         
        </>
      ) : (
        <>
        <div className='username'>
          <h5 className='user'>Hello,{userName}  </h5> 
          </div>
        
          <Link to="/signout" className="nav-link" onClick={pageRefresh}>
            Logout
          </Link>
        
        </>
      )}
      
      
          </div>
        </div>
        
      </nav>
      
      
    </div>
  );
}

export default Navbar;
