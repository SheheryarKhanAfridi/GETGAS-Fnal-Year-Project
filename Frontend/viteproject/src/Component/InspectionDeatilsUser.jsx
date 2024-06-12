import React, { useState, useEffect } from "react";
import NAV from "../Component/NAV";
import "../OrderHistory.css";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";

export default function InspectionDeatilsUser() {
  const [data, setdata] = useState([]);
  const [show, setshow] = useState(false);
  const [showalert, setshowalert] = useState(false);
  const [details, setdetails] = useState({}); 
  const [deleteId, setdeleteId] = useState()
  const [deletealert, setdeletealert] = useState(false)

  const query = new URLSearchParams(location.search);
  const currentIndex = query.get("id");

  const Getdata = async () => {
    const res = await fetch("http://localhost:3001/InspectionCheck", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ currentIndex }),
    });
    if (res.status === 400) {
      alert("User Id not Found Please Contact Us via Email");
    } else if (res.status === 401) {
      alert("NO request");
    } else if (res.status === 200) {
      const request = await res.json();
      console.log(request)
      const filteredData = request.filter(item => item.deleteReq===false);
      console.log(filteredData,'filter data');
      setdata(filteredData);
      setshow(true);
    }
  };

 
  const handleMoreInfo = (item) => {
    setdetails(item); 
    setshowalert(true); 
  };
  const HandleDeleteRequest = async () => {
  console.log(deleteId)
    const res = await fetch('http://localhost:3001/DeleteInspectionRequest', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deleteId })
    });
    if(res.status==400){
      console.log('Empty Data')
      alert('Error');
    }
    else if(res.status==401){
      console.log('Shop not found')
      alert('Error');
    }
    else if(res.status==200){
      Getdata()
      const responseData = await res.json();
      console.log('Response from server:', responseData); 
      setdeletealert(false)
      setshowalert(false)
    }
    
  };
  useEffect(() => {
    Getdata();
  }, []);

  return (
    <div>
      <NAV />
      <div className="container">

        <Link to="/orderhistory">
          <button className="btn btn-primary mt-5">Back</button>
        </Link>
      </div>
      
      <section className="mt-5">
        <div className="container card-inspect-req-parant">
        
          {show ? (
            data.map((item, index) => (
              <div key={index} className={item.status==1?'backcardgreenaproved':'inpectioncheckCard'}>
                
                <div className="inpectioncheckCard-details">
                  <p className="inpectioncheckCard-text-title">
                    Status:{" "}
                    {item.status === 0
                      ? "Pending"
                      : item.status === 1
                      ? <div>"Your Request has been Approved"</div>
                      : item.status === 2
                      ? "Sorry due to some technical issue your request has been cancel"
                      : ""}
                  </p>
                 
                    <p className={item.status==1?'inpectioncheckCard-text-bodxyxy':'npectioncheckCard-text-body m-0 p-0'}>

                    Order Id: {item.Order_Id}
                    </p>

                  <p className="inpectioncheckCard-text-body m-0 p-0">
                    Inspection Type:{" "}
                    {item.priority === 0 ? "Schedule" : "Instant"}
                  </p>
                  <p className="inpectioncheckCard-text-body m-0 p-0">
                    Date: {item.Order_date}
                  </p>
                </div>
                <button
                  className="inpectioncheckCard-button"
                  onClick={() => handleMoreInfo(item)} // Pass inspection details to handleMoreInfo function
                >
                  More info
                </button>
              </div>
            
            ))
          ) : (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {showalert ? (
        <section className="alert-inspect-details">
         <div className="custom-card ">
      <div className="custom-content px-5">
         <div className="back-icon">
         <MdCancel  onClick={()=>{setshowalert(false)}}/>
         </div>
        
      <h3 >
                    Status:{" "}
                    {details.status === 0
                      ? "Pending"
                      : details.status === 1
                      ? "Your Request has been Approved"
                      : details.status === 2
                      ? "Sorry due to some technical issue your request has been cancel"
                      : ""}
                  </h3>
        <p className="para">
          Order Id: {details.Order_Id}
        </p>
        <p className="m-0 p-0">
          Details: {details.details}
        </p>
        <p className="m-0 p-0">
          Name: {details.name}
        </p>
        <p className="m-0 p-0">
          Address: {details.address}
        </p>
        <p className="m-0 p-0">
          Booking Date: {details.Order_date}
        </p>
       <p >
       {details.status===0? 
      <button className="btn btn-dark" onClick={()=>{setdeleteId(details.Order_Id);setdeletealert(true)}}>Delete Request</button>
        :<div className="m-0 p-0">
          Once request is accepted or decline you can not Delete it
        </div>}
       </p>
       
      </div>
    </div>
        </section>
      ) : null}
      <section>
        {deletealert?<div className="modal show d-block deletealertindex" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confrimation</h5>
                <button type="button" className="btn-close"  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this request ?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" >Close</button>
                <button type="button" className="btn btn-dark" onClick={HandleDeleteRequest}>Delete</button>
              </div>
            </div>
          </div>
        </div>:
//         <div className="container">
//           <div class="card text-center">
//   <div class="card-header">
//     Orders
//   </div>
//   <div class="card-body mb-5 mt-5">
//     <h5 class="card-title">Zero Orders</h5>
//     <p class="card-text">Place an appointment to inspect your home make your home safe from any dangerous situation  </p>
//   </div>
//   <div class="card-footer text-muted">
//     GetGas
//   </div>
// </div>
//         </div>
''
        }
      </section>
    </div>
  );
}
