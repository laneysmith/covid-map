import React from 'react';

import { Variable } from '../../types';
import './_header.css';

interface IHeader {
  selectedVariable: Variable;
  selectedDate?: string;
}

const Header: React.SFC<IHeader> = ({ selectedVariable, selectedDate }) => (
  <header>
    <h1>US Covid-19 {selectedVariable}</h1>
    <h2>{selectedDate}</h2>
  </header>
);

export default Header;
