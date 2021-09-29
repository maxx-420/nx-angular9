// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { default as formatCompleteAddress } from './formatCompleteAddress';

describe('formatCompleteAddress', () => {
  it('should return header text', () => {
    let mockAddress = {
      line1: 'SWAROVSKI #218',
      line2: '3393 PEACHTREE RD NE',
      city: 'RICHMOND',
      zipCode: '30326',
      type: 'Origin',
      state: 'New Jersey',
      country: 'USA',
    };
    let formatedAddress = formatCompleteAddress(mockAddress);
    expect(formatedAddress).toBe(
      'SWAROVSKI #218, 3393 PEACHTREE RD NE, RICHMOND, New Jersey, 30326, USA'
    );
  });

  it('test formatCompleteAddress for null input', () => {
    let formatedAddress = formatCompleteAddress(null);
    expect(formatedAddress).toBe('');
  });
});
