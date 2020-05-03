import generateColorScales from '../generateColorScales';
import { COLORS } from '../../types';

describe('generateColorScales', () => {
  it('should round and format the inputted number', () => {
    const expected = [
      1,
      COLORS[0],
      179.6875,
      COLORS[1],
      359.375,
      COLORS[2],
      718.75,
      COLORS[3],
      1437.5,
      COLORS[4],
      2875,
      COLORS[5],
      5750,
      COLORS[6],
      11500,
      COLORS[7],
      23000,
      COLORS[8],
      46000,
      COLORS[9],
    ];
    expect(generateColorScales(45682)).toEqual(expected);
  });
});
