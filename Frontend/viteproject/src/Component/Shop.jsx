import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import "../Shop.css";
import NAV from "../Component/NAV";
import VendorNav from './VendorNav';

export default function Shop() {
  const [Shop,setShop]=useState(false);
  const [shopDetails,setshopDetails]=useState(null)
  
  const GetShop = async () => {
    const res= await fetch('http://localhost:3001/ShopData',{
      method:'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials:'include'
    })
    const data=await res.json();
    const Details=data;
    
    if(res.status===200){
      setshopDetails(
        Details
      )
      setShop(true)
    }
    else{
      setShopfalse(false)
    }
  }
 useEffect(() => {
  GetShop();
 }, [])
 
 
  return (
    <div>
     <div className='stickynav-edit'>
      <VendorNav/>
      </div>
      <div className="container mt-3">
        <Link to="/VendorHome" className="btn btn-primary">
          Home
        </Link>
      </div>
      {Shop ?
      <div className="container card my-3 p-4 shop-card">
        <div className="row">
          <div className="col-md-7">
            <div className="card-body">
            <i className="fa-solid fa-shop mb-4 imageicon"></i>
            {shopDetails.ShopName}
              <div className="owner-info list-group ">
                <p className="list-group-item">
                  <strong>Owner Name:</strong> {shopDetails.OwnerName}
                </p>
                <p className="list-group-item">
                  <strong>Price:</strong>{shopDetails.CurrentPrice}
                </p>
                <p className="list-group-item">
                
                  <strong><i className="fa-solid fa-phone"></i></strong> {shopDetails.VendorPhone} 
                </p>
                <p className="list-group-item">
                  <strong><i className="fa-solid fa-location-dot"></i></strong> {shopDetails.VendorAddress}
                </p>
                
                <div>
                 <button
                  className="edditionalbtn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#whyChooseUsContent"
                  aria-expanded="false"
                  aria-controls="whyChooseUsContent"
                >
                   Additional Details
                </button>
                <div className="collapse" id="whyChooseUsContent">
                  <ul className="list-group">
                    <li className="list-group-item">
                    <strong>City:</strong> {shopDetails.City}
                       </li>
                    <li className="list-group-item">
                    <strong>Province:</strong>    {shopDetails.Province}
                      </li>
                    <li className="list-group-item">
                    <strong>Zip-Code:</strong> {shopDetails.ZipCode}
                    </li>
                  </ul>
                </div>
                     
                    </div>

           
                
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <img
              src="https://img.freepik.com/free-vector/realistic-gas-cylinder-illustration_23-2150317288.jpg?size=626&ext=jpg&ga=GA1.1.1262783890.1700261175&semt=ais"
              // src={shopDetails.ImagePath}
              alt="Shop"
              className="img-fluid shop-image"
            />
          </div>
        </div>
      </div>
      :
      <div className="mt-5 addshopP container">
          <h3>Please Add your Shop First</h3>
      </div>
      }
      

    

    </div>
  );
}
