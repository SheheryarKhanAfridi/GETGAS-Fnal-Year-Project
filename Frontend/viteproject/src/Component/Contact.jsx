import React ,{useEffect,useState} from "react";
import '../App.css' 
import { useNavigate } from 'react-router-dom';
import NAV from "../Component/NAV";


export default function Contact() {
  const navigate=useNavigate();
  const [vendor,setvendor]=useState(false);

  const [details,setDetails]=useState({
    name:"",
    email:"",
    phone:"",
    subject:"",
    Message:""
  })
 
const Contactpage = async () => {
  try {
    const res = await fetch('http://localhost:3001/contactData', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        "Content-Type": 'application/json'
      },
      credentials:'include'
    });

    const data = await res.json();
    setDetails({
      ...details,
      name:data.name,
      phone:data.phone,
      email:data.email
    })
    if (res.status !== 200) {
      const error = new Error('User not Found');
      if(vendor===true){
        console.log('vendor found')
      }
      throw error;
    }
  } catch (error) {
    console.log(error);
  }
};
const ContactpageV = async () => {
  try {
    const res = await fetch('http://localhost:3001/contactDataV', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        "Content-Type": 'application/json'
      },
      credentials:'include'
    });
    const data = await res.json();
   if(res.status===250){
    setDetails({
      ...details,
      name:data.name,
      phone:data.phone,
      email:data.email
    })
    setvendor(true)
   }
   else if (res.status !== 250) {
    setvendor(false)
      const error = new Error('Vendor not Found');
      throw error;
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    Contactpage();
    ContactpageV();
  }, []);

  const handleInputs=(e)=>{
    const {name,value}=e.target;
    setDetails({
      ...details,
      [name]:value
    })
  }

  const sendContactData=async(e)=>{
    e.preventDefault();
    
    try {
      
      const res = await fetch('http://localhost:3001/contact',{
        method:'POST',
        headers: {
              accept: 'application/json',
              "Content-Type": 'application/json'
            },
            credentials:"include",
            body:JSON.stringify(details)  
      })
      const data= await res.json();
      if(!data){
        console.log("msg not send")
      }
      else if (res.status===400){
        alert("please fill all the fields")
      }
      else if(res.status===404){
        alert("you cant not send Second Msg With in 24 hours")
        navigate('/')
       
      }
      else if(res.status===401){
        alert('unauthorized User')
      }
      else if(res.status===200){
        alert('message send')
        navigate('/')
        const mail = await fetch('http://localhost:3001/sendingMail', {
          method: 'POST',
          headers: {
          accept: 'application/json',
          "Content-Type": 'application/json',
        },
        credentials:'include',
        body:JSON.stringify(details)
      });
      }
      else if(res.status===402){
        console.log("empty Data")
      }
    } catch (error) {
      console.log(error)
    }
    
    
  }

  return (
    <div>
      <div className='stickynav-edit'>
      <NAV/>
      </div>
      <div className="container containercontactus">
        <div className="row justify-content-center ">
          <div className="col-lg-10">
            <div className="wrapper">
              <div className="row no-gutters">
                <div className="col-md-6 d-flex align-items-stretch contactusClient">
                  <div className="contact-wrap w-100 p-md-5 p-4 py-5">
                    <h3 className="mb-4 ">Write us</h3>
                    {/* <div id="form-message-success" className="mb-4">
                      Your message was sent, thank you!
                    </div> */}
                    <form
                      method="POST"
                      id="contactForm"
                      name="contactForm"
                      className="contactForm"
                      noValidate="novalidate"
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group1">
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              id="name"
                              value={details.name}
                              onChange={handleInputs}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group1">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              value={details.email}
                              onChange={handleInputs}
                            />
                          </div>
                          <div className="form-group1">
                            <input
                              type="number"
                              className="form-control"
                              name="phone"
                              id="phone"
                              value={details.phone}
                              onChange={handleInputs}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group1">
                            <input
                              type="text"
                              className="form-control bg-light mb-2"
                              name="subject"
                              id="subject"
                              placeholder="Subject"
                              onChange={handleInputs}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group1">
                            <textarea
                              name="Message"
                              className="form-control bg-light"
                              id="message"
                              cols="30"
                              rows="6"
                              placeholder="Message"
                              onChange={handleInputs}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group ">
                            <input
                              type="submit"
                              value="Send Message"
                              className="btn btn-primary"
                              onClick={sendContactData}
                            />
                            <div className="submitting"></div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-stretch contactusdefault">
                  <div className="info-wrap w-100 p-md-5 p-4 py-5 img">
                    <h3>Contact information</h3>
                    <p className="mb-4">
                      <span className="contact-firstpara">We're open for any suggestion or just to have a chat</span>
                    </p>
                    <div className="dbox w-100 d-flex align-items-start margin-contact-details">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-map-marker addressfont"></span>
                      </div>
                      <div className="text pl-3 Caddress">
                        <p>
                          <span>Address:</span> Szabist 100 Campus Cliston Block 5
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center margin-contact-details">
                      <div className="icon d-flex align-items-center justify-content-center ">
                        <span className="fa fa-phone phonefont"></span>
                      </div>
                      <div className="text pl-3 Cphone">
                        <p>
                          <span>Phone:</span>{" "}
                          <a href="tel://1234567920">090878601</a>
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-100 d-flex align-items-center margin-contact-details">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-paper-plane emailfont"></span>
                      </div>
                      <div className="text pl-3 Cemail">
                        <p>
                          <span>Email:</span>{" "}
                          <a href="#">
                          bscs2012185@szabist.pk
                          </a>
                        </p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
