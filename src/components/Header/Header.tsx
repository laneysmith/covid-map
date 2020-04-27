import React from 'react';

import { Variable } from '../../types';
import './_header.css';

interface IHeader {
  selectedVariable: Variable;
  selectedDate?: string;
  error: boolean;
}

const Header: React.SFC<IHeader> = ({ selectedVariable, selectedDate, error }) => (
  <header>
    {error && <div className="error-message">Something went wrong. ¯\_(ツ)_/¯</div>}
    <h1>US Covid-19 {selectedVariable}</h1>
    {selectedDate && <h2>{selectedDate}</h2>}
  </header>
);

export default Header;
