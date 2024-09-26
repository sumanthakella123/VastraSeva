// frontend/src/components/Checkout/Checkout.js

import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import API from '../../api/api';
import './Checkout.css';

function Checkout() {
  const { bookingId, totalPrice } = useContext(AppContext);
  const navigate = useNavigate();

  const handlePayment = () => {
    // For simplicity, we'll simulate payment success
    API.post('/payments', { bookingId, sourceId: 'fake-source-id' })
      .then((response) => {
        navigate('/confirmation');
      })
      .catch((error) => {
        console.error(error);
        alert('Payment failed.');
      });
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <p>Total Amount: ${totalPrice}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Checkout;
