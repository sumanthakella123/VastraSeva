// frontend/src/components/PersonalInfoForm/PersonalInfoForm.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import API from '../../api/api';
import './PersonalInfoForm.css';

function PersonalInfoForm() {
  const { selectedDeity, selectedDates, setUserInfo, setBookingId, totalPrice } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    gotram: '',
    email: '',
    phone: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedDates.length === 0) {
      alert('Please select at least one date.');
      return;
    }

    setUserInfo(formData);

    const bookingData = {
      ...formData,
      deity: selectedDeity,
      dates: selectedDates.map((date) => date.date),
    };

    API.post('/bookings', bookingData)
      .then((response) => {
        setBookingId(response.data.bookingId);
        navigate('/checkout');
      })
      .catch((error) => {
        console.error(error);
        alert('Error creating booking.');
      });
  };

  return (
    <form className="personal-info-form" onSubmit={handleSubmit}>
      <h2>Enter Your Information</h2>
      <label>
        Name:
        <input type="text" name="name" required value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Gotram:
        <input type="text" name="gotram" required value={formData.gotram} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" required value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Phone:
        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
      </label>
      <button type="submit">Proceed to Checkout</button>
    </form>
  );
}

export default PersonalInfoForm;
