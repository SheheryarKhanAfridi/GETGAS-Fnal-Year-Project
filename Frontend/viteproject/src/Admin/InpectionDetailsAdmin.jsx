import React,{useState,useEffect} from 'react'
import Admin from "./Admin";
import { FaWhatsapp } from "react-icons/fa";
import '../Admin.css'
import { Link ,useNavigate} from 'react-router-dom';

export default function InpectionAdmin() {
  const navigate=useNavigate();
  const [User, setUser] = useState()
  const [ShowData, setShowData] = useState(false)
  const getdata=async()=>{
    const query = new URLSearchParams(location.search);
    const currentIndex = query.get("id");
    console.log(currentIndex)
    try {
      const res=await fetch('http://localhost:3001/InspectiondetailsofUser',{
      method:'POST',
      headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({currentIndex}),
        credentials: "include",
  })
  if(res.status===400){
    return console.log('empty data')
  }
  else if(res.status===401){
   return console.log('User data not found ')
  }
  else if(res.status===200){
     const data=await res.json();
     console.log(data)
     setUser(data)
     setShowData(true)
     return
  }
  
  } catch (error) {
      console.log('erroe in try catch')
  }
  }

  const chanegStatustoAccept=async()=>{
    const query = new URLSearchParams(location.search);
    const currentIndex = query.get("id");
    console.log(currentIndex)
    try {
      const res=await fetch('http://localhost:3001/acceptInspectionReq',{
      method:'POST',
      headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({currentIndex}),
        credentials: "include",
  })
  if(res.status===400){
    return console.log('empty data')
  }
  else if(res.status===401){
   return console.log('User data not found ')
  }
  else if(res.status===200){
    getdata()
     return
  }
  
  } catch (error) {
      console.log('erroe in try catch')
  }
  }
  const changestatustoCancel=async()=>{
    const query = new URLSearchParams(location.search);
    const currentIndex = query.get("id");
    console.log(currentIndex)
    try {
      const res=await fetch('http://localhost:3001/DeleteStaatusinspection',{
      method:'POST',
      headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({currentIndex}),
        credentials: "include",
  })
  if(res.status===400){
    return console.log('empty data')
  }
  else if(res.status===401){
   return console.log('User data not found ')
  }
  else if(res.status===200){
    getdata()
     return
  }
  
  } catch (error) {
      console.log('erroe in try catch')
  }
  }

useEffect(() => {
  const checkadminIslogin=async()=>{
    const res=await fetch("http://localhost:3001/CheckAdminLoginorNot", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      })
      if(res.status==200){
        console.log('Admin token found')
  getdata()

      }
      else if(res.status==400){
        navigate('/')
      }
  }
  checkadminIslogin()
}, [])

  return (

    <div>
       <section>
        <Admin />
    </section>

   {ShowData? <section>
      <div className="container">
        <div className='order-id-inspection'>
            <h1>Order ID: <span>{User.Order_Id}</span></h1>
           
            <span> Status: {User.status === 0 ?  <span className='alert-danger p-2'>
            Pending
            </span> : ''}
                  {User.status === 1 ?  <span className='alert-success p-2'>
            Request has been Approved
            </span> : ''}
                  {User.status === 2 ? <span className='alert-secondary p-2'>
                  request has been cancel
            </span> : ''}
            {User.status === 3 ? <span className='alert-secondary p-2'>
                  request has been cancel by admin
            </span> : ''}
                 </span>
                 
        </div>
      <div className="row g-3 form-parent-inspection">
            <div className="col-md-4 form-box">
              <label>Name</label>
              <input type="text" className="form-control" value={User.name} aria-label="First name" />
            </div>
            <div className="col-md-4 form-box">
              <label>Address</label>
              <input type="text" className="form-control" value={User.address} aria-label="First name" />
            </div>
            <div className="col-md-4 form-box">
              <label>Phone</label>
              <input type="text" className="form-control" value={User.phone} aria-label="First name" />
            </div>
            <div className="col-md-4 form-box">
              <label>Booking Date</label>
              <input type="text" className="form-control" value={User.Order_date} aria-label="First name" />
            </div>
            <div className="col-md-4 form-box">
              <label>Details</label>
              <input type="text" className="form-control" value={User.details} aria-label="First name" />
            </div>
            <div className="col-md-4 form-box">
              <label>Priority</label>
              <input type="text" className="form-control" value={User.priority} aria-label="First name" />
              <span>If any Request have priority <b>1</b> it should be process immediately</span>
            </div>
            
            {User.priority==0 ?<div className='d-flex'>
            <div className="col-md-4 form-box m-1">
              <label>Schedule Date</label>
              <input type="text" className="form-control" value={User.Date} aria-label="First name" />
            </div>
            <div className="col-md-4 form-box m-1">
              <label>Schedule Time</label>
              <input type="text" className="form-control" value={User.time} aria-label="First name" />
            </div>
            </div>:''}
      </div>

      </div>
    </section>:<div className=" loaderwidth">
  <div className="spinner-border " role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>}
        
        {ShowData?
        <div>
          <section>
          <div className="container">
          <div className="btn-group admin-btns-ins" role="group" aria-label="Basic outlined example">
          {User.status === 0  ? 
         <div>
           <button type="button" className="btn btn-outline-primary mx-2" onClick={chanegStatustoAccept}>Accept Request</button>
          <button type="button" className="btn btn-outline-primary" onClick={changestatustoCancel}>Cancel Request</button>
          
         </div>
         
          : ''}
            {User.status === 1 ? 
            <Link className='whats-app-btn' to={`https://wa.me/92${User.phone}`} target="_blank" >
              <button type="button" className="btn btn-outline-primary">  
              <FaWhatsapp className='whatsapp m-1' />
              Contact with client 
            </button>
            </Link>
             : ''}
          </div>

          </div>
        </section>
        </div>
        :''}
    </div>
  )
}
