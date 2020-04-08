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
 * @param {Array<>} data
 * @param {string} variable - 'CASE' or 'DEATHS'
 * @return {number} maximum value for variable
 */
export function getMax(data, variable) {
  if (!data) {
    return 0;
  }
  return Math.max(...data.map((item) => parseInt(item[variable])));
}

/**
 * @param {Array<>} data
 * @param {string} variable - 'CASE' or 'DEATHS'
 * @return {number} maximum value for variable
 */
export function generateColorScales(data, variable) {
  const max = getMax(data, variable);
  let scale = [0, COLORS[0]];
  const colorsLen = COLORS.length;
  const max500 = Math.ceil(max / 500) * 500;
  for (let i = 6; i >= 0; i--) {
    scale.push(max500 / Math.pow(2, i));
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
