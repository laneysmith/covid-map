import React from 'react';

import { CASES, DEATHS } from '../../constants';

const VariableControls = ({ disabled, selectedVariable, onChangeVariable }) => {
  const handleChangeVariable = (e) => onChangeVariable(e.target.value);

  return (
    <div className="legend-section">
      {[CASES, DEATHS].map((variable) => (
        <label key={variable} htmlFor={variable}>
          <input
            type="radio"
            id={variable}
            name="variable"
            value={variable}
            checked={selectedVariable === variable}
            onChange={handleChangeVariable}
            disabled={disabled}
          />{' '}
          {`${variable.charAt(0).toUpperCase()}${variable.slice(1)}`}
        </label>
      ))}
    </div>
  );
};

export default VariableControls;
