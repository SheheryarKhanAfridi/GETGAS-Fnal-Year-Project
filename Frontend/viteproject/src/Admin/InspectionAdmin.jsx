import React , {useState,useEffect} from 'react'
import Admin from "./Admin";
import { CgPlayButton } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa";

import { Link ,useNavigate} from 'react-router-dom';


export default function InspectionAdmin() {
    const navigate=useNavigate();   
    const [showicon, setshowicon] = useState(false)
    const [Inspection, setInspection] = useState()
    const [instant, setinstant] = useState()
    const [schedule, setschedule] = useState()
    const [showTableofInstant, setshowTableofInstant] = useState(false)
    const [showData, setshowData] = useState(false)


    const HandleRequest=()=>{

    }
    const getData =async()=>{
        try {
            const res=await fetch('http://localhost:3001/AdminInspection',{
            method:'GET',
            headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
        })
        if(res.status==200){
            const data=await res.json();
            setInspection(data)
            console.log('state updated')
            const filteredData = data.filter(item => item.Instant === true);
            setinstant(filteredData)
            const scheduleData = data.filter(item => item.Instant === false);
            setschedule(scheduleData)
            setshowData(true)
            console.log(Inspection)
        }
        
        } catch (error) {
            console.log('error in try catch')
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
            getData()
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
    <div className="container btn-grup-inspection">
        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" className="btn-check " name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
            <label className={`btn btn-outline-primary btn-instant-schedule `} htmlFor="btnradio1" onClick={() => { setshowicon(false); setshowTableofInstant(false) }}> <CgPlayButton className={`${showicon ? 'notshowIcon' : "iconforinstantbtn"}`} /> Instant Request</label>

            <input type="radio" className="btn-check " name="btnradio" id="btnradio2" autoComplete="off" />
            <label className="btn btn-outline-primary btn-instant-schedule" htmlFor="btnradio2" onClick={() => { setshowicon(true); setshowTableofInstant(true) }}> <CgPlayButton className={`${showicon ? 'iconforinstantbtn' : "notshowIcon"}`} /> Schedule Request</label>

        </div>
    </div>
   {showData? <section>
        <div className="container">
           
           <div className="bd-example">
                <div>
                {showTableofInstant ? <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Address</th>
                                <th scope="col">Status</th>
                                <th scope="col">Manage</th>
                                <th scope="col" className='left-align-btn'>Whatsapp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule && schedule.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.address}</td>
                                    <td><span> {item.status === 0 ?  <span className='alert-danger p-2'>
            Pending
            </span> : ''}
                  {item.status === 1 ?  <span className='alert-success p-2'>
            Request has been Approved
            </span> : ''}
                  {item.status === 2 ? <span className='alert-secondary p-2'>
                  request has been cancel
            </span> : ''}
                 </span></td>
                                    <td>
                                        <Link to={`/InspectionDeatils-Admin?id=${item._id}`}>
                                        <button className='details-admin'>Details</button>
                                        </Link>
                                    </td>
                                    <td className='left-align-btn'>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            id='whatsid'
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            data-bs-custom-class="custom-tooltip"
                                            title="Contact through whatsapp"
                                        >
                                            <FaWhatsapp className='whatsapp' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> :
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Address</th>
                                <th scope="col">Status</th>
                                <th scope="col">Manage</th>
                                <th scope="col" className='left-align-btn'>Whatsapp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {instant && instant.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <div>
                                        {item.status === 0 ?  <span className='alert-danger p-2'>
                                            Pending
                                            </span> : ''}
                                                {item.status === 1 ?  <span className='alert-success p-2'>
                                            Request has been Approved
                                            </span> : ''}
                                                {item.status === 2 ? <span className='alert-secondary p-2'>
                                                request has been cancel
                                            </span> : ''}
                                            {item.status === 3 ? <span className='alert-secondary p-2'>
                                                request has been cancel by admin
                                            </span> : ''}
                                            </div>      
                                        </td>
                                    <td>
                                        <Link to={`/InspectionDeatils-Admin?id=${item._id}`}>
                                            <button className='details-admin'>Details</button>
                                        </Link>
                                    </td>
                                    <td className='left-align-btn'>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            id='whatsid'
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            data-bs-custom-class="custom-tooltip"
                                            title="Contact through whatsapp"
                                        >
                                            <FaWhatsapp className='whatsapp' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                </div>
                
            </div>

        </div>
    </section>:
    <section>
    <div className=" loaderwidth">
  <div className="spinner-border " role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
    </section> }
</div>

  )
}
