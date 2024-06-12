import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import '../App.css';
import "../Account.css";
import NAV from "../Component/NAV";
import CircularProgress from '@mui/material/CircularProgress';

export default function Account() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [editform, seteditform] = useState(false);
  const [Datacheck,setDatacheck] = useState(false)
  const [loader, setloader] = useState(true)
  const [editAccountInput,seteditAccountInput]=useState({

  })



  const accountpage = async () => {
    try {
      const accountData = await fetch("http://localhost:3001/account", {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await accountData.json();
      //console.log(data);
      setDetails(data);
      if(details){
        setloader(false)
      }

      if (accountData.status !== 200) {
        const error = new Error("User not Found");
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/Login");
    }
  };
  useEffect(() => {
    accountpage();
  }, []);
  const editprofile = () => {
    if (editform === false) {
      seteditform(true);
    } else {
      seteditform(false);
    }
  };

  const handleEditAccount=(e)=>{

    const {name,value}=e.target;
    setDatacheck(false)
    seteditAccountInput({
      ...editAccountInput,
      [name]:value
    })
  }

  const handleeditFORM=async(e)=>{
    e.preventDefault();
    console.log(editAccountInput)
    
    const res=await fetch('http://localhost:3001/EditAccountDetails',{
      method:"POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body:JSON.stringify(editAccountInput)
    })
    const data=res.json();
    if(res.status===400){
      setDatacheck(true)
     return console.log("Data is empty")
    }
    if(res.status===401){
      alert("Please Login First")
      console.log("User is not Login")
    }
    if(res.status===402){
      console.log("UnAuthorized User")
    }
    if(res.status===403){
      console.log("User data not Found")
    }
    if(res.status===200){
      alert("Profile is update")
      window.location.reload();
    }
    alert("For Better Experience Please Login Again")
    
  }

  return (
    
    <>
    {/* // <div className="container emp-profile">
    //   <form method='GET'>
    //     <div className="row">
    //       <div className="col-md-4 despic">
    //         <img src={des} alt="" className="despic" />
    //       </div>

    //       <div className="col-md-6">
    //         <h5 className='text-center mb-6'><b>Other users cannot see your Details</b></h5>

    //         <ul className="nav nav-tabs" id="myTab" role="tablist">
    //           <li className="nav-item " role="presentation">
    //             <a className="nav-link active timeline" id="home-tab" data-bs-toggle="tab" href="#home" role="tab">About</a>
    //           </li>
    //           <li className="nav-item" role="presentation">
    //             <a className="nav-link timeline" id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab">Hello</a>
    //           </li>
    //         </ul>
    //       </div>
    //       <div className="col-md-2">
    //         <button type="submit" className="edit" name="Add">Edit your <b>Profile</b></button>
    //       </div>
    //     </div>
    //     <div className="row">
    //       <div className="col-md-12">
    //         <div className="tab-content" id="myTabContent">
    //           <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
    //             <div className="d-flex justify-content-between flex-wrap">
    //               <div className="">
    //                 <label>User ID</label>
    //               </div>
    //               <div className="">
    //               <h6>{details._id}</h6>

    //               </div>
    //             </div>
    //             <div className="d-flex justify-content-between flex-wrap">
    //               <div className="">
    //                 <label>user Name</label>
    //               </div>
    //               <div className="">
    //                 <h4>{details.name}</h4>
    //               </div>
    //             </div>
    //             <div className="d-flex justify-content-between flex-wrap">
    //               <div className="">
    //                 <label>User email</label>
    //               </div>
    //               <div className="">
    //               <h6>{details.email}</h6>
    //               </div>
    //             </div>
    //             <div className="d-flex justify-content-between flex-wrap">
    //               <div className="">
    //                 <label>Phone Number</label>
    //               </div>
    //               <div className="">
    //               <h6>{details.phone}</h6>

    //               </div>
    //             </div>
    //             <div className="d-flex justify-content-between flex-wrap">
    //               <div className="">
    //                 <label>Password</label>
    //               </div>
    //               <div className="">
    //               <h6>{details.password}</h6>

    //               </div>
    //             </div>
    //           </div>

    //           <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
    //             <div className="d-flex justify-content-evenly flex-wrap">
    //               <div className="">
    //                 <label>xyz</label>
    //               </div>
    //               <div className="">
    //                 <p>12345</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </form>

    // </div> */}
    <div className='stickynav-edit'>
      <NAV/>
      </div>
  
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-5 formright">
              <h1>Account Details</h1>
              <div>
                <p>for Edit your Account details</p>
                <button className="editButton" onClick={editprofile}>
                  Edit Account{" "}
                </button>
              </div>
            </div>
            <div className="col-md-7 formleft">
              <div className="form-parent">
              {loader? <CircularProgress />: <div className="form-child">
                  <form method="">
                    <div>
                      <label className="label">Name</label>
                      <input
                        type="text"
                        className="inputfields"
                        value={details.name}
                      />
                    </div>
                    <div>
                      <label className="label">email</label>
                      <input
                        type="text"
                        className="inputfields"
                        value={details.email}
                      />
                    </div>
                    <div>
                      <label className="label">phone</label>
                      <input
                        type="text"
                        className="inputfields"
                        value={details.phone}
                      />
                    </div>
                  </form>
                
                </div>}
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {editform ? (
        <div className="edit-profile">
          {Datacheck?<div class="alert alert-warning" role="alert">
 Please Fill all the Fields
</div>:''}
          <button className="editButton" onClick={editprofile} >
                  Back
                </button>
          <form>
          
            <div class="mb-3">
              
              <div id="emailHelp" class="form-text">
                We'll never share your Information with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                name="Name"
                onChange={handleEditAccount}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Phone
              </label>
              <input
                type="number"
                class="form-control"
                name="Phone"
                onChange={handleEditAccount}
              />
            </div>
            
            <button type="submit" class="btn btn-primary" onClick={handleeditFORM}>
              Submit
            </button>
          </form>{" "}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
