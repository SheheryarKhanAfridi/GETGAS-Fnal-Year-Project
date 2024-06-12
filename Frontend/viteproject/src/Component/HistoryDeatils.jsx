import NAV from "../Component/NAV";
import React , {useState,useEffect} from 'react'
import "../Review.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

export default function HistoryDeatils() {
  const query = new URLSearchParams(location.search);
  // location.search contain query string in the url
  const id = query.get("id");
  const [Order, setOrder] = useState()
  const [loader, setloader] = useState(true);
  const [Comment, setComment] = useState()
  const [stars, setstars] = useState(null)
  const [Identity, setIdentity] = useState(false)
  const [ReviewData, setReviewData] = useState()
  const [Name, setName] = useState()
  const [showAlert, setshowAlert] = useState(false)
  const [secondAlert, setsecondAlert] = useState(false)
  const [checkingFields, setcheckingFields] = useState(false)
  const getShopDetails =async()=>{
    const res=await fetch('http://localhost:3001/historyDetails',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify({id}) 
    })
    if(res.status===400){
      console.log('id not found')
    }
    else if(res.status===401){
      console.log('shop not found')
    }
    else if(res.status===200){
      const data =await res.json();
      setOrder(data)
      console.log(Order)
      setloader(false)
    }
  }
  const HandleReview =(e)=>{
    e.preventDefault();
    console.log(Identity)
    if(!stars || !Comment){
     return setcheckingFields(true)
    }
    setReviewData({
      'Rating':stars,
      'Comment':Comment,
      'Name':`${Identity?'Anonymous':Order.Name}`,
      'ShopId':Order.ShopId,
      'UserId':Order.User_id,
      'OrderId':Order._id
    })
   
  }

  const ReviewForm =async()=>{
    console.log(ReviewData,'last api')
    const res=await fetch('http://localhost:3001/ReviewData',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(ReviewData)
    })
    if(res.status===400){
      console.log('data not found')
    }
    else if(res.status===401){
      console.log('Shop not found')
      alert('This shop is deleted from our platfom due to some reasons, You can place order to another Vendor THANKS')
    }
    else if(res.status===403){
      setsecondAlert(true)
    }
    else if(res.status==200){
      setshowAlert(true)
    }
    
  }
  

  
  useEffect(() => {
    getShopDetails()
    if(ReviewData){
      ReviewForm()
    }
    console.log(ReviewData)
  }, [ReviewData])
  
  return (

    <div>
        <div className='stickynav-edit'>
      <NAV/>
      </div>
      {loader?(<section>
        <div className="loader">
        <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
       </div>
      </section>):( <section className="card-back ">
        
        <div className="row ">
          
        <div className="col-md-3">
          <div style={{ marginTop: "50px", marginLeft: "10px" }} className="text-center">
         
            <img src="https://cdn2.iconfinder.com/data/icons/feedback-and-testimonials-6/85/review_feedback_message_comment_write-512.png" className="review-icon" alt="" />
            <h3 className="mt-3 text-white">Review</h3>

          </div>
          {checkingFields? <Alert severity="error" className="fade-in" onClick={()=>{setcheckingFields(false)}}>Fill all the fields</Alert>:''}
          {secondAlert?( <Alert severity="error" className="fade-in">You can not give second review on the same Shop</Alert>):''}
          {showAlert?
          <Alert severity="success" className="fade-in">Sucessful. Thank you for your Review</Alert>
      
          :(
            <div> 
              <div className="rating-wrapper">
            
            {/* Star 5 */}
            <input type="radio" id="5-star-rating" name="star-rating" value="5" onClick={(e)=>{console.log(stars);setstars(e.target.value); console.log(stars)}} />
            <label htmlFor="5-star-rating" className="star-rating">
              <i className="fas fa-star d-inline-block"></i>
            </label>
            {/* Star 4 */}
            <input type="radio" id="4-star-rating" name="star-rating" value="4" onClick={(e)=>{setstars(e.target.value); console.log(stars)}}/>
            <label htmlFor="4-star-rating" className="star-rating star">
              <i className="fas fa-star d-inline-block"></i>
            </label>
            {/* Star 3 */}
            <input type="radio" id="3-star-rating" name="star-rating" value="3" onClick={(e)=>{setstars(e.target.value); console.log(stars)}}/>
            <label htmlFor="3-star-rating" className="star-rating star">
              <i className="fas fa-star d-inline-block"></i>
            </label>
            {/* Star 2 */}
            <input type="radio" id="2-star-rating" name="star-rating" value="2" onClick={(e)=>{setstars(e.target.value); console.log(stars)}}/>
            <label htmlFor="2-star-rating" className="star-rating star">
              <i className="fas fa-star d-inline-block"></i>
            </label>
            {/* Star 1 */}
            <input type="radio" id="1-star-rating" name="star-rating" value="1" onClick={(e)=>{setstars(e.target.value); console.log(stars)}}/>
            <label htmlFor="1-star-rating" className="star-rating star">
              <i className="fas fa-star d-inline-block"></i>
            </label>
          </div>

          <div className="txt-area">
            <textarea name="" id="" cols="35" rows="2" className="review-text" placeholder="Write a comment" onChange={(e)=>{setComment(e.target.value) ;console.log(Comment)}}></textarea>
          </div>
          <div className="Check-box-identity">
              <input type="checkbox" className="Identity" onClick={()=>{if(Identity===false){setIdentity(true)} else{setIdentity(false)}}} />
              <p>Keep My Identity Hidden</p>
          </div>

        <div className="text-center">
          <button type="submit" className=" back-button m-1" onClick={HandleReview}>
            Submit Review
          </button>
        </div>
               </div>
          )}          
          
          
          
          
        </div>
        <div className="col-md-9 justify-content-center">
          <div className="card card-custom pb-4">
            <div className="card-body mt-0 mx-5">
              <div className="text-center mb-3 pb-2 mt-3">
                <h4 style={{ color: "#495057" }}>Complete Order Details</h4>
              </div>
              <form className="mb-0">
             <div className="form-child-1 ">
             <h5>Order Id: {Order.Order_Id}</h5>
              <p >Date:{Order.Order_date} </p>
             </div>
             <hr />
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <input type="text" id="form9Example1" value={Order.Name} className="form-control input-custom" />
                      <label className="form-label" htmlFor="form9Example1">
                        User name
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input type="text" id="form9Example2" value={Order.ShopName} className="form-control input-custom" />
                      <label className="form-label" htmlFor="form9Example2">
                        Shop name
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="row mb-4">
                 
                  <div className="col">
                    <div className="form-outline">
                      <input type="email" id="typeEmail" value={Order.CustomerPhone} className="form-control input-custom" />
                      <label className="form-label" htmlFor="typeEmail">
                       User Contact
                      </label>
                      
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input type="email" id="typeEmail" value={Order.CustomerEmail} className="form-control input-custom" />
                      <label className="form-label" htmlFor="typeEmail">
                        User Email
                      </label>
                      
                    </div>
                  </div>
                  <div className="">
                    <div className="form-outline">
                      <input type="email" id="typeEmail" value={Order.CustomerAddress} className="form-control input-custom" />
                      <label className="form-label" htmlFor="typeEmail">
                       Address
                      </label>
                      
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-3">
                    <div className="form-outline">
                      <input type="text" id="form9Example3" value={Order.KG} className="form-control input-custom" />
                      <label className="form-label" htmlFor="form9Example3">
                        KG
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-outline">
                      <input type="text" id="form9Example4" value={Order.Price} className="form-control input-custom" />
                      <label className="form-label" htmlFor="form9Example4">
                        Price per KG
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline">
                      <input type="text" id="form9Example6" value={Order.Bill} className="form-control input-custom" />
                      <label className="form-label" htmlFor="form9Example6">
                        Total Price
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        </section>)}
       

      {/* <section>
      <div className="container-wrapper">
      <div className="container d-flex align-items-center justify-content-center">
        <div className="row justify-content-center">
          <div className="rating-wrapper">
            <input type="radio" id="5-star-rating" name="star-rating" value="5" />
            <label htmlFor="5-star-rating" className="star-rating">
              <i className="fas fa-star d-inline-block"></i>
            </label>
            <input type="radio" id="4-star-rating" name="star-rating" value="4" />
            <label htmlFor="4-star-rating" className="star-rating star">
              <i className="fas fa-star d-inline-block"></i>
            </label>
            <input type="radio" id="3-star-rating" name="star-rating" value="3" />
            <label htmlFor="3-star-rating" className="star-rating star">
              <i className="fas fa-star d-inline-block"></i>
            </label>
            <input type="radio" id="2-star-rating" name="star-rating" value="2" />
            <label htmlFor="2-star-rating" className="star-rating star">
              <i className="fas fa-star d-inline-block"></i>
            </label>
            <input type="radio" id="1-star-rating" name="star-rating" value="1" />
            <label htmlFor="1-star-rating" className="star-rating star">
              <i className="fas fa-star d-inline-block"></i>
            </label>
          </div>
        </div>
      </div>
    </div>
      </section> */}
      
    </div>
  )
}
