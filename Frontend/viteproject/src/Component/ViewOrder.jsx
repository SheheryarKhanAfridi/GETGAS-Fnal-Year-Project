import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import VendorNav from './VendorNav';
import '../Order.css';
import { Modal, Button } from 'react-bootstrap';

export default function ViewOrder() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:3001/getorderforvendor', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      if (res.status === 401) {
        alert('Please Login First');
        navigate('/vendorLoginPAGE');
      } else if (res.status === 402) {
        alert('Unauthorized User');
      } else if (res.status === 403) {
        alert('Vendor Data not found');
      } else if (res.status === 200) {
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleCancelOrderReq = async (order) => {
    const { Order_Id } = order;
    if (!Order_Id) {
      return alert('Order Id not found');
    }
    const res = await fetch('http://localhost:3001/CancelOrderReq', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ Order_Id })
    });
    if (res.status === 200) {
      setShowModal(false);
      fetchOrders();
    }
  };

  const handleAcceptReq = async (order) => {
    const { Order_Id } = order;
    if (!Order_Id) {
      return alert('Order Id not found');
    }
    const res = await fetch('http://localhost:3001/AcceptOrderReq', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ Order_Id })
    });
    if (res.status === 200) {
      setShowModal(false);
      fetchOrders();
    }
  };

  const handleViewDetails = (order) => {
    setOrderDetails(order);
    setShowModal(true);
  };

  const handleDeliverReq = async (orderDetails) => {
    const res = await fetch('http://localhost:3001/DeliveredUpdate', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ orderDetails })
    });
    if (res.status === 400) {
      alert('Empty response');
    } else if (res.status === 200) {
      setShowModal(false);
      fetchOrders();
    }
  };

  const handleDeleteOrder = async (order) => {
    const { Order_Id } = order;
    if (!Order_Id) {
      return alert('Order Id not found');
    }
    const res = await fetch('http://localhost:3001/DeleteOrderReq', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ Order_Id })
    });
    if (res.status === 200) {
      setShowModal(false);
      fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <div className='stickynav-edit'>
        <VendorNav />
      </div>

      <div className="container mt-3">
        <Link to="/VendorHome" className="btn btn-primary">
          Home
        </Link>
      </div>

      <div className='chekkksz'>
        <div className="container mt-5">
          <div className='OrdersView-display'>
            <table className="table container">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Total KG</th>
                  <th scope="col">Per KG</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">Delivery Status</th>
                  <th scope="col">Accept Order</th>
                  <th scope="col">Cancel Order</th>
                  <th scope="col">View Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{order.Name}</td>
                      <td>{order.AddressDetails}</td>
                      <td>{order.KG}</td>
                      <td>{order.Price}</td>
                      <td>
                        {order.status === 0 && <div className='alert-danger '>Pending</div>}
                        {order.status === 3 && <div className='alert-warning '>Cancel by User</div>}
                        {order.status === 1 && <div className='alert-success '>Approved</div>}
                        {order.status === 2 && <div className='alert-primary '>Cancel by Vendor</div>}
                        {order.status === 4 && <div className='alert-primary '>Delivered</div>}
                      </td>
                      <td>
                        {order.status === 3 || order.status === 2 ? <div className='alert-success text-center'>Order Cancel</div> : ''}
                        {order.status === 1 || order.status === 0 ? <div className='btn-danger '>Not Delivered</div> : ''}
                        {order.status === 4 ? <div className='btn-success '>Delivered</div> : ''}
                      </td>
                      <td>
                        {order.status === 0 ?
                          <button className='AcceptOrder text-center' onClick={() => { handleAcceptReq(order) }}>Accept</button>
                          : ''}
                        {order.status === 1 ? <div className='text-center orderAlreadyaccepted'>Order Accepted</div> : ''}
                        {order.status === 2 ? <div className='text-center orderAlreadyaccepted'>Cancel by Vendor</div> : ''}
                        {order.status === 3 ? <div className='text-center orderAlreadyaccepted'>Canceled by User</div> : ''}
                        {order.status === 4 ? <div className='text-center orderAlreadyaccepted'>Delivered</div> : ''}
                      </td>
                      <td>
                        {order.status === 0 ?
                          <button className='AcceptOrder' onClick={() => { handleCancelOrderReq(order) }}>Cancel</button>
                          : <div className='text-center orderAlreadyaccepted'>Disable</div>
                        }
                      </td>
                      <td>
                        <button className='btn btn-dark' onClick={() => handleViewDetails(order)}>Edit / View Details</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className='zeroOrder'>
                    <h1>Zero Orders</h1>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton />
        <div className='model-delivery-parent container'>
          <Modal.Title>Order Details</Modal.Title>
          {orderDetails && (
            <div>
              {orderDetails.status === 1 ?
                <button className='btn btn-dark' onClick={() => { handleDeliverReq(orderDetails) }}>Order Delivered</button>
                : ''}
            </div>
          )}
        </div>

        <Modal.Body>
          {orderDetails && (
            <div className='specificorder'>
              <p><h4>Status: <strong>{orderDetails.status === 0 ? 'Pending' : ''} {orderDetails.status === 1 ? 'Approved' : ''} {orderDetails.status === 2 ? 'Cancel by vendor' : ''}
                {orderDetails.status === 3 ? 'Cancel by user' : ''}{orderDetails.status === 4 ? 'Delivered' : ''}
              </strong></h4></p>
              <p><strong>Name:</strong> {orderDetails.Name}</p>
              <p><strong>Address:</strong> {orderDetails.AddressDetails}</p>
              <p><strong>Total KG:</strong> {orderDetails.KG}</p>
              <p><strong>Price per KG:</strong> {orderDetails.Price}</p>
              <p><strong>Delivery Status:</strong> {orderDetails.status === 4 ? "Delivered" : "Not Delivered"}</p>
              <p><strong>Customer Email:</strong> {orderDetails.CustomerEmail}</p>
              <p><strong>Customer Phone:</strong> {orderDetails.CustomerPhone}</p>
              <p><strong>Customer Address:</strong> {orderDetails.CustomerAddress}</p>
              <p><strong>Bill:</strong> {orderDetails.Bill}</p>
              <p><strong>Order ID:</strong> {orderDetails.Order_Id}</p>
              <p><strong>Order Date:</strong> {new Date(orderDetails.Order_date).toLocaleDateString()}</p>
              <p><strong>Shop Name:</strong> {orderDetails.ShopName}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {orderDetails && (
            <div>
              {orderDetails.status === 2 || orderDetails.status === 3 ? 
                <Button variant="dark" onClick={() => handleDeleteOrder(orderDetails)}>
                  Delete
                </Button> 
                : ''}
            </div>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
