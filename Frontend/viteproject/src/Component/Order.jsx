import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Order.css";
import NAV from "../Component/NAV";
import Rating from '@mui/material/Rating';


export default function Order() {
  const [warning, setwarning] = useState(true);
  const [Shopdata, setShopdata] = useState([]);
  const navigate = useNavigate();
  const warningoff = () => {
    setwarning(false);
  };
  const userChecking = async () => {
    const res = await fetch("http://localhost:3001/ChekingFromShopPage", {
      method: "POST",
      credentials: "include",
    });
    if (res.status === 400) {
      console.log("400");
      navigate("/Login");
    } else if (res.status === 200) {
      console.log("User is login");
    }
  };

  const allShop = async () => {
    const res = await fetch("http://localhost:3001/AllShops", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.status === 400) {
      console.log("Database Error");
    } else {
      const data = await res.json();
      setShopdata(data);
      console.log(Shopdata);
    }
  };

  useEffect(() => {
    userChecking();
    allShop();
  }, []);

  return (
    <div>
      <div className='stickynav-edit'>
      <NAV/>
      </div>
      {warning ? (
        <div className="warning">
          <div class="alert alert-success" role="alert">
            When placing an order, please ensure that the vendor is located near
            your home, and enter the details accurately. This will help the
            vendor deliver to your home easily
          </div>
          <button className="back-btn-warning" onClick={warningoff}>
            Back
          </button>
        </div>
      ) : (
        ""
      )}

      {/* --------x----------x-------------- */}
      {Shopdata.map((shop,index)=>(
        <div className="container card my-3 p-4 shop-card">
        <div className="row">
          <div className="col-md-7">
            <div className="card-body">
              <i className="fa-solid fa-shop mb-4 imageicon"></i>
              {shop.ShopName}
              <div className="owner-info list-group ">
                <p className="list-group-item">
                  <strong>Owner Name:</strong> {shop.OwnerName}
                </p>
                <p className="list-group-item">
                  <strong>Price:</strong>{shop.CurrentPrice}
                </p>
                <p className="list-group-item">
                  <strong><i className="fa-solid fa-phone"></i></strong> {shop.VendorPhone}
                </p>
                <p className="list-group-item">
                  <strong><i className="fa-solid fa-location-dot"></i></strong> {shop.VendorAddress}
                </p>
                
              </div>
            </div>
          </div>
          <div className="col-md-5 placeorder-btn-vendor">
          <div >
                 {shop.status==1?
                  <div className="alert-warning">Shop is temporary closed</div>
                 : <Link to={`/placeorder?id=${shop._id}`} className="edditionalbtn">
          Place Order
        </Link>}
        <p className="list-group-item mt-3 px-4"> Rating : {shop.TotalRating}</p>
        <Rating name="read-only" value={shop.TotalRating} readOnly />

       
                  
                </div>
          </div>
        </div>
      </div>
      ))}
      {/* {Shopdata.map((shop, index) => (
  <div className="container" key={shop._id}>
    <div className="card text-center mt-3">
      <div className="card-header">Price: {shop.CurrentPrice}</div>
      <div className="card-body">
        <h5 className="card-title">{shop.ShopName}</h5>
        <p className="card-text">
          <b>Address:</b> {shop.VendorAddress}
        </p>
        <Link to={`/placeorder?id=${shop._id}`} className="btn btn-primary">
          Place Order
        </Link>
      </div>
      <div className="card-footer text-muted">
        Service Provided by <b>GETGAS</b>
      </div>
    </div>
  </div>
))} */}


    </div>
  );
}
