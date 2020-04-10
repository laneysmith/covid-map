import React, { useMemo } from 'react';

import { formatNumber, chunkArray } from '../../utils';

const Scale = ({ colorScales, selectedVariable }) => {
  const scale = colorScales[selectedVariable];
  const chunkedScale = useMemo(() => {
    const chunked = scale.length > 0 ? chunkArray(scale) : null;
    return chunked;
  }, [scale]);

  return (
    <div className="legend-section legend-section--column">
      <div className="legend-scale">
        {chunkedScale &&
          chunkedScale.map((step, index) => {
            const [value, color] = step;
            return (
              <div key={`scale-step-${index}`} id={`scale-step-${index}`}>
                <span
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
      <a
        href="https://github.com/laneysmith/covid-map"
        className="source-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        view source on github
      </a>
    </div>
  );
};

export default Scale;
