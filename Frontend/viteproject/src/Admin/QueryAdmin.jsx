import React, {useState,useEffect} from 'react';
import Admin from "./Admin";
import '../Admin.css'
import { MdCancel } from "react-icons/md";
import { Link ,useNavigate} from 'react-router-dom';

export default function QueryAdmin() {
    const navigate=useNavigate();
    const [Query, setQuery] = useState()
    const [showQuery, setshowQuery] = useState(false)
    const [showemailss, setshowemailss] = useState(false)
    const [useremail, setuseremail] = useState()
    const GetData=async()=>{
        const res=await fetch('http://localhost:3001/QueryData',{
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
            const data=await res.json()
            setQuery(data)
            setshowQuery(true)
            console.log(Query,'all messages')
        }
    }
    const handleAdmininputs=(e)=>{
        const {name ,value} = e.target;
        setuseremail({
            ...useremail,
            [name]:value
        })
        console.log(useremail)
    }
    const sendAdminRespnse=async()=>{
        console.log(useremail.Details)
        const {ADMINsubject,Details}=useremail
        if(!ADMINsubject || !Details){
            return alert('Fill all the fields')
        }
        
        try {
            const res=await fetch('http://localhost:3001/sendResponse',{
                method:'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(useremail)
            })
            if(res.status === 403){
                alert('Response error')
            }
            else if(res.status === 200){
                alert('Response successfully send')
                 GetData()
                 setshowemailss(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
useEffect(() => {
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
            GetData()
          }
          else if(res.status==400){
            navigate('/')
          }
      }
      checkadminIslogin()
}, [])

  return (
    <div>
    <section>
        <Admin />
    </section>
    
    <section>
        <div className="container">
        <section className='card-parent-querys'>
    {showQuery ? (
        <div className="query-card  mt-0">
            {Query.map((items, index) => (
                <div key={index}>
                    <div className="query-card mt-0 pt-0">
                        <div className="card-child-1">
                        <section>
                        {/* Check if there are multiple emails */}
                        {items.messages.length > 1 ? (
                            <div className="user-input">
                                <p>Name: {items.name}</p>
                                <p>Contact: {items.phone}</p>
                                <p>User email: {items.email}</p>
                                <p className='alert-danger p-1'>This user has send multiple queries.</p>
                            </div>
                        ) : (
                            items.messages.map((msg, idx) => (
                                <div key={idx} className="user-input">
                                    <label>Subject</label>
                                    <input type="text" value={msg.subject} readOnly />
                                    <label>Query no: {idx + 1}</label>
                                    <input type="text" value={msg.Message} readOnly />
                                </div>
                            ))
                        )}
                    </section>
                            
                            <div className='btns-query'>
                                <button type="button" className="response-btn" onClick={()=>{setshowemailss(true);setuseremail(items)}}>
                                    Send Response as a ADMIN
                                </button>
                            </div>
                           
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    ) : (
        <section>
            <div className=" loaderwidth">
                <div className="spinner-border " role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </section>
    )}
</section>


        </div>
    </section>

    {showemailss? <section className='emailparent'>
<section className='querydetailsxyz'>
    
    <div class="container ">
    <div className='close-icon' onClick={()=>{setshowemailss(false)}}>
    <MdCancel  />
     </div>
         <div className="row">
             <div className="col-md-6 manageallmsgs">
                 <h1 className='queriestag'>All Queries</h1>
                 {useremail&& useremail.messages.map((items,index)=>(
                    <div className='parent-intputss'>
                    <div className="inputs">
                        <label >Subject</label>
                        <input type="text" className='subjectss' value={items.subject}/>
                    </div>
                    <div className='inputs'>
                    <label >Query</label>
                        <textarea className='subjectss' value={items.Message}></textarea>
                    </div>
                    </div>
                 ))}
                 
             </div>
             <div className="col-md-6 responsesection">
                 <h5>Send Response as a Admin</h5>
                 <div className="adminhandle">
                    <div className='subjectsadmin'>
                    <label >Subject</label>
                     <input type="text" name='ADMINsubject' onChange={handleAdmininputs} />
                    </div>
                 
                     <div className='textareaset'>
                     <label >Enter Response</label>
                     <textarea name='Details' onChange={handleAdmininputs} placeholder={`email will be send to this address ${useremail.email}`}></textarea>
                     </div>
                     <button className='btn response-btn' onClick={sendAdminRespnse}> Send response</button>
                 </div>
             </div>
         </div>
     </div>
</section>
</section>:''}
    </div>
  )
}
