import { ReactText } from 'react';

/**
 * @param number - number
 * @return rounded number as a string, formatted with commas
 */
export default function formatNumber(number: ReactText): string {
  const numberAsInt = typeof number === 'string' ? parseInt(number) : number;
  return Math.round(numberAsInt)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
