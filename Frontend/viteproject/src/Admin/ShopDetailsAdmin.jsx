import React, { useState, useEffect } from 'react';
import Admin from './Admin';
import '../Admin.css';
import Rating from '@mui/material/Rating';
import { Link, useNavigate } from "react-router-dom";

export default function ShopDetailsAdmin() {
  const [shopData, setShopData] = useState({});
  const [editableShopData, setEditableShopData] = useState({});
  const [findShop, setFindShop] = useState('');
  const [show, setshow] = useState(false);
  const [deleteconfirmation, setdeleteconfirmation] = useState(false)
  const navigate=useNavigate()

  const getVenShop = async () => {
    try {
      const res = await fetch('http://localhost:3001/GetVendorShopAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ FindShop: findShop }),
      });
      if (res.status === 400) {
        console.log('Email did not get in the backend');
      } else if (res.status === 401) {
        console.log('Shop not found');
      } else if (res.status === 200) {
        const data = await res.json();
        setShopData(data.shopData);
        setEditableShopData(data.shopData); // Initialize editable data with shop data
        console.log(data.shopData);
        setshow(true);
      }
    } catch (error) {
      console.log('error in try catch');
    }
  };
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
      }
      else if(res.status==400){
        navigate('/')
      }
  }
  useEffect(() => {
    checkadminIslogin()
    const query = new URLSearchParams(window.location.search);
    const currentIndex = query.get('id');
    if (currentIndex) {
      setFindShop(currentIndex);
    }
    setTimeout(() => {
      getVenShop();
    }, 1000);
  }, [findShop]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableShopData({
      ...editableShopData,
      [name]: value,
    });
  };

  const handleUpdate = async() => {
    // Implement update functionality here, e.g., send updated data to backend
    console.log('Updated shop data:', editableShopData);
    try {
      const res = await fetch('http://localhost:3001/UpdatesShopDataByAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ editableShopData }),
      });
      if (res.status === 400) {
        console.log('Email did not get in the backend');
      } else if (res.status === 401) {
        console.log('Shop not found');
      } else if (res.status === 200) {
        const data = await res.json();
        alert('Shop Updated')
      }
    } catch (error) {
      console.log('error in try catch');
    }
  };
  const handleDelete = async () => {
    try {
      const res = await fetch('http://localhost:3001/DeleteShopDataByAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shopId: shopData._id }),
      });
      if (res.status === 200) {
        console.log('Shop deleted successfully');
        alert('Selected data deleted successfully');
        navigate('/HnadleUserDetailsAdmin')
      } else {
        console.log('Failed to delete shop');
      }
    } catch (error) {
      console.log('Error deleting shop:', error);
    }
  };

  return (
    <div>
      <section>
        <Admin />
      </section>
      <div className="container">
        <Link to="/HnadleUserDetailsAdmin">
          <button type="button" className="btn backAdmin mt-2 ">
            Back
          </button>
        </Link>
      </div>

      <section>
        {deleteconfirmation?<div className=" deletealert">
      <div className='card'>
            <h5 className="card-header">Delete Confirmation</h5>
      <div className="card-body">
        <h5 className="card-title">Are you sure ? </h5>
        <p className="card-text">This action can not be reverse</p>
        <button className='btn btn-primary m-1' onClick={()=>{setdeleteconfirmation(false)}}>Cancel</button>
        <button className='btn btn-dark m-1' onClick={handleDelete}>Delete</button>
      </div>
            </div>
      </div>:''}
      </section>

      
   
      {show ? (
        <section>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Registered Shop Details
                </h1>
                <div>
                  <button type="button" className="btn btn-secondary m-1" onClick={handleUpdate}>
                    Update
                  </button>
                  <button type="button" className="btn btn-secondary m-1" onClick={()=>{setdeleteconfirmation(true)}} >                    
                    Delete
                  </button>
                  
                 
                </div>
              </div>
              <div className="modal-body">
                <div className="finalformofshopadmin">
                  <h5>Rating of this Shop</h5>
                  <Rating name="read-only" value={shopData.TotalRating} readOnly />
                </div>
                <div className="row g-3 form-parent-inspection finalShopDeatils">
                  <div className="col-md-4 form-box">
                    <label>Shop Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="ShopName"
                      value={editableShopData.ShopName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 form-box">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="VendorAddress"
                      value={editableShopData.VendorAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 form-box">
                    <label>Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="VendorPhone"
                      value={editableShopData.VendorPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 form-box">
                    <label>Owner Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="OwnerName"
                      value={editableShopData.OwnerName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 form-box">
                    <label>Current Price (Per KG)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="CurrentPrice"
                      value={editableShopData.CurrentPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 form-box">
                    <label>Province</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Province"
                      value={editableShopData.Province}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 form-box">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="City"
                      value={editableShopData.City}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 form-box">
                    <label>Zip-Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="ZipCode"
                      value={editableShopData.ZipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="loaderwidth">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
