// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { CustomEncoder } from './customEncoder';

describe('customEncoder', () => {
  let sampleInput = 'SP C1 B3 STEEL CABLE +CAP,LUG,WEIGHT 49';
  let expected = 'SP%20C1%20B3%20STEEL%20CABLE%20%2BCAP%2CLUG%2CWEIGHT%2049';
  let customEncoder = new CustomEncoder();

  it('should encodeKey with spec char', () => {
    expect(customEncoder.encodeKey(sampleInput)).toBe(expected);
  });
  it('should encodeValue with spec char', () => {
    expect(customEncoder.encodeValue(sampleInput)).toBe(expected);
  });
  it('should decodeKey with spec char', () => {
    expect(customEncoder.decodeKey(expected)).toBe(sampleInput);
  });
  it('should decodeValue with spec char', () => {
    expect(customEncoder.decodeValue(expected)).toBe(sampleInput);
  });
});
