import React, { useMemo } from 'react';

import { CASES, DEATHS } from '../constants';
import { formatNumber, chunkArray } from '../utils';

const Legend = ({ selected, onChangeVariable, loaded, colorScales }) => {
  const handleChangeVariable = (e) => onChangeVariable(e.target.value);
  const scale = colorScales[selected];
  const chunkedScale = useMemo(() => {
    const chunked = scale.length > 0 ? chunkArray(scale) : null;
    return chunked;
  }, [scale]);

  return (
    <div id="state-legend" className="legend">
      <div className="legend-controls">
        <label htmlFor={CASES}>
          <input
            type="radio"
            id={CASES}
            name="variable"
            value={CASES}
            checked={selected === CASES}
            onChange={handleChangeVariable}
            disabled={!loaded}
          />{' '}
          Cases
        </label>
        <label htmlFor={DEATHS}>
          <input
            type="radio"
            id={DEATHS}
            name="variable"
            value={DEATHS}
            checked={selected === DEATHS}
            onChange={handleChangeVariable}
            disabled={!loaded}
          />{' '}
          Deaths
        </label>
      </div>
      <div className="legend-scale">
        {chunkedScale &&
          chunkedScale.map((step, index) => {
            const [value, color] = step;
            return (
              <div key={`scale-step-${index}`} id={`scale-step-${index}`}>
                <span style={{ backgroundColor: `${color}` }}></span> {formatNumber(value)}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Legend;
