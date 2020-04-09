import React from 'react';

import { formatNumber } from '../../utils';
import './_popup-styles.css';

const Popup = ({ feature }) => {
  const { id, COUNTY: county } = feature.properties;
  const { cases, deaths } = feature.state;
  const hasCasesData = typeof cases === 'number';
  const hasDeathsData = typeof deaths === 'number';

  return (
    <div id={`popup-${id}`}>
      <h3>{county}</h3>
      {hasCasesData && (
        <div>
          <b>Cases:</b> {formatNumber(cases)}
        </div>
      )}
      {hasDeathsData && (
        <div>
          <b>Deaths:</b> {formatNumber(deaths)}
        </div>
      )}
      {!hasCasesData && !hasDeathsData && (
        <div>
          <i>No data for this county.</i>
        </div>
      )}
    </div>
  );
};

export default Popup;
