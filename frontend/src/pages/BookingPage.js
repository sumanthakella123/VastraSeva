// frontend/src/pages/BookingPage.js

import React from 'react';
import CalendarComponent from '../components/Calendar/Calendar';
import BookingSummary from '../components/BookingSummary/BookingSummary';
import { useNavigate } from 'react-router-dom';

function BookingPage() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/personal-info');
  };

  return (
    <div className="booking-page">
      <div className="left">
        <CalendarComponent />
      </div>
      <div className="right">
        <BookingSummary />
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default BookingPage;
