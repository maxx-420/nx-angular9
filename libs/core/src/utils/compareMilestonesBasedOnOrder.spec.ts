// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { default as compareMilestonesBasedOnOrder } from './compareMilestonesBasedOnOrder';

describe('formatAddress', () => {
  it('should return header text', () => {
    let a = {
      id: 'BOOKING',
      name: 'Booking',
      count: '122',
      order: 1,
    };
    let b = {
      id: 'WAREHOUSE',
      name: 'Warehouse',
      count: '90',
      order: 2,
    };
    let c = {
      id: 'TRANSIT',
      name: 'In Transit',
      count: '12',
      order: 2,
    };
    let compareValueLesser = compareMilestonesBasedOnOrder(a, b);
    let compareValueEqual = compareMilestonesBasedOnOrder(c, b);
    let compareValueGreater = compareMilestonesBasedOnOrder(b, a);

    expect(compareValueLesser).toBe(-1);
    expect(compareValueEqual).toBe(0);
    expect(compareValueGreater).toBe(1);
  });
});
