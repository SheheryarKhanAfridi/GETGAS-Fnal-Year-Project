import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../vendor.css'
import NAV from "../Component/NAV";
import VendorNav from './VendorNav';
export default function VendorForm() {
  const [Vendor, setVendor] = useState({});
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loader, setloader] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  // handle input kr rahe hn ek variable banaya jisme data save krwainge
  // phr us data ko setvendor k through update krwa deinge useState me

  const handleVendorForm = (e) => {
    const { name, value } = e.target;
    setVendor({
      ...Vendor,
      [name]: value,
    });
  };

  const Vendorshop = async (e) => {
    setloader(true)
    e.preventDefault();

    if (
      !Vendor.shopname ||
      !Vendor.ownername ||
      !Vendor.vendor_phone ||
      !Vendor.vendor_address ||
      !Vendor.current_price ||
      !Vendor.city ||
      !Vendor.province ||
      !Vendor.zipcode ||
      !selectedFile
    ) {
    setloader(false)
      return alert("Please fill in all fields");
      
    }
    const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('shopname', Vendor.shopname);
  formData.append('ownername', Vendor.ownername);
  formData.append('vendor_phone', Vendor.vendor_phone);
  formData.append('vendor_address', Vendor.vendor_address);
  formData.append('current_price', Vendor.current_price);
  formData.append('city', Vendor.city);
  formData.append('province', Vendor.province);
  formData.append('zipcode', Vendor.zipcode);

    //json me hum text bhj skte hn jo strings hoti hn
    // lkn image  binary data me hoti hn to json.stringify ki help se nhi bhj skte
    //   const formData = new FormData();
    // formData.append('shopname', Vendor.shopname);
    // formData.append('ownername', Vendor.ownername);
    // formData.append('vendor_phone', Vendor.vendor_phone);
    // formData.append('vendor_address', Vendor.vendor_address);
    // formData.append('current_price', Vendor.current_price);
    // formData.append('city', Vendor.city);
    // formData.append('province', Vendor.province);
    // formData.append('zipcode', Vendor.zipcode);
    // formData.append('shopImages', Vendor.shopImages);

    try {
      const res = await fetch("http://localhost:3001/VendorForm", {
      method: "POST",
      body: formData,
      credentials:'include'
    });
    if (!res) {
      console.log("route not found");
    } else if (res.status === 200) {
      navigate("/Shop");
    } else if (res.status === 400) {
    setloader(false)

      console.log("image not found");
    }
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <div>
      <div className='stickynav-edit'>
      <VendorNav/>
      </div>
      <div className="container">
        
          <Link to="/VendorHome" className="vendor-link">
          <button className="btn btn-primary mt-3">
            Back 
          
        </button>
        </Link>
        <h3 className="text-center">
          <b>V</b>endor form
        </h3>
        <div className="vendor-form">
          <form action="/stats" enctype="multipart/form-data" method="post">
            <div className="vendor-input">
              <label htmlFor="">Shop Name</label>
              <input type="text" name="shopname" onChange={handleVendorForm} />
            </div>
            <div className="vendor-input">
              <label htmlFor="">Owner Name</label>
              <input type="text" name="ownername" onChange={handleVendorForm} />
            </div>
            <div className="vendor-input">
              <label htmlFor="">Vendor Phone Number</label>
              <input
                type="number"
                name="vendor_phone"
                onChange={handleVendorForm}
              />
            </div>

            <div className="vendor-input">
              <label htmlFor="">Address in detail</label>
              <input
                type="text"
                name="vendor_address"
                onChange={handleVendorForm}
              />
            </div>
            <div className="vendor-input">
              <label htmlFor="shopImages">Upload Shop Images</label>
              <input
                type="file"
                id="shopImages"
                name="shopImages"
                accept="image/*"
                className="input-pics"
                onChange={handleFileChange}
              />
            </div>
            <div className="vendor-input">
              <label htmlFor="">Current Price PER KG</label>
              <input
                type="number"
                name="current_price"
                onChange={handleVendorForm}
              />
            </div>
            <div className="city-details">
              <div className="vendor-input">
                <label htmlFor="">city</label>
                <input type="text" name="city" onChange={handleVendorForm} />
              </div>
              <div className="vendor-input">
                <label htmlFor="">Province</label>
                <input
                  type="text"
                  name="province"
                  onChange={handleVendorForm}
                />
              </div>
              <div className="vendor-input">
                <label htmlFor="">Zip-Code</label>
                <input
                  type="number"
                  name="zipcode"
                  onChange={handleVendorForm}
                />
              </div>
              <button className="vendorformsubmit" onClick={Vendorshop}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {loader?<section className="deletealert">
      <div className='card'>
            <h5 className="card-header">Loading...</h5>
      <div className="card-body">
        <section>
          <div className="loaderwidth">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </section>
      </div>
            </div>
      </section>:''}
      
    </div>
  );
}
