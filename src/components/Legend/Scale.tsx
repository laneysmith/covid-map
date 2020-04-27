import React, { useMemo } from 'react';

import { formatNumber, chunkArray } from '../../utils';
import { Variable, ColorScales } from '../../types';

interface IScale {
  colorScales: ColorScales;
  selectedVariable: Variable;
}

const Scale: React.SFC<IScale> = ({ colorScales, selectedVariable }) => {
  const scale: (string | number)[] = colorScales[selectedVariable];
  const chunkedScale = useMemo(() => {
    const chunked = scale.length > 0 ? chunkArray(scale) : null;
    return chunked;
  }, [scale]);

  return (
    <div className="legend-section legend-section--column">
      <div className="legend-scale">
        {chunkedScale &&
          chunkedScale.map((step: (string | number)[], index: number) => {
            const [value, color] = step;
            return (
              <div
                key={`scale-step-${index}`}
                id={`scale-step-${index}`}
                className="legend-scale__step"
              >
                <span
                  className="legend-scale__step-swatch"
                  style={{
                    backgroundColor: `${color}`,
                    border: `1px solid rgba(0, 0, 0, 0.${index + 2})`,
                  }}
                ></span>{' '}
                {formatNumber(value)}
              </div>
            );
          })}
      </div>
      <div className="source-notes">
        Data from The New York Times
        <br />
        <a href="https://github.com/laneysmith/covid-map" target="_blank" rel="noopener noreferrer">
          View project source on github
        </a>
      </div>
    </div>
  );
};

export default Scale;
