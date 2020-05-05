import React, { HTMLAttributes } from 'react';

import { formatNumber } from '../../utils';
import { Variable, ColorScales } from '../../types';

interface ScaleProps extends HTMLAttributes<HTMLElement> {
  colorScales: ColorScales;
  selectedVariable: Variable;
}

const Scale: React.SFC<ScaleProps> = ({ colorScales, selectedVariable }) => {
  const scale: (string | number)[][] = colorScales[selectedVariable];

  return (
    <div className="legend-section legend-section--column">
      <div className="legend-scale">
        {scale &&
          scale.map((step: (string | number)[], index: number) => {
            const [value, color] = step;
            const borderOpacity = (index + 2) / 10;
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
                    border: `1px solid rgba(0, 0, 0, ${borderOpacity}`,
                  }}
                />
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
