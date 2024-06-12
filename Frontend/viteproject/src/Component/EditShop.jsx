import React,{useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import NAV from "./NAV";
import VendorNav from "./VendorNav";
import Shop from "./Shop";
import '../Shop.css'
export default function EditShop() {
    const [shopDetails,setshopDetails]=useState(null)
    const [Shop,setShop]=useState(false);
    const [Edit,setEdit]=useState(false);
    const [showupdateddetails,setshowupdateddetails]=useState(false)
    const [showUpdatemsg,setshowUpdatemsg]= useState(false)
    const [deletemsg,setdeletemsg] =useState(false)
    const [showeditbuttons,setshoweditbuttons] =useState(false);
    const [closeMsg, setcloseMsg] = useState(false)
    const [Livemsg, setLivemsg] = useState(false)

    const handleEdit = (e) =>{
        e.preventDefault();
        if(Edit===false){
            setShop(false)
        setEdit(true)
        }
        else{
            setShop(true)
            setEdit(false) 
        }
        
    }

    const SubmitEditDetails = (e) =>{
        e.preventDefault();
        if(showupdateddetails===false){
            setshowupdateddetails(true)
        }
        else{
            setshowupdateddetails(false)
        }
    }

    const SubmitUpdateShop =async(e)=>{
      e.preventDefault();
      const res=await fetch('http://localhost:3001/EditShop',{
        method:'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials:'include',
          body:JSON.stringify(shopDetails)
      })
      const data=await res.json();
      if(res.status===400){
        alert('error')
      }
      else if(res.status===200){
        setEdit(false);
        setshowupdateddetails(false);
        setShop(true)
        setshowUpdatemsg(true)
      }
    }

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
          setshoweditbuttons(true)
        }
        else{
          setShopfalse(false)
        }
      }

      const handleeditshopform = (e) =>{
        e.preventDefault();

        const {name,value}=e.target;

        setshopDetails({
            ...shopDetails,
            [name]:value
        })
      }
      const handledeletereq=async()=>{
        const id=shopDetails._id
        const res=await fetch('http://localhost:3001/DeleteShopFromVendor',{
          method: 'POST',
          headers:{
            'content-type': 'application/json'
          },
          body: JSON.stringify({id})
        })
        if(res.status==200){
          console.log('Shop deleted')
          setShop(false)
          setdeletemsg(true)
          setshoweditbuttons(false)
          setEdit(false)
        }
          
      }
const handleShopcloseReq =async()=>{
  const {_id}=shopDetails
  const res=await fetch('http://localhost:3001/CloseReq',{
    method: 'POST',
    headers:{
      'content-type': 'application/json'
    },
    body: JSON.stringify({_id})
  })
  if(res.status==400){
    alert('Empty data')
  }
  else if(res.status==200){
    setcloseMsg(true)
    GetShop();

  }
} 
const handleLiveReq=async()=>{
  const {_id}=shopDetails
  const res=await fetch('http://localhost:3001/LiveReq',{
    method: 'POST',
    headers:{
      'content-type': 'application/json'
    },
    body: JSON.stringify({_id})
  })
  if(res.status==400){
    alert('Empty data')
  }
  else if(res.status==200){
    setLivemsg(true)
    GetShop();
  }
}
     useEffect(() => {
      GetShop();
     }, [])
  return (
    
    <div >
     <div className='stickynav-edit'>
      <VendorNav/>
      </div>
      <div className="bodyyyy">
      <div className="container">
        <Link to="/vendorhome" className="btn btn-primary mt-3">
          home
        </Link>
      </div>
      {showeditbuttons?<div className="edit-btn-group">
             <div className="edit-btn-group">
             <div class="btn-group" role="group" aria-label="Basic outlined example">
               <button type="button" class="btn btn-outline-primary" onClick={handleEdit}>Edit</button>
          {shopDetails.status==0?
               <button type="button" class="btn btn-outline-primary" onClick={handleShopcloseReq}>Temporary Closed</button>
        :''  
        }
         {shopDetails.status==1 ?
               <button type="button" class="btn btn-outline-primary" onClick={handleLiveReq}>Go live! Shop will be Live for Customers </button>
        :''  
        }
              
               <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                 data-bs-target="#exampleModal">Delete</button>
             </div>
             </div>
          </div>:''}

        

          <div>
          <div>
      <div className="modal" tabIndex="-1" id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Confirmation</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">  
              <p className="m-0">Are you sure you want to <b>delete</b> this shop?</p>
              <p className="m-0">You wont be able to get any orders from our Users</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handledeletereq}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
          </div>

          {deletemsg?<div className="deleteparentmsg">
              <div class="alert alert-success deletemsg" role="alert">
                  Your request has been submitted. The shop will be deleted soon.
              </div>
          </div>:''}
          

          {showUpdatemsg?<div className="updatemsg" onClick={(e)=>{return setshowUpdatemsg(false)}} >
          <button type="button" class="Edit-submit-shop2">
  Shop Details are  <span class="badge bg-secondary">Updated</span>
  <Link className="">
  <i class="fa-solid fa-x updatemsgicon"></i>
  </Link>
</button>

          </div>:''}

          {closeMsg?<div className="updatemsg" onClick={(e)=>{return setcloseMsg(false)}} >
          <button type="button" class="Edit-submit-shop2">
  Your shop is now  <span class="badge bg-secondary">Temporary closed</span>
  <Link className="">
  <i class="fa-solid fa-x updatemsgicon"></i>
  </Link>
</button>

          </div>:''}
          {Livemsg?<div className="updatemsg" onClick={(e)=>{return setLivemsg(false)}} >
          <button type="button" class="Edit-submit-shop2">
  Your shop is now  <span class="badge bg-secondary">Live for customers</span>
  <Link className="">
  <i class="fa-solid fa-x updatemsgicon"></i>
  </Link>
</button>

          </div>:''}
         

          {/* <div className="shopstatusbox container">
<h6>Your shop is now <span class="badge bg-secondary">{shopDetails.status==0?'Temporary closed':''}{shopDetails.status==1?'Live':''}</span></h6>
</div> */}
     {Shop?
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
    </div>:''}

      {Edit? (
        <div className="container">
            <div>
       
      </div>
      
        <div className="container card my-3 p-4 shop-card">
        <div className="parent-Edit-submit-shop">
      <button className="Edit-submit-shop" onClick={SubmitEditDetails}>
        Submit
       </button>
      </div>
          <div className="row">
            <div className="col-md-7">
              <div className="card-body">
              <i className="fa-solid fa-shop mb-4 imageicon">
              </i>
              <input type="text" className="EsitShopName" placeholder="Enter Name" name='ShopName' value={shopDetails.ShopName}  onChange={handleeditshopform}/>
                <div className="owner-info list-group ">
                  <p className="list-group-item">
                    <strong>Owner Name:</strong> 
                    {/* {shopDetails.OwnerName} */}
                    <input type="text" className="EsitShopName" placeholder="Enter Name" name='OwnerName' value={shopDetails.OwnerName} onChange={handleeditshopform}/>
                  </p>
                  <p className="list-group-item">
                    <strong>Price:</strong>
                    {/* {shopDetails.CurrentPrice} */}
                    <input type="text" className="EsitShopName" placeholder="Enter Name" name='CurrentPrice' value={shopDetails.CurrentPrice} onChange={handleeditshopform}/>
                  </p>
                  <p className="list-group-item">
                  
                    <strong><i className="fa-solid fa-phone"></i></strong>
                     {/* {shopDetails.VendorPhone} */}
                    <input type="text" className="EsitShopName" placeholder="Enter Name" name='VendorPhone' value={shopDetails.VendorPhone} onChange={handleeditshopform}/> 
                  </p>
                  <p className="list-group-item">
                    <strong><i className="fa-solid fa-location-dot"></i></strong>
                     {/* {shopDetails.VendorAddress} */}
                    <input type="text" className="EsitShopName" placeholder="Enter Name" name='VendorAddress' value={shopDetails.VendorAddress} onChange={handleeditshopform}/>
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
                      <strong>City:</strong> 
                      {/* {shopDetails.City} */}
                    <input type="text" className="EsitShopName" placeholder="Enter Name" name='City' value={shopDetails.City} onChange={handleeditshopform}/>
                         </li>
                      <li className="list-group-item">
                      <strong>Province:</strong>   
                       {/* {shopDetails.Province} */}
                    <input type="text" className="EsitShopName" placeholder="Enter Name" name='ZipCode' value={shopDetails.Province} onChange={handleeditshopform}/>
                        </li>
                      <li className="list-group-item">
                      <strong>Zip-Code:</strong> 
                      {/* {shopDetails.ZipCode} */}
                    <input type="text" className="EsitShopName" placeholder="Enter Name" name='ZipCode' value={shopDetails.ZipCode} onChange={handleeditshopform}/>
                      </li>
                    </ul>
                  </div>
                       
                      </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 edit-btn-group">
              <img
                src="https://img.freepik.com/free-vector/realistic-gas-cylinder-illustration_23-2150317288.jpg?size=626&ext=jpg&ga=GA1.1.1262783890.1700261175&semt=ais"
                // src={shopDetails.ImagePath}
                alt="Shop"
                className="img-fluid shop-image"
              />
               
            </div>
          </div>
        </div>
        </div>
      ):
      ''}

      {showupdateddetails?(
        <div className="showupdatedDetails">
           <div >
           <button className="Edit-submit-shop m-2" onClick={SubmitUpdateShop}>
        Submit
       </button>
       <button className="Edit-submit-shop" onClick={SubmitEditDetails}>
        Cancel
       </button>
           </div>
        <div className="Parentoffinalform">
           <div className="SHopName">
              Shop Name: 
           </div>
           <div className="defaultName">
           {shopDetails.ShopName}
           </div>
        </div>
        <div className="Parentoffinalform">
           <div className="SHopName">
              Owner Name: 
           </div>
           <div className="defaultName">
           {shopDetails.OwnerName}
           </div>
        </div>
        <div className="Parentoffinalform">
           <div className="SHopName">
              Price: 
           </div>
           <div className="defaultName">
             {shopDetails.CurrentPrice}
           </div>
        </div>
        <div className="Parentoffinalform">
           <div className="SHopName">
              Phone: 
           </div>
           <div className="defaultName">
             {shopDetails.VendorPhone}
           </div>
        </div>
        <div className="Parentoffinalform">
           <div className="SHopName">
              Address: 
           </div>
           <div className="defaultName">
             {shopDetails.VendorAddress}
           </div>
        </div>
        <div className="Parentoffinalform">
           <div className="SHopName">
              City: 
           </div>
           <div className="defaultName">
             {shopDetails.City}
           </div>
        </div>
        <div className="Parentoffinalform">
           <div className="SHopName">
              province: 
           </div>
           <div className="defaultName">
             {shopDetails.Province}
           </div>
        </div>
        <div className="Parentoffinalform">
           <div className="SHopName">
              Zip-Code: 
           </div>
           <div className="defaultName">
             {shopDetails.ZipCode}
           </div>
        </div>

      </div>
      ):<div className="deleteparentmsg">
      <div class="alert alert-success deletemsg" role="alert">
          Please add your shop first
      </div>
  </div>}
     
      </div>
    </div>
  );
}
