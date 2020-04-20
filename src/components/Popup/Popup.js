import React from 'react';

import { formatNumber } from '../../utils';
import { EXCEPTIONS } from './exceptions';
import './_popup-styles.css';

const Popup = ({ feature }) => {
  const { id, properties } = feature;
  const { COUNTY: county } = properties;
  const { cases, deaths } = feature.state;
  const hasCasesData = typeof cases === 'number';
  const hasDeathsData = typeof deaths === 'number';
  const stringId = id.toString();
  const exceptionNote = EXCEPTIONS[stringId] ? `Note: ${EXCEPTIONS[stringId]}` : null;

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
      {exceptionNote && <div className="exception-note">{exceptionNote}</div>}
    </div>
  );
};

export default Popup;
