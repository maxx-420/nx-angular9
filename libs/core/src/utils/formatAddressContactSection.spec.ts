// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { default as formatAddressContactSection } from './formatAddressContactSection';

describe('formatAddressContactSection', () => {
  it('should return header text', () => {
    let mockAddress = {
      "street": "999 LAKE DR",
      "city": "ISSAQUAH",
      "stateProvince": "WA",
      "postalCode": "98027",
      "country": "US",
      "unloc": "USSEA"
    };
    let formatedAddress = formatAddressContactSection(mockAddress);
    expect(formatedAddress).toBe(
      '999 LAKE DR, ISSAQUAH, WA, 98027, US, USSEA'
    );
  });

  it('test formatAddressContactSection for null input', () => {
    let formatedAddress = formatAddressContactSection(null);
    expect(formatedAddress).toBe('');
  });
});
