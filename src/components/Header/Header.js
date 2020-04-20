import React from 'react';

import './_header.css';

const Header = ({ selectedVariable, selectedDate }) => (
  <header>
    <h1>US Covid-19 {selectedVariable}</h1>
    <h2>{selectedDate}</h2>
  </header>
);

export default Header;
