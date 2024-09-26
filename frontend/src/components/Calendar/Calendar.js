// frontend/src/components/Calendar/Calendar.js

import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import API from '../../api/api';
import { AppContext } from '../../context/AppContext';
import './Calendar.css';

function CalendarComponent() {
  const { selectedDeity, selectedDates, setSelectedDates } = useContext(AppContext);
  const [dateData, setDateData] = useState([]);

  useEffect(() => {
    if (selectedDeity) {
      API.get(`/dates/${selectedDeity}`).then((response) => {
        setDateData(response.data);
      });
    }
  }, [selectedDeity]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const dateInfo = dateData.find((d) => d.date.split('T')[0] === dateString);

      if (dateInfo) {
        switch (dateInfo.status) {
          case 'Available':
            return 'available';
          case 'Booked':
            return 'booked';
          case 'Special':
            return 'special';
          case 'Blocked':
            return 'blocked';
          default:
            return '';
        }
      }
    }
  };

  const onDateChange = (date) => {
    const dateString = date.toISOString().split('T')[0];
    const dateInfo = dateData.find((d) => d.date.split('T')[0] === dateString);

    if (dateInfo && dateInfo.status === 'Available') {
      if (selectedDates.length < 3) {
        setSelectedDates([...selectedDates, dateInfo]);
      } else {
        alert('You can only select up to 3 dates.');
      }
    } else {
      alert('Selected date is not available.');
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        onClickDay={onDateChange}
        tileClassName={tileClassName}
      />
    </div>
  );
}

export default CalendarComponent;
