/**
 * @param number - number
 * @return rounded number as a string, formatted with commas
 */
export default function formatNumber(number: number): string {
  return Math.round(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
