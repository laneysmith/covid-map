import createFillColorArgs from '../createFillColorArgs';
import { Variable } from '../../types';

describe('createFillColorArgs', () => {
  const colorScales = {
    [Variable.CASES]: [10, 'red', 20, 'orange', 30, 'yellow', 40, 'green'],
    [Variable.DEATHS]: [1, 'blue', 2, 'indigo', 3, 'violet', 4, 'navy'],
  };

  it('should return the correct array of fill color arguments', () => {
    const expected1 = [
      'case',
      ['==', ['feature-state', Variable.CASES], null],
      'rgba(0,0,0,0.25)',
      ['==', ['feature-state', Variable.CASES], 0],
      'rgba(0,0,0,0.25)',
      [
        'interpolate',
        ['linear'],
        ['feature-state', Variable.CASES],
        10,
        'red',
        20,
        'orange',
        30,
        'yellow',
        40,
        'green',
      ],
    ];
    const expected2 = [
      'case',
      ['==', ['feature-state', Variable.DEATHS], null],
      'rgba(0,0,0,0.25)',
      ['==', ['feature-state', Variable.DEATHS], 0],
      'rgba(0,0,0,0.25)',
      [
        'interpolate',
        ['linear'],
        ['feature-state', Variable.DEATHS],
        1,
        'blue',
        2,
        'indigo',
        3,
        'violet',
        4,
        'navy',
      ],
    ];

    expect(createFillColorArgs(Variable.CASES, colorScales)).toEqual(expected1);
    expect(createFillColorArgs(Variable.DEATHS, colorScales)).toEqual(expected2);
  });
});
