import formatNumber from '../formatNumber';

describe('formatNumber', () => {
  it('should round and format the inputted number', () => {
    expect(formatNumber(12334.53)).toEqual('12,335');
    expect(formatNumber(355129834.23)).toEqual('355,129,834');
  });
});
