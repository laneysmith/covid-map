import chunkArray from '../chunkArray';

describe('chunkArray', () => {
  it('should chunk every two items into an array', () => {
    const input = [1, 'red', 2, 'orange', 3, 'yellow', 4, 'green'];
    const expected = [
      [1, 'red'],
      [2, 'orange'],
      [3, 'yellow'],
      [4, 'green'],
    ];

    expect(chunkArray(input)).toEqual(expected);
  });
});
