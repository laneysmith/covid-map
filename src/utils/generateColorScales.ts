import { COLORS } from '../types';

/**
 * @param max - maximum number of cases or deaths
 * @param steps - (optional) number of steps
 * @param colorList - (optional) list of color values
 * @return array of counts and colors
 */
export default function generateColorScales(
  max: number,
  steps = 10,
  colorList = COLORS
): (number | string)[][] {
  if (colorList.length < steps) {
    throw new Error(`Colors array must contain at least ${steps} colors values.`);
  }

  const scale = [];
  const baseValue = max ** (1 / (steps - 1));

  for (let i = steps - 1; i >= 0; i--) {
    const divisor = baseValue ** i;
    const value = Math.round(max / divisor);
    const color = colorList[steps - i - 1];
    scale.push([value, color]);
  }

  return scale;
}
