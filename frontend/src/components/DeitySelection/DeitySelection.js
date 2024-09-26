// frontend/src/components/DeitySelection/DeitySelection.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import './DeitySelection.css';

function DeitySelection() {
  const { setSelectedDeity } = useContext(AppContext);
  const navigate = useNavigate();

  const deities = ['Deity1', 'Deity2', 'Deity3'];

  const handleSelect = (deity) => {
    setSelectedDeity(deity);
    navigate('/booking');
  };

  return (
    <div className="deity-selection">
      <h1>Select a Deity</h1>
      <ul>
        {deities.map((deity) => (
          <li key={deity} onClick={() => handleSelect(deity)}>
            {deity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeitySelection;
