// frontend/src/components/BookingSummary/BookingSummary.js

import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './BookingSummary.css';

function BookingSummary() {
  const { selectedDates, totalPrice, setTotalPrice } = useContext(AppContext);

  React.useEffect(() => {
    const price = selectedDates.reduce((sum, date) => sum + date.price, 0);
    setTotalPrice(price);
  }, [selectedDates, setTotalPrice]);

  return (
    <div className="booking-summary">
      <h3>Selected Dates</h3>
      <ul>
        {selectedDates.map((date) => (
          <li key={date.date}>{new Date(date.date).toDateString()} - ${date.price}</li>
        ))}
      </ul>
      <p>Total Price: ${totalPrice}</p>
    </div>
  );
}

export default BookingSummary;
