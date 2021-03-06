import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import VariableControls from '../VariableControls';
import { Variable } from '../../../types';

describe('VariableControls', () => {
  const onChangeVariable = jest.fn();
  const PROPS = {
    onChangeVariable,
    disabled: false,
  };

  it('calls onChangeVariable with correct variable value when radio button is clicked', () => {
    const { rerender, getByLabelText } = render(
      <VariableControls {...PROPS} selectedVariable={Variable.DEATHS} />
    );
    const casesRadioBtn = getByLabelText('Cases');
    const deathsRadioBtn = getByLabelText('Deaths');

    expect(deathsRadioBtn.checked).toBe(true);

    fireEvent.click(casesRadioBtn);

    expect(onChangeVariable).toHaveBeenCalledWith(Variable.CASES);
    expect(onChangeVariable.mock.calls.length).toBe(1);

    rerender(<VariableControls {...PROPS} selectedVariable={Variable.CASES} />);

    fireEvent.click(deathsRadioBtn);

    expect(onChangeVariable).toHaveBeenCalledWith(Variable.DEATHS);
    expect(onChangeVariable.mock.calls.length).toBe(2);
  });

  it('is not actionable when disabled', () => {
    const { container } = render(
      <VariableControls {...PROPS} selectedVariable={Variable.DEATHS} disabled />
    );
    const casesRadioBtn = container.querySelector('#cases-radio-button');
    const deathsRadioBtn = container.querySelector('#deaths-radio-button');

    expect(casesRadioBtn.disabled).toBe(true);
    expect(deathsRadioBtn.disabled).toBe(true);
  });
});
