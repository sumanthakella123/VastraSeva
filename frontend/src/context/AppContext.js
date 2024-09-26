// frontend/src/context/AppContext.js

import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedDeity, setSelectedDeity] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [bookingId, setBookingId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <AppContext.Provider
      value={{
        selectedDeity,
        setSelectedDeity,
        selectedDates,
        setSelectedDates,
        userInfo,
        setUserInfo,
        bookingId,
        setBookingId,
        totalPrice,
        setTotalPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
