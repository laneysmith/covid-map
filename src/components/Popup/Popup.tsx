import React, { HTMLAttributes } from 'react';
// import { MapboxGeoJSONFeature } from 'mapbox-gl';

import { formatNumber } from '../../utils';
import { EXCEPTIONS } from './exceptions';
import './_popup-styles.css';

interface PopupProps extends HTMLAttributes<HTMLElement> {
  // TODO: not 'any'; reconcile MapboxGeoJSONFeature type & IFeature interface
  feature: any;
}

const Popup: React.SFC<PopupProps> = ({ feature }) => {
  const { id, properties, state } = feature;
  const { COUNTY: county } = properties;
  const { cases, deaths } = state;
  const hasCasesData = typeof cases === 'number';
  const hasDeathsData = typeof deaths === 'number';
  const stringId = id?.toString();
  const exceptionNote = EXCEPTIONS.get(stringId) ? `Note: ${EXCEPTIONS.get(stringId)}` : null;

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
