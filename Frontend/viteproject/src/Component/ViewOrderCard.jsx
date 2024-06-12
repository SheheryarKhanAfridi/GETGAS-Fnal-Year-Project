import React ,{useState} from "react";
import '../Order.css'
export default function ViewOrderCard(props) {
  return (
    <div>
        <div className="container card-height">
          <div className="row">
            <div class="card text-dark bg-light mb-3 view-order-card" >
              <div class="card-header">Total Amount: {props.TotalAmount} </div>
              <div class="card-body">
                <h6 class="card-title">Customer Name: {props.name} </h6>
                <p class="card-text m-0">At Price :{props.price}  </p>
                <p class="card-text m-0">Phone :{props.phone}  </p>
                <p className="card-text m-0">Contact: {props.contact}  </p>
                <p className="card-text m-0">Address: <b>{props.address} </b></p>
                <p className="card-text m-0">Detail: <b>{props.Daddress} </b></p>
              </div>
              <button className="mb-2 btn btn-light">Order Completed</button>
            </div>
          </div>
        </div>
     
    </div>
  );
}
