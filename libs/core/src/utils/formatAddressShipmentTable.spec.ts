// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { default as formatAddress } from './formatAddressShipmentTable';

describe('formatAddress', () => {
  it('should return header text', () => {
    let mockAddress = {
      line1: 'SWAROVSKI #218',
      line2: '3393 PEACHTREE RD NE',
      city: 'RICHMOND',
      postalCode: '30326',
      type: 'Origin',
      state: 'New Jersey',
      country: 'USA',
    };
    let formatedAddress = formatAddress(mockAddress);
    expect(formatedAddress).toBe('RICHMOND, New Jersey, USA');
  });

  it('test formatAddress for null input', () => {
    let formatedAddress = formatAddress(null);
    expect(formatedAddress).toBe('undefined, undefined, undefined');
  });
});
