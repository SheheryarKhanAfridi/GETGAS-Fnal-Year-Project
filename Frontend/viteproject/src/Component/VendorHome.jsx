import React from "react";
import "../VendorCards.css";
import VLogo from "../Pictures/logofire.png";
import { Link, useNavigate } from "react-router-dom";
import NAV from "./NAV";
import VendorNav from './VendorNav';

export default function VendorHome() {
  return (
    <div>
     <div className='stickynav-edit'>
      <VendorNav/>
      </div>
      <div className="conatiner">
        <div className="cards-parent">
          <Link className="Linkcards" to='/VendorForm' >
            <div className="card1">
              <div class="card">
                <div className="card-parent">
                  <div className="cardsPic">
                    <img src='https://img.freepik.com/premium-vector/smartphone-mockup-human-hand-buying-goods-store-vector-online-shopping_2375-10.jpg?w=2000' class="card-img-top " alt="..." />
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Add Shop</h5>
                  <p class="card-text">
                    {" "}
                    Add your shop and make a vendor of our website
                  </p>
                  
                </div>
              </div>
            </div>
          </Link>
          <Link className="Linkcards" to='/Shop' >
            <div className="card1">
              <div class="card">
                <div className="card-parent">
                  <div className="cardsPic">
                    <img src='https://cliply.co/wp-content/uploads/2019/03/371903162_BLINKING_EYE_400px.gif' class="card-img-top " alt="..." />
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">View Shop</h5>
                  <p class="card-text">
                    {" "}
                    Add your shop and make a vendor of our website
                  </p>
                  
                </div>
              </div>
            </div>
          </Link>
          <Link className="Linkcards" to='/EditShop' >
            <div className="card1">
              <div class="card">
                <div className="card-parent">
                  <div className="cardsPic">
                    <img src='https://img.freepik.com/premium-vector/smartphone-with-shopping-cart-notification-new-purchase-make-order-online-store-shopping-online-with-phone-flat-outline-ui-ux-element-web-design_662353-756.jpg?w=2000' class="card-img-top " alt="..." />
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Edit or Delete  Shop</h5>
                  <p class="card-text">
                    {" "}
                    Add your shop and make a vendor of our website
                  </p>
                  
                </div>
              </div>
            </div>
          </Link>
          <Link className="Linkcards" to='/vieworder' >
            <div className="card1">
              <div class="card">
                <div className="card-parent">
                  <div className="cardsPic">
                    <img src='https://static.vecteezy.com/system/resources/previews/002/523/963/non_2x/my-orders-cartoon-smartphone-app-screen-vector.jpg' class="card-img-top " alt="..." />
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">View Orders</h5>
                  <p class="card-text">
                    {" "}
                    Add your shop and make a vendor of our website
                  </p>
                  
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
