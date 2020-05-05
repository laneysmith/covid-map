import generateColorScales from '../generateColorScales';
import { COLORS } from '../../types';

describe('generateColorScales', () => {
  it('should return the correct array with default steps and colors', () => {
    const expected = [
      [1, COLORS[0]],
      [3, COLORS[1]],
      [8, COLORS[2]],
      [24, COLORS[3]],
      [70, COLORS[4]],
      [203, COLORS[5]],
      [587, COLORS[6]],
      [1700, COLORS[7]],
      [4918, COLORS[8]],
      [14233, COLORS[9]],
    ];

    expect(generateColorScales(14233)).toEqual(expected);
  });

  it('should return the correct array with custom steps', () => {
    const expected = [
      [1, COLORS[0]],
      [3, COLORS[1]],
      [12, COLORS[2]],
      [40, COLORS[3]],
      [135, COLORS[4]],
      [460, COLORS[5]],
      [1567, COLORS[6]],
      [5342, COLORS[7]],
    ];

    expect(generateColorScales(5342, 8)).toEqual(expected);
  });

  it('should throw an error when the the colors array is shorter than the steps', () => {
    const shortColorList = ['red', 'orange', 'yellow', 'green'];

    expect(() => generateColorScales(21342, 13, shortColorList)).toThrowError('Colors array must contain at least 13 colors values.');;
  });
});
