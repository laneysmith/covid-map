import { COLORS } from './constants';

/**
 * @param {number} number
 * @return {number} rounded number, formatted with commas
 */
export function formatNumber(number) {
  return Math.round(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

/**
 * @param {number} max - maximum number of cases or deaths
 * @param {string} variable - 'CASE' or 'DEATHS'
 * @return {number} maximum value for variable
 */
export function generateColorScales(max, variable) {
  let scale = [1, COLORS[0]];
  const colorsLen = COLORS.length;
  const roundedMax = Math.ceil(max / 500) * 500;
  for (let i = 8; i >= 0; i--) {
    scale.push(roundedMax / Math.pow(2, i));
    scale.push(COLORS[colorsLen - i - 1]);
  }
  return scale;
}

/**
 * @param {Array<(number|string)>} array - flat array of step values followed by their color values
 * @return {Array<Array<(number|string)>>} array of
 */
export function chunkArray(array) {
  return array.reduce((acc, item, index) => {
    const chunkIndex = Math.floor(index / 2);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(item);
    return acc;
  }, []);
}
