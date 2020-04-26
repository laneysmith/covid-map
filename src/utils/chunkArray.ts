/**
 * @param array - flat array of step values followed by their color values
 * @return array of arrays of numbers paired with their color values
 */
export default function chunkArray(array: (string | number)[]): (string | number)[][] {
  return array.reduce((acc, item, index) => {
    const chunkIndex = Math.floor(index / 2);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(item);
    return acc;
  }, [] as (string | number)[][]);
}
