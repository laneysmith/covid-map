import React from 'react';

import { Variable } from '../../types';

interface IVariableControls {
  disabled: boolean;
  selectedVariable: Variable;
  onChangeVariable: (e: string) => void;
}

const VariableControls: React.SFC<IVariableControls> = ({
  disabled,
  selectedVariable,
  onChangeVariable,
}) => {
  const handleChangeVariable = (e: React.ChangeEvent<HTMLInputElement>): void =>
    onChangeVariable(e.target.value);

  return (
    <div className="legend-section">
      {Object.values(Variable).map((variable) => (
        <label key={variable} htmlFor={variable}>
          <input
            type="radio"
            id={`${variable}-radio-button`}
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
