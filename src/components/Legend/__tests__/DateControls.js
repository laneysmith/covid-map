import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import DateControls from '../DateControls';
import { Variable } from '../../../types';

describe('DateControls', () => {
  const onChangeDate = jest.fn();
  const onChangeAnimate = jest.fn();

  const PROPS = {
    allDates: ['2020-02-14', '2020-02-15', '2020-02-16'],
    selectedDate: '2020-02-15',
    onChangeDate,
    onChangeAnimate,
  };

  it('calls onChangeDate with new date when selected in dropdown', () => {
    const { container } = render(<DateControls {...PROPS} />);
    const dateSelect = container.querySelector('#date');

    expect(dateSelect.value).toBe('2020-02-15');

    fireEvent.change(dateSelect, { target: { value: '2020-02-16' } });

    expect(onChangeDate).toHaveBeenCalledWith('2020-02-16');
    expect(onChangeDate.mock.calls.length).toBe(1);
  });

  it('calls onChangeAnimate with correct value', () => {
    const { container, rerender } = render(<DateControls {...PROPS} />);
    const animateButton = container.querySelector('#animate-toggle-button');

    fireEvent.click(animateButton);

    expect(onChangeAnimate).toHaveBeenCalledWith(true);
    expect(onChangeAnimate.mock.calls.length).toBe(1);

    rerender(<DateControls {...PROPS} animate />);

    fireEvent.click(animateButton);

    expect(onChangeAnimate).toHaveBeenCalledWith(false);
    expect(onChangeAnimate.mock.calls.length).toBe(2);
  });

  it('is not actionable when disabled', () => {
    const { container } = render(<DateControls {...PROPS} disabled />);
    const dateSelect = container.querySelector('#date');
    const animateButton = container.querySelector('#animate-toggle-button');

    expect(dateSelect.disabled).toBe(true);
    expect(animateButton.disabled).toBe(true);
  });
});
