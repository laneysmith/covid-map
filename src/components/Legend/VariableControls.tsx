import React, { HTMLAttributes } from 'react';

import { Variable } from '../../types';

interface VariableControlsProps extends HTMLAttributes<HTMLElement> {
  disabled: boolean;
  selectedVariable: Variable;
  onChangeVariable: (value: Variable) => void;
}

const VariableControls: React.SFC<VariableControlsProps> = ({
  disabled,
  selectedVariable,
  onChangeVariable,
}) => {
  const handleChangeVariable = (e: React.ChangeEvent<HTMLInputElement>): void =>
    onChangeVariable(Variable[e.target.value as keyof typeof Variable]);

  return (
    <div className="legend-section">
      {Object.entries(Variable).map(([key, value]) => (
        <label key={value} htmlFor={`${value}-radio-button`}>
          <input
            type="radio"
            id={`${value}-radio-button`}
            name="variable"
            value={key}
            checked={selectedVariable === value}
            onChange={handleChangeVariable}
            disabled={disabled}
          />{' '}
          {`${value.charAt(0).toUpperCase()}${value.slice(1)}`}
        </label>
      ))}
    </div>
  );
};

export default VariableControls;
