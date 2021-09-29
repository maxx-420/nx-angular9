// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import convertKgToLb from './convertKgToLb';

describe('convertKgToLb', () => {
  it('should test convertKgToLb method', () => {
    let result = convertKgToLb(0);
    expect(result).toBe(0);
    result = convertKgToLb(1);
    expect(result).toBe(2.205);
  });
});
