import React, {useState,useEffect} from 'react';
import Admin from "./Admin";
import '../Admin.css'
import { Link ,useNavigate} from 'react-router-dom';
import AdminHome from './AdminHome'
import { IoCloseSharp } from "react-icons/io5";

export default function UserDetailsAdmin() {
  const navigate=useNavigate()
    const [data, setdata] = useState()
    const [Vendor, setVendor] = useState()
    const [ShowUser, setShowUser] = useState(false)
    const [showTable, setshowTable] = useState(false)
    const [FindShop, setFindShop] = useState()
    const [ShopData, setShopData] = useState()
    const [showShop, setshowShop] = useState(false)
    const [showOrdersUser, setshowOrdersUser] = useState(false)
    const [showDetails, setshowDetails] = useState(false)
    const [showDetailsd, setshowDetailsd] = useState()
    const [alertSuccess, setalertSuccess] = useState(false)
    const [updateForm, setupdateForm] = useState(false)
    const [delteId, setdelteId] = useState()
    const [showdeletealert, setshowdeletealert] = useState(false)
    const [UpdatedUserData, setUpdatedUserData] = useState({
        'name':'',
        'email':'',
        'phone':'',
    })
    const [gmail, setgmail] = useState(false)
    const [allfields, setallfields] = useState(false)
    const [updatesuccessMsg, setupdatesuccessMsg] = useState(false)
    const getData =async()=>{
        try {
            const res=await fetch('http://localhost:3001/GetAllUser',{
            method:'GET',
            headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
        })
        if(res.status===400){
            console.log('empty response')
        }
        else if(res.status===200){
            const Users=await res.json();
            setdata(Users)
            console.log(Users)
            setshowTable(true)
            getVendor()
        }
        
        } catch (error) {
            console.log('error in try catch')
        }
    }
 const getVendor =async()=>{
        
        try {
            const res=await fetch('http://localhost:3001/GetAllVendor-admin',{
            method:'GET',
            headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
        })
        if(res.status===400){
            console.log('empty Response')
        }
        else if(res.status===200){
            const data=await res.json()
            setVendor(data)
        }
        
        } catch (error) {
            console.log('error in try catch')
        }
    }
    function findGmail(str) {
        const regex = '@gmail.com';
        const matches = str.match(regex);
        if (matches) {
          return matches; // Returns '@gmail.com' if found
        } else {
          return "Not found";
        }
      }
   const UpdateUser=async()=>{
    console.log('hello')
     if(!showDetailsd.name || !showDetailsd.email || !showDetailsd.phone){
        setallfields(true)
     }
     const result = findGmail(showDetailsd.email);
     if(result=='Not found'){
        setgmail(true)
     }
     const res=await fetch('http://localhost:3001/UpdateUserAdminRequest',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body:JSON.stringify(showDetailsd)
    })
    if(res.status===400){
        console.log('user not found')
    }
    else if(res.status===401){
        console.log('user not found in Database')
    }
    else if(res.status===200){
        setupdatesuccessMsg(true)
        setupdateForm(false)
        setshowDetails(false)
        setTimeout(() => {
            setupdatesuccessMsg(false); 
          }, 10000);
        getData();
    }
   }
   const DeleteUser=async()=>{
    const res=await fetch('http://localhost:3001/DeleteUserAdminRequest',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body:JSON.stringify(showDetailsd)
    })
    if(res.status===400){
        console.log('user not found')
    }
    else if(res.status===200){
        console.log('User Deleted')
        setshowDetails(false)
        setalertSuccess(true)
        getData()
    }
   }
const handleupdatedData =(e)=>{
    e.preventDefault();
    setallfields(false)
    setgmail(false)
   const {name,value}=e.target

    setshowDetailsd({
        ...showDetailsd,
        [name]:value
    })
    console.log(showDetailsd)
}
const handleDelete = async () => {
    try {
      const res = await fetch('http://localhost:3001/deleteVendorByAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shopId:delteId }),
      });
      if (res.status === 200) {
        console.log('User deleted successfully');
    setshowdeletealert(false)

        getData()

        // Handle any UI changes or redirection after successful deletion
      } else {
        console.log('Failed to delete shop');
      }
    } catch (error) {
      console.log('Error deleting shop:', error);
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
    getData()

      }
      else if(res.status==400){
        navigate('/')
      }
  }
   
useEffect(() => {
  checkadminIslogin()
  
}, [])




  return (
    <div>
             <section>
            <Admin />
             </section>

             {alertSuccess?<section onClick={()=>{setalertSuccess(false)}}>
                <div className="alert alert-success alert-dismissible fade show showaler-ofsuccess" role="alert">
                    <strong>Successfull</strong>  selected user data successfully remove from the database
                    </div>
                </section>:''}
                {updatesuccessMsg?<section onClick={()=>{setupdatesuccessMsg(false)}}>
                <div className="alert alert-success alert-dismissible fade show showaler-ofsuccess" role="alert">
                    <strong>Successfull</strong>  selected user data successfully Updated
                    </div>
                </section>:''}

             <section className='pb-4'>
                <div className=" admin-btns-ins container" >
                    <button type="button" className="btn btn-outline-primary m-1" onClick={()=>{setShowUser(false)}}>All Users</button>
                    <button type="button" className="btn btn-outline-primary m-1" onClick={()=>{setShowUser(true)}}>All Registered Vendor</button>
                    {/* <button type="button" className="btn btn-outline-primary m-1"  onClick={()=>{getData()}}>Refresh Data</button> */}
                    </div>
             </section>
             <div className="headinginfo">
                    {ShowUser?<h1>Vendor</h1>:<h1>Users Data</h1>}
                </div>
             {showdeletealert? <div className="deletealert alert ">
            <div className='card'>
            <h5 className="card-header">Delete Confirmation</h5>
      <div className="card-body">
        <h5 className="card-title">Are you sure ? </h5>
        <p className="card-text">This action can not be reverse</p>
        <p className=" alert-danger p-2 mt-0">This action can only delete registered Vendor not their registered shops</p>
        <button className='btn btn-primary m-1' onClick={()=>{setshowdeletealert(false)}}>Cancel</button>
        <button className='btn btn-dark m-1' onClick={handleDelete}>Delete</button>
      </div>
            </div>
    </div>:''}
        {showTable?
        <section>
           {ShowUser? <div className="container mt-5">
                <div className="UserDetails">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Email</th>
                        <th scope="col">Delete User</th>
                        <th scope="col">Vendor Shop Details</th>
                        </tr>
                    </thead>
                    {Vendor.map((items,index)=>(
                         <tbody>
                         <tr>
                         <th scope="row">{index+1}</th>
                         <td>{items.name}</td>
                         <td>{items.email}</td>
                         <td>
                            <button className='btn btn-dark' onClick={()=>{setdelteId(items._id);console.log(items._id);setshowdeletealert(true)}}>Delete Vendor</button>
                         </td>
                         {items.ShopStatus==true? <div>
                         <Link to={`/ShopDetailsAdmin?id=${items._id}`}>
                         <button type="button" className="Details-User-Admin"  >Shop Details</button>
                         </Link>

                         </div>: <div>
                         <Link >
                         <button type="button" className="Details-User-Admin2"  >Shop Not Found</button>
                         </Link>

                         </div>}
                         </tr>
                     </tbody>
                    ))}
                   
                 </table>
                 <section>
                    
                 </section>

                </div>
            </div>: <div className="container mt-5">
                <div className="UserDetails">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Manage Data</th>
                        </tr>
                    </thead>
                    {data.map((items,index)=>(
                         <tbody>
                         <tr>
                         <th scope="row">{index+1}</th>
                         <td>{items.name}</td>
                         <td>{items.email}</td>
                         <td>{items.phone}</td>
                                <button type="button" className="Details-User-Admin" onClick={()=>{setshowDetailsd({
                                    'name':items.name,
                                    'email':items.email,
                                    'phone':items.phone
                                }); setshowDetails(true)}}>
                                Update/Delete
                                </button>


                               
                      
                         </tr>
                     </tbody>
                    ))}
                   
                 </table>

                </div>
            </div>}
        </section>
        :<section>
    <div className=" loaderwidth">
  <div className="spinner-border " role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
    </section>}
                        
    {showDetails?<section  className='alet-position'>
                            <div className="alert-parent">
                                <div className="aler-childfordetails">
                                    <div className="alertclose">
                                    <h3>User Details</h3>
                                    <IoCloseSharp className='close-alert'  onClick={()=>{setshowDetails(false)}}/>
                                    </div>
                                    <hr />
                                <div className="input-group mb-3 p-2">
                                        <div className="input-group-text">
                                            <p className='m-0'>Name</p>
                                        </div>
                                        <input type="text" className="form-control" value={showDetailsd.name} />
                                        </div>

                                        <div className="input-group mb-3 p-2">
                                        <div className="input-group-text">
                                             <p className='m-0'>Email</p>    
                                            
                                          </div>
                                        <input type="text" className="form-control" value={showDetailsd.email} />
                                        </div>
                                        <div className="input-group p-2">
                                        <div className="input-group-text">
                                             <p className='m-0'>Contact</p>    
                                            
                                          </div>
                                        <input type="text" className="form-control" value={showDetailsd.phone} />
                                        </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={()=>{setupdateForm(true)}}>Update</button>
                                    <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" >Delete</button>
                                    
                                </div>
                                </div>
                                
                            </div>
                            <section>
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Remove user from Database</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Are you sure to delete this user <b>{showDetailsd.email}</b> ? after remove this user it can not be recover </p>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <div onClick={()=>{setshowDetails(false)}}>
            <button type="button" className="btn btn-dark" data-bs-dismiss="modal" aria-label="Close" onClick={DeleteUser}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
                            </section>
                          {updateForm? <section className='updatedform-parent'>
                          {gmail?<section onClick={()=>{setalertSuccess(false)}}>
                <div className="alert alert-danger alert-dismissible fade show showaler-ofsuccess" role="alert">
                    <strong>Invalid Email</strong>  Please write email with <b>@gmail.com</b>
                    </div>
                </section>:''}
                {allfields?<section onClick={()=>{setalertSuccess(false)}}>
                <div className="alert m-0 alert-danger alert-dismissible fade show showaler-ofsuccess" role="alert">
                    <strong>Empty Fields</strong>  Please fill all the fiedls 
                    </div>
                </section>:''}

                           <section className='updatedForm'>
                            <p>Update User Data</p>
                            
                                <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Name:</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    name='name'
                                    value={showDetailsd.name}
                                    onChange={handleupdatedData}
                                />
                                </div>

                                <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">email:</span>
                                 
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    required
                                    name='email'
                                    value={showDetailsd.email}
                                    onChange={handleupdatedData}

                                />
                                <span className="input-group-text" id="basic-addon2">@gmail.com</span>
                                </div>

                                <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Phone:</span>

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Contact Number"
                                    name='phone'
                                    value={showDetailsd.phone}
                                    onChange={handleupdatedData}
                                />
                                </div>
                                <div className="updateform-btns">
                                <button type="button" className="btn btn-secondary" onClick={()=>{setupdateForm(false)}}>Cancel</button>
                                <button type="button" className="btn btn-dark" onClick={UpdateUser}>Update</button>
                                
                                </div>
                                

                            </section>
                           </section>:''}
                        </section>:''}


    </div>
  )
}
