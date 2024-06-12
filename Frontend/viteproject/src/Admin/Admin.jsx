import React, { useState,useEffect } from 'react';
import '../Admin.css'
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";



export default function Admin() {
  const navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [adminrotate, setadminrotate] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  const adminLogout=async()=>{
    console.log('hello')
    const res=await fetch("http://localhost:3001/adminlogout", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    })

    if(res.status==200){
      navigate('/login')
    }
  }
  
  useEffect(() => {
    setTimeout(() => {
        if(adminrotate==false){
            setadminrotate(true)
        }
        else{
            setadminrotate(false)
        }
      console.log('sherry');
    }, 2000);

  }, [adminrotate]);
 
  return (

<div className="App">
      <header className="bg-dark text-light py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="menu-toggle" onClick={toggleMenu}><RxHamburgerMenu className='hamburger' /></div>
          <div>
            <h5 className={`mb-0 p-2 ${adminrotate? 'rotateleft' : 'rotateright'}`}> Admin Dashboard </h5>
          </div>
        </div>
      </header>
      <nav className={`navbar-container ${isOpen ? 'open' : ''}`}>
        <div className="container pt-4">
          <div className="menu-toggle2" >
            <div className='hamburger' onClick={toggleMenu}>
            <RxHamburgerMenu />
            </div>
          </div>
          <div>

          </div>
          
          <ul className="navbar-nav2">
      <li className="nav-item"><Link to="/AdminHome" className="nav-link" onClick={closeMenu}>Home</Link></li>
      <li className="nav-item"><Link to="/HnadleUserDetailsAdmin" className="nav-link" onClick={closeMenu}>Users Details</Link></li>
      <li className="nav-item"><Link to="/inspection-request-admin" className="nav-link" onClick={closeMenu}>Inspection Request</Link></li>
      <li className="nav-item"><Link to="/QueryAdmin" className="nav-link" onClick={closeMenu}>User Queries</Link></li>
      <button className='btn btn-dark' onClick={()=>{adminLogout()}}>Log Out</button>
    </ul>
        </div>
        <section>
         
        </section>
      </nav>
      <div className={`blur-bg ${isOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
     
    </div>
  )
}
