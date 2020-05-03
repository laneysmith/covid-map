import React from 'react';
import { render } from '@testing-library/react';

import Legend from '../Legend';
import { Variable } from '../../../types';

describe('Legend', () => {
  const PROPS = {
    colorScales: {
      [Variable.CASES]: [
        10,
        '#E1F5FE',
        20,
        '#B3E5FC',
        30,
        '#81D4FA',
        40,
        '#4FC3F7',
        50,
        '#29B6F6',
        60,
        '#03A9F4',
        70,
        '#039BE5',
        80,
        '#0288D1',
        80,
        '#0277BD',
        100,
        '#01579B',
      ],
      [Variable.DEATHS]: [
        1,
        '#E1F5FE',
        2,
        '#B3E5FC',
        3,
        '#81D4FA',
        4,
        '#4FC3F7',
        5,
        '#29B6F6',
        6,
        '#03A9F4',
        7,
        '#039BE5',
        8,
        '#0288D1',
        8,
        '#0277BD',
        10,
        '#01579B',
      ],
    },
    datesList: ['2020-02-14', '2020-02-15', '2020-02-16'],
    selectedDate: '2020-02-14',
    selectedVariable: Variable.DEATHS,
    animate: false,
    onChangeDate: jest.fn(),
    onChangeVariable: jest.fn(),
    onChangeAnimate: jest.fn(),
  };

  it('calls renders correctly when loaded', () => {
    const { container } = render(<Legend {...PROPS} loaded />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls renders correctly when not loaded', () => {
    const { container } = render(<Legend {...PROPS} loaded={false} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
