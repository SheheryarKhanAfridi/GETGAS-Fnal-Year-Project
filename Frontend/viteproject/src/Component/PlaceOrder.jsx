import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NAV from "../Component/NAV";
import "../Order.css";
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';


const PlaceOrder = () => {
  // const url= new URLSearchParams(location.search)
  // const url_2=url.get('id')
  // console.log(url_2)

  const navigate = useNavigate();
  const [final,setfinal]=useState({})
  const [TotalPrice,setTotalPrice] = useState('')
  const [GenerateBill,setGenerateBill]=useState(false)
  const [guidelines, setguidelines] = useState(false);
  const [product, setproduct] = useState();
  const [showproduct, setshowproduct] = useState(false);
  const [errorcheck, seterrorcheck] = useState(false);
  const [emailcheck, setemailcheck] = useState(false);
  const [passcheck, setpasscheck] = useState(false);
  const [OrderiD, setOrderiD] = useState('')
  const [value, setValue] = React.useState(2);
  const [Review, setReview] = useState()
  const [orderplacing, setorderplacing] = useState({
 
  });
  const [orderconfirmed, setorderconfirmed] = useState(false);
  const orderDetails = (e) => {
    e.preventDefault();
    seterrorcheck(false);
    setemailcheck(false);
    setpasscheck(false);
    const { name, value } = e.target;
    setorderplacing({
      ...orderplacing,
      [name]: value,
    });
  };
  const query = new URLSearchParams(location.search);
    // location.search contain query string in the url
  const currentIndex = query.get("id");
  const getData = async () => {
    const res = await fetch("http://localhost:3001/shopproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentIndex }),
      credentials: "include",
    });
    const data = await res.json();
    if (res.status === 400) {
      return alert(
        "error while placing Order for asny Query please Contact us"
      );
    } else if (res.status === 401) {
      return alert("Server is Busy try again after 15 mins");
    } else if (res.status === 200) {
      setproduct(data);
      setshowproduct(true);
      setReview(data.Reviews)
      
    }
  };
  const showGuidlines = async (e) => {
    e.preventDefault();
    // checking email id is correct or not
    // dispatch(addItem({product}))
    // console.log(items)
    // return
    // if(orderplacing.OrderKG <=0){
    //   alert('zero')
    //   return
    // }
   
    if (
      !orderplacing.phone ||
      !orderplacing.email ||
      !orderplacing.password ||
      !orderplacing.address ||
      !orderplacing.addressDetails ||
      !orderplacing.OrderKG 
    ) {
      return seterrorcheck(true);
    }
    
    if(orderplacing.OrderKG <=0){
      return alert('Kg should be greater than 0')
    }
    
    try {
      const price=product.CurrentPrice;
    const total = orderplacing.OrderKG*product.CurrentPrice;
    const user_id=final._id;

    // setorderplacing( {
    //   ...orderplacing,
    //     'VendorId': product.Vendor_id,
    //     'Price': price,
    //     'bill': total,
    // });
      const res = await fetch("http://localhost:3001/CEP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(orderplacing),
      });
      const data = await res.json();
      if (res.status === 400) {
        setpasscheck(true);
      } else if (res.status === 401) {
        setemailcheck(true);
      } else if (res.status === 200) {
         setfinal(data)
         setorderplacing({
          ...orderplacing,
        'User_id':user_id,
        'VendorId': product.Vendor_id,
        'Price': price,
        'bill': total,
        'ShopName':product.ShopName,
        'ShopId':product._id
         })
        setguidelines(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const PLACEORDER = async () => {
    const total = orderplacing.OrderKG*product.CurrentPrice;
    setguidelines(false);
    console.log(orderplacing)
    
    const res = await fetch("http://localhost:3001/placeorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderplacing),
      credentials: "include",
    });
    const data = await res.json();
    if (res.status === 400) {
      console.log("Error while Placing Order");
    } else if (res.status === 200) {
      console.log("Order Placed");
      setOrderiD({
        order_id:data.Order_Id
      })
      setorderconfirmed(true);
      setTotalPrice(total)
      console.log(data.Order_Id)
    }
  };
  const OrderDone = () => {
    setorderconfirmed(false);
    navigate("/");
  };
  
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div>
      <div className='stickynav-edit'>
      <NAV/>
      </div>

      <>
        {showproduct ? (
          <div className="container">
            {guidelines ? (
              <div className="guiblines-show">
                <div className="orderbox">
                  <p>Safety guidelines</p>
                  <div className="detailsshop">
                    <ul className="list-group list-group-flush ">
                      <li className="list-group-item">
                        Ensure proper ventilation in the area where you plan to
                        handle the gas cylinder
                      </li>
                      <li className="">
                        Before placing your gas cylinder refill order, make sure
                        all gas-powered appliances, such as stoves and heaters,
                        are turned off.
                      </li>
                      <li className="list-group-item">
                        Maintain a strict no-smoking policy in the vicinity of
                        the gas cylinder handling area.
                      </li>
                      <li>
                        Place the gas cylinder on a stable and flat surface to
                        prevent accidental tipping
                      </li>
                      <li className="list-group-item">
                        After the refill process, perform a thorough check for
                        gas leaks.
                      </li>
                    </ul>
                    <div className="btnparent">
                      <button className="mt-4" onClick={PLACEORDER}>
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="parent">
              <div className="orderbox2 p-3">
                <div className="box2parent">
                  <div className="shopname">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">{product.ShopName} <br />
          <Rating name="read-only" value={product.TotalRating} readOnly />
          </li>

                      <li className="list-group-item">
                        Rs: {product.CurrentPrice} (Per KG)
                      </li>
                    </ul>
                  </div>
                  <div className="ShopDetailsinfo">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Owner Name: {product.OwnerName}
                      </li>
                      <li className="list-group-item">
                        Phone: {product.VendorPhone}
                      </li>
                      <li className="list-group-item">
                        Address: {product.VendorAddress}
                      </li>
                      <li className="list-group-item">
                        Province: {product.Province}
                      </li>
                      <li className="list-group-item">City: {product.City}</li>
                      <li className="list-group-item">
                        Zip-Code: {product.ZipCode}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="userdetails">
                <form className="row g-3">
                  {errorcheck ? (
                    <div className="alert alert-danger" role="alert">
                      please fill all the fields
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="col-md-12">
                    <label for="inputEmail5" className="form-label">
                      Enter KG
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputEmail5"
                      name="OrderKG"
                      onChange={orderDetails}
                    />
                  </div>
                  <div className="col-md-12">
                    <label for="inputEmail9" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail9"
                      name="name"
                      onChange={orderDetails}
                    />
                  </div>
                  <div className="col-md-12">
                    <label for="inputEmail4" className="form-label">
                      Email
                    </label>
                    {emailcheck ? (
                      <div className="alert alert-danger" role="alert">
                        Incorrect Email
                      </div>
                    ) : (
                      ""
                    )}
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      name="email"
                      onChange={orderDetails}
                    />
                  </div>
                  <div className="col-md-12">
                    <label for="inputPassword4" className="form-label">
                      Password
                    </label>
                    {passcheck ? (
                      <div className="alert alert-danger" role="alert">
                        Incorrect Password
                      </div>
                    ) : (
                      ""
                    )}
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                      name="password"
                      onChange={orderDetails}
                    />
                  </div>
                  <div className="col-md-12">
                    <label for="inputphone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputphone"
                      placeholder="Phone Number"
                      name="phone"
                      onChange={orderDetails}
                    />
                  </div>
                  <div className="col-12">
                    <label for="inputAddress" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="1234 Main St"
                      name="address"
                      onChange={orderDetails}
                    />
                  </div>
                  <div className="col-12">
                    <label for="inputAddress2" className="form-label">
                      Address 2
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress2"
                      placeholder="Apartment, studio, or floor"
                      name="addressDetails"
                      onChange={orderDetails}
                    />
                  </div>
                  <div className="btn-pace-parent">
                    <button className="PlaceOrder-btn" onClick={showGuidlines}>
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="loadingdata mt-5">
                    <CircularProgress />
            
          </div>
        )}
      </>
      {orderconfirmed ? (
       <div className="orderconfirmedmsg">
       <div className="container ">
          <div className="placeParent">
            <div className="orderplaced-logo">GETGAS</div>

            <div className="row">
              <div className="col-md-5">
                <div className="order-child1">
                  <img src="https://i.gifer.com/7efs.gif" alt="" />
                  <h4>Your order has been successfully placed</h4>
                  <p>Rating</p>
                  <button onClick={OrderDone}>Back to Home</button>
                </div>
              </div>

              <div className="col-md-7">
                <div className="bill">
                  <h3>Receipt</h3>
                </div>
                <div className="billdetails">
                  <div className="list-group list-group-flush child3 ">
                  <h5 className="list-group-item">Order Id: {OrderiD.order_id}</h5>
                    <h5 className="list-group-item">Vendor Name: {product.ShopName}</h5>
                    <h5 className="list-group-item">Customer Name: {orderplacing.name}</h5>
                    <h5 className="list-group-item">Cylinder KG:{orderplacing.OrderKG} </h5>
                    <h5 className="list-group-item">Customer Email: {orderplacing.email}</h5>
                    <h5 className="list-group-item">Vendor Phone: {product.VendorPhone}</h5>
                  
                    <b><h4 className="list-group-item"><b>Total Price</b>: {TotalPrice} Rs</h4></b>
                  </div>
                  {/* <button onClick={()=>setGenerateBill(true)}>Generate Bill
                  </button> */}
                  {GenerateBill?
                  <button onClick={()=>setGenerateBill(false)}>Download
                  </button>
                  : ''}
                  
                 
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
      ) : (
        ""
      )}
   {showproduct && (
  Review.map((review, key) => (
    <section className="container mt-4" key={key}>
      <div className="card">
        <div className="card-header">
      
          <Rating name="read-only" value={review.Rating} readOnly />
        </div>
        <div className="card-body">
          <blockquote className=" mb-0">
            <p className="px-2 pb-2">{review.Comment}</p>
            <footer className="blockquote-footer">Name: <cite title="Source Title">{review.Name}</cite></footer>
          </blockquote>
        </div>
      </div>
    </section>
  ))
)}

     
        
      
    </div>

    
  );
};

export default PlaceOrder;
