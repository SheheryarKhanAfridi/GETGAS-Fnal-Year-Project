import React,{useState,useEffect} from "react";
import NAV from "../Component/NAV";
import Example from "../Component/Example";
import "../OrderHistory.css";
import HistoryCard from './HistoryCard'
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

export default function Ohistory() {
    const [User, setUser] = useState(null)
    const [OrderData, setOrderData] = useState()
    const [showHistory, setshowHistory] = useState(false)
    const [DeleteOrderID, setDeleteOrderID] = useState()
    const [showAlert, setshowAlert] = useState(false)
//  {
//     const [username, setUsername] = useState('');
//     const [stars, setStars] = useState(0);
//     const [comment, setComment] = useState('');

//     const handleStarClick = (selectedStars) => {
//         setStars(selectedStars);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('/api/reviews', { username, stars, comment });
//             alert('Review submitted successfully!');
//             setUsername('');
//             setStars(0);
//             setComment('');
//         } catch (error) {
//             console.error('Failed to submit review:', error);
//             alert('Failed to submit review. Please try again later.');
//         }
//     };

//  }

const GetUserData =async ()=>{
    const res= await fetch('http://localhost:3001/checkuserOrders',{
      method:'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials:'include'
    })
    if(res.status===201){
      const data=await res.json();
      setUser(data)
      const response= await fetch('http://localhost:3001/checkuserOrders2',{
      method:'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials:'include',
    })
      const dataOrder=await response.json()
      if(response.status===400){
        return alert('Error while getting Order History')
      }
      else if(response.status===201){
        setOrderData(dataOrder)
        setshowHistory(true)
      console.log({OrderData})
      return
      }
    }
   
}

const shoowCancelConfirmalert=async()=>{
    console.log('api send')
    const res= await fetch('http://localhost:3001/DeleteOrderRequest',{
        method:'POST',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify(DeleteOrderID)
    })
    console.log(DeleteOrderID)
    if(res.status==400){
        alert('Empty Data Response')
    }
    else if(res.status==401){
        alert('Shop not found, Must be deleted by admin')
    }
    else if(res.status==200){
        console.log('shop updated')
        GetUserData();
        setshowAlert(false)
    }
}
useEffect(() => {
      GetUserData();
}, []);
  

  return (
    <div>
        <NAV/>
     {User==null?<div className="loading-parent">
                <div className="loading">
                    <CircularProgress />
                </div>
            </div>:( <div className="history--back">
        <div className="container history-parent">
          <div className="row">
            <div className="btns-of-order-history">
                <div className="child-1-inner">
                    <h4>Order history of <b>{User.name}</b></h4>
                </div>
                <div>
                    <Link to={`/InspectionCheck?id=${User._id}`}>
                <button class=" inspection-btn-check"> Click for Inspection Request Details</button>

                    </Link>
                </div>

            </div>
            <hr />
            <div className=" row-child-2">
                {showHistory?
                OrderData.map((index,key)=>(
                  <div className="order-h-parent history-parent">
                       <section>
            <div className="container  py-3 h-75" >
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-6 card---width">
                        <div className="card border-top border-bottom border-3" style={{ width: '80%', height: '80%', fontSize: '14px' }}>
                            <div className="card-body p-3">
                                    <p style={{ color: '#008374', fontSize: '12px' }}>Once the order is confirmed then you can not cancel the order</p>
                                <div className="cancel-orders">
                                <p className="lead fw-bold mb-3" style={{ color: '#008374', fontSize: '20px' }}>Purchase Receipt</p>
                               {index.status==0? <div>
                                <Link to=''>
                                    <button type="button" class="py-1 px-2 rounded text-white cancelll" style={{ backgroundColor: '#008374', fontSize: '14px' }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{
                                       
                                        setDeleteOrderID({
                                                            'ShopId':index.ShopId,
                                                            'VendorId':index.VendorId,
                                                            'UserId':index.User_id,
                                                            'OrderId':index.Order_Id
                                                        })}}>
                                        Cancel order
                                    </button>
                                </Link>
                               </div>:''}
                               
                                </div>
                                <p className="lead fw-bold m-0 mb-1" style={{ color: '#008374', fontSize: '15px' }}> Status: 
                                {index.status==1?' Order has been accepted by Vendor':''}
                                {index.status==0?' Pending':''}
                               {index.status==2?' Order cancel by Vendor due to some reason':''}
                               {index.status==3?' Order Deleted ':''}
                                </p>
                                                         
                                <div className="row">
                                    <div className="col mb-2">
                                        <p className="small text-muted mb-1">Date</p>
                                        <p>{index.Order_date}</p>
                                    </div>
                                    <div className="col mb-2">
                                        <p className="small text-muted mb-1">Order No.</p>
                                        <p>{index.Order_Id}</p>
                                    </div>
                                </div>

                                <div className="mx-n3 px-3 py-2 mb-4" style={{ backgroundColor: '#f2f2f2', fontSize: '14px' }}>
                                    
                                    <div className="row">
                                        <div className="col-md-8 col-lg-9">
                                            <p className="mb-0">Shop Name:</p>
                                        </div>
                                        <div className="col-md-4 col-lg-3">
                                            <p className="mb-0"> {index.ShopName} </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-8 col-lg-9">
                                            <p className="mb-0">Total KG:</p>
                                        </div>
                                        <div className="col-md-4 col-lg-3">
                                            <p className="mb-0"> {index.KG} </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-8 col-lg-9">
                                            <p className="mb-0">Price per KG:</p>
                                        </div>
                                        <div className="col-md-4 col-lg-3">
                                            <p className="mb-0"> {index.Price} </p>
                                        </div>
                                    </div>
                                    <div className=" bill-display">
                                        <div className="">
                                        <p className=" fw-bold mb-0" style={{ color: '#f37a27', fontSize: '15px' }}>Total Price</p>

                                           
                                        </div>
                                        <div className="">
                                        <p className=" fw-bold mb-0" style={{ color: '#f37a27', fontSize: '18px' }}>Rs: {index.Bill}</p>
                                          
                                        </div>
                                    </div>
                                </div>
                                     {index.status!=3? <div>
                                <div className="row">
                                    <div className="col-lg-12">

                                        {/* <div className="horizontal-timeline">

                                            <ul className=" list-inline items m-0 d-flex justify-content-between" style={{ fontSize: '14px' }}>
                                                <li className="History-Card-hover-setting list-inline-item items-list">
                                                    <Link to=''>
                                                    <button className="py-1 px-4 rounded text-white" style={{ backgroundColor: '#008374', fontSize: '14px' }}>Repeat Order</button>
                                                    </Link>
                                                </li>
                                                <li className="History-Card-hover-setting list-inline-item items-list">
                                                    <Link to=''>
                                                        <button className="py-1 px-3 rounded text-white" style={{ backgroundColor: '#008374', fontSize: '14px' }}>Report</button>
                                                    </Link>
                                                </li>
                                                
                                            </ul>
                                           

                                        </div> */}
                                        <div className="horizontal-timeline2" >
                                            <ul className="list-inline items d-flex justify-content-between m-0  " style={{ fontSize: '14px' }}>

                                        {index.status==0?'':<li className="History-Card-hover-setting list-inline-item items-list m-0">
                                                    <Link to={`/historyDetails?id=${index._id}`}>
                                                    <button className="rounded text-white Details-reviw-btn" style={{ backgroundColor: '#008374', fontSize: '14px' }}>Complete Details / Review</button>
                                                    </Link>
                                                </li>}
                                            </ul>

                                        </div>

                                    </div>
                                </div>
                               
                                <p className="mt-3 pt-2 mb-0" style={{ fontSize: '14px' }}>Need help? <Link to="/Contact" style={{ color: '#008374', fontSize: '14px' }}>Contact us</Link></p>
                                </div> :''}                     
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            <section>
      

      </section>
                  </div>
                )):''}  

            </div>
          </div>
        </div>
      </div>)}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete confirmation</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this Order ?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={ ()=>{setshowAlert(true);shoowCancelConfirmalert()}}>Delete</button>
                        </div>
                        </div>
                    </div>
                    </div>

                
                  {showAlert?<div className=" loaderwidthofOrders">
  <div className="spinner-border " role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>:''}

    </div>
  );
}
