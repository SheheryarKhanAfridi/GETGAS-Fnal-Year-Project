import React , {useEffect} from "react";
import Admin from "./Admin";
import "../Admin.css";
import { Link,useNavigate } from "react-router-dom";


export default function AdminHome() {
  const navigate=useNavigate();
  
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
  }, [])
  
  return (
    <div>
      <section>
        <Admin />
      </section>
      <section>
        <div className="container">
          <div className="heroadmin">
            <Link to='/inspection-request-admin' className="text-dcor">
            <div className="card mb-3 m-3" style={{ maxWidth: "500px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="https://img.freepik.com/free-vector/product-quality-control-abstract-concept-illustration-product-safety-standard-customer-feedback-warranty-certificate-production-line-business-success-inspection_335657-3325.jpg"
                    alt=""
                    className="OrderInspectionpic"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Instant / Schedule Request</h5>
                    <p className="m-0">Urgent Request for Inspection</p>
                    <p>Shedule Request for Inspection</p>

                    <p className="card-text">
                      <small className="text-muted">
                        Only Admin can handle this feature
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </Link>
           
            <Link to='/QueryAdmin' className="text-dcor">
            <div className="card cardadmin mb-3 m-3" style={{ maxWidth: "500px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="https://i.pinimg.com/736x/13/7e/23/137e231f82177ed4829e43b9f15281cb.jpg"
                    alt=""
                    className="OrderInspectionpic"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Users Query</h5>
                    <p>Please clarify the queries that users have emailed you about.</p>

                    <p className="card-text">
                      <small className="text-muted">
                        Only Admin can handle this feature
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </Link>
            <Link to='/HnadleUserDetailsAdmin' className="text-dcor">
            <div className="card cardadmin mb-3 m-3" style={{ maxWidth: "500px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                    className="OrderInspectionpic"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Users Details</h5>
                    <p>All registered users</p>

                    <p className="card-text">
                      <small className="text-muted">
                        Only Admin can handle this feature
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </Link>
            
          </div>
        </div>
      </section>
    </div>
  );
}
