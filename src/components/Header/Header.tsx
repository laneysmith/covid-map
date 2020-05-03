import React, { HTMLAttributes } from 'react';

import { FetchStatus } from '../../hooks/useFetchDataReducer';
import { Variable } from '../../types';
import './_header.css';

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  selectedVariable: Variable;
  selectedDate?: string;
  status?: FetchStatus;
}

const Header: React.SFC<HeaderProps> = ({ selectedVariable, selectedDate, status }) => (
  <header>
    {status === FetchStatus.FAILED && <div className="error-message">Something went wrong.</div>}
    <h1>US Covid-19 {selectedVariable}</h1>
    {selectedDate && <h2>{selectedDate}</h2>}
  </header>
);

export default Header;
