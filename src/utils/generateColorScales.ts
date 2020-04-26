import { COLORS } from '../types';

/**
 * @param max - maximum number of cases or deaths
 * @return array of counts and colors
 */
export default function generateColorScales(max: number): (number | string)[] {
  let scale = [1, COLORS[0]];
  const colorsLen = COLORS.length;
  const roundedMax = Math.ceil(max / 500) * 500;
  for (let i = 8; i >= 0; i--) {
    scale.push(roundedMax / Math.pow(2, i));
    scale.push(COLORS[colorsLen - i - 1]);
  }
  return scale;
}
