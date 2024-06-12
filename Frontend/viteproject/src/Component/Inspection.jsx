import React,{useState,useEffect} from 'react'
import NAV from './NAV';
import { Link } from "react-router-dom";
import '../inspection.css'
import inspect from '../Pictures/inspect.jpg'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaCheck } from "react-icons/fa6";



export default function Inspection() {
    const [User, setUser] = useState({
       name:'',
       phone:'',
       UserId:null
    })
    const [showForm, setshowForm] = useState(false)
    const [details, setdetails] = useState('')
    const [address, setaddress] = useState()
    const [checked, setchecked] = useState(false)
    const [dateTime, setdateTime] = useState({
        Date:"",
        time:''
    })
    const [InspectionForm, setInspectionForm] = useState({})
    const [PlanCheck, setPlanCheck] = useState(false)
    const [checkAddress, setcheckAddress] = useState(false)
    const [checkDescrip, setcheckDescrip] = useState(false)
    const [schedulemistake, setschedulemistake] = useState(false)
    const [Confrimation, setConfrimation] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [appointmentNum, setappointmentNum] = useState()
    const [closeapppointmentdetals, setcloseapppointmentdetals] = useState(false)
  
    const handleClose = () => {
      setOpen(false);
    };

   
    const sendInspectionData=async()=>{
        const res=await fetch('http://localhost:3001/InspectionAppointment',{
            method:'PUT',
            headers: {
                accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body:JSON.stringify(InspectionForm)
        })
        const data = await res.json();
        console.log(data)
        if(res.status==400){
            console.log('error while sending data')
        }
        else if(res.staus==401){
            console.log('error')
        }
        else if( res.status==200){
            setappointmentNum(data)
            console.log(data)
            setcloseapppointmentdetals(true)
            setTimeout(()=>{
                setConfrimation(false)
            }, 10000);
        }
    }

    function showFormData (){
        setInspectionForm({
            Userid:User.UserId,
            name:User.name,
            phone:User.phone,
            address:address,
            Description:details,
            Inspection:{
                Schedule:dateTime,
                Instant:checked
            }
        })

        FinalInspection()
       
       
      }
      const FinalInspection=()=>{
        if(!address){
            setcheckAddress(true)
        }
        if(!details){
            setcheckDescrip(true)
        }
         if (!dateTime.Date && !dateTime.time  && checked === false) {
            console.log('Both are null or false');
            setPlanCheck(true);
            console.log(InspectionForm)
          }
        else if (dateTime.Date && dateTime.time  && checked === true) {
            console.log('Both are filled');
            setschedulemistake(true)
          }
        else{
           return setOpen(true)
        }
    }

    const UserData = async()=>{
        const res=await fetch('http://localhost:3001/userDataForInspection',{
            method: 'GET',
            headers: {
              accept: 'application/json',
              "Content-Type": 'application/json'
            },
            credentials:'include'
          });
          const data=await res.json();
          if(res.status===200){
            setUser({
            name:data.name,
            phone:data.phone,
            UserId:data._id
            })
          }
    }


    useEffect(() => {
        UserData();
    }, [])
    
  return (
    <div>
       <div className='stickynav-edit'>
      <NAV/>
</div>
       
       {closeapppointmentdetals?(<section className='appintment-details-width'>
            <div className="container">
                <div >
                
                    <div className="successBox">
                            <div className='successAlertBox'>
                                        <Alert severity="success" className='animate-right' onClick={()=>{setconfirmationMsg(false)}}>
                                            <div className="text-center">
                                            <p>Your request if successfully submited.</p>
                                            </div>
                                </Alert>
                <div>
                    
                </div>
                        </div>
                           
                       
                       <h4>Appointment Details</h4>
                       <div className="row">
                       <div className="col-md-6">
                        <ul className="list-group list-group-flush">
                        <li className="list-group-item"></li>
                      <li className="list-group-item">
                        Order Id:  {appointmentNum.Order_Id}
                      </li>
                      <li className="list-group-item"></li>
                      <li className="list-group-item">
                        Name:{appointmentNum.name}
                      </li>
                      <li className="list-group-item"></li>
                      <li className="list-group-item">
                        Address: {appointmentNum.address}
                      </li><li className="list-group-item"></li>
                      <li className="list-group-item">
                        Phone: {appointmentNum.phone}
                      </li>
                      <li className="list-group-item"></li>
                      <li className="list-group-item">
                         Plan: {appointmentNum.priority==0?'Schedule Request':'Instant Request'}
                      </li>
                      <li className="list-group-item"></li>
                    </ul>
                       </div>
                       <div className="col-md-6">
                       <div className="child2-inspect-conirm">
                       <div>
                            <Alert severity="info" className='inforAlert'>Our team will contact you in a while</Alert>
                            <Alert severity="info" className='inforAlert'>Take a screen shot for Our team Confirmation</Alert>
                            </div>
                      
                            <div className="borderrr"></div>
                            <Link to='/orderhistory'>
                                <button className='back-btn-inspact' onClick={()=>{setcloseapppointmentdetals(false)}}>
                                    View Order
                                </button>
                            </Link>
                       </div>
                       </div>
                       </div>
                       
                    </div>
                </div>
            </div>
        </section>):(<div>
       <section>
            {showForm? 
            
            <section>
                <div className="ins-hero container mt-3">
                    <div className="row hero-section">
                    <div className={`col-md-6 animate-form ${showForm ? 'animate-right' : 'animate-left'}`}>
                        <div className='i-child2'>
                        <div className='ins-img-z'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVnGvxqWUj4N9Hq6aMN7cOH5ijEBjGu9QC2g&usqp=CAU' alt="" className='ins-img-c' />
                        </div>
                <h1 className='text-center'>Inspection Service Form</h1>
                            <p className='text-center'>Keep your <b> home safe</b></p>
                        </div>
                        </div>
                        <div className={`col-md-6 animate-form ${showForm ? 'animate-left' : 'animate-right'}`}>
                            <div className='appointment-form-size'>
                                    <form action="">
                                    
                                        <div>
                                            <label htmlFor="">Name:</label>
                                            <input type="text" className='name' value={User.name} />
                                        </div>
                                        <div>
                                            <label htmlFor="">Contact Number:</label>
                                            <input type="text" className='name' value={User.phone} />
                                        </div>
                                        <div>
                                            {checkAddress?
                                            <div className="fade-in">
                                            <Alert severity="error">Please enter your <b>Address</b>.</Alert>
                                            </div>
                                            :''}
                                            <label htmlFor="">Address:</label>
                                            <input type="text" className='name' onChange={(e)=>{setaddress(e.target.value); if(checkAddress==true){setcheckAddress(false)}}} />
                                        </div>

                                        <div className="schedule">
                                            <h4>Choose your Inspection plan</h4>
                                            {PlanCheck?
                                            <div className="fade-in">
                                            <Alert severity="error">Please Select any one <b>Inspection Plan</b></Alert>
                                            </div>
                                             :''}
                                             {schedulemistake?
                                              <Alert severity="warning">Your can not select both plan at a time
                                               <br /> 
                                               <b>Please select anyone Inspection plan</b>.</Alert>:''}
                                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                                <div className="accordion-item">
                                                <h2 className="accordion-header" id="flush-headingOne">
                                           
                                                    <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#flush-collapseOne"
                                                    aria-expanded="false"
                                                    aria-controls="flush-collapseOne"
                                                    >
                                                    Schedule your Inspection
                                                    </button>
                                                </h2>
                                                <div
                                                    id="flush-collapseOne"
                                                    className="accordion-collapse collapse"
                                                    aria-labelledby="flush-headingOne"
                                                    data-bs-parent="#accordionFlushExample"
                                                >
                                                    <div className="accordion-body">
                                                    <div className="card card-body">
                                                        <p>
                                                        Choose a date and time that works best for you, and our team will be there for the inspection.
                                                        </p>
                                                        <input type="date" className="date" onChange={(e)=>{setdateTime({
                                                            ...dateTime,
                                                            Date:e.target.value
                                                        }); setPlanCheck(false);setschedulemistake(false)}}/>
                                                        <input type="time" className="date" onChange={(e)=>{setdateTime({
                                                            ...dateTime,
                                                            time:e.target.value
                                                        }); setPlanCheck(false);setschedulemistake(false)}} />
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="accordion-item">
                                                <h2 className="accordion-header" id="flush-headingTwo">
                                                    <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#flush-collapseTwo"
                                                    aria-expanded="false"
                                                    aria-controls="flush-collapseTwo"
                                                    >
                                                    Get Instant Inspection
                                                    </button>
                                                </h2>
                                                <div
                                                    id="flush-collapseTwo"
                                                    className="accordion-collapse collapse"
                                                    aria-labelledby="flush-headingTwo"
                                                    data-bs-parent="#accordionFlushExample"
                                                >
                                                    <div className="accordion-body">
                                                    <div className="card card-body">
                                                        <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="flexSwitchCheckChecked"
                                                            onClick={()=>{if(checked===false){setchecked(true)} else{setchecked(false)}; setPlanCheck(false);setschedulemistake(false)}} checked={checked}
                                                        />
                                                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked" >
                                                            Check it for Instant Inspection
                                                        </label>
                                                        </div>
                                                        <p>
                                                        Need an urgent gas leakage inspection? Opt for our Instant Inspection service, and our rapid response
                                                        team will be dispatched to your location immediately.
                                                        </p>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>

                                        <div>
                                        {checkDescrip?
                                            <div className="fade-in">
                                            <Alert severity="error">Please Explain your <b>Problem</b>.</Alert>
                                            </div>
                                            :''}
                                            <label htmlFor="">Details or Any Additional Comments:</label>
                                            <textarea name="text" id="" cols="50" rows="3" className='name' onChange={(e)=>{setdetails(e.target.value);setcheckDescrip(false) }}></textarea>
                                        </div>
                                        
                                    </form>
                            </div>
                        </div>
                    
                    </div>
                </div>
        </section>
        
        :
        
        <div className="ins-hero container mt-3">
        <div className="row hero-section">
                 
        <div className={`col-md-6 animate-form ${showForm ? 'animate-left' : 'animate-right'}`}>
                        <div className='i-child1'>
                        <h1>
                        <b> How can we help?</b>
                            </h1>
                            <p> By scheduling an inspection, our trained experts will carefully examine your home's gas systems to identify any leaks or potential risks. Our goal is to offer a comprehensive solution to ensure the safety and well-being of your household</p>
                            {/* <button className='booking-app-hero' onClick={()=>{setshowForm(true)}} >Book an Appointment</button> */}

                        </div>
                        </div>
                        <div className={`col-md-6 animate-form ${showForm ? 'animate-right' : 'animate-left'}`}>
                        <div className='i-child2'>
                        <div className='ins-img-p'>
                        <img src={inspect} alt="" className='ins-img-a img-fluid' />
                           {/* <p className='text-center mb-0 mt-5'>keep your home</p>
                            <h3 className='text-center'> <b>SAFE</b></h3> */}
                        </div>
                        </div>
                        </div>
                </div>
            </div>}
        </section>

        <div>
        {showForm?
                <section>
                <div className='book-app-parent'>
                <button className='booking-app ' onClick={()=>{setshowForm(false)}} >Back</button>
                <button className='booking-app ' onClick={()=>{showFormData()}} >Confirm</button>
                </div>
            </section>
        :
            <section>
            <div className='book-app-parent'>
            <button className='booking-app' onClick={()=>{setshowForm(true)}} >Book an Appointment</button>
            </div>
        </section>}
        </div>

      
       </div>)}
       {/* x-------------x-----------------x----------------- */}

        

        <section>
             <React.Fragment>
                     <Dialog
                       open={open}
                       onClose={handleClose}
                       PaperProps={{
                         component: 'form',
                         onSubmit: (event) => {
                           event.preventDefault();
                           const formData = new FormData(event.currentTarget);
                           const formJson = Object.fromEntries(formData.entries());
                           const email = formJson.email;
                           console.log(email);
                           handleClose();
                         },
                       }}
                     >
                       <DialogTitle>Confirmation </DialogTitle>
                       <DialogContent>
                         <DialogContentText>
                         <h5>Would you like to confirm booking this appointment?</h5>
                         </DialogContentText>
                        
                       </DialogContent>
                       <DialogActions>
                         <Button onClick={handleClose}>Cancel</Button>
                         <Button type="submit" onClick={sendInspectionData}>Confirm</Button>
                       </DialogActions>
                     </Dialog>
                   </React.Fragment>
        </section>
    </div>
  )
}
