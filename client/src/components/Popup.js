import React from 'react';

import { formatNumber } from '../utils';

const Popup = ({ feature }) => {
  const { id, COUNTY: county } = feature.properties;
  const { cases, deaths } = feature.state;

  return (
    <div id={`popup-${id}`}>
      <h3>{county}</h3>
      {typeof cases === 'number' && (
        <div>
          <b>Cases:</b> {formatNumber(cases)}
        </div>
      )}
      {typeof deaths === 'number' && (
        <div>
          <b>Deaths:</b> {formatNumber(deaths)}
        </div>
      )}
    </div>
  );
};

export default Popup;
