// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { default as compareDates } from './compareDates';

describe('compareDates', () => {
  it('should return sorting order', () => {
    let a = {
      id: 'DAY1',
      date: '2020-06-04',
      count: '120',
    };
    let b = {
      id: 'DAY2',
      date: '2020-06-06',
      count: '12',
    };
    let c = {
      id: 'DAY3',
      date: '2020-06-06',
      count: '100',
    };
    let compareValueLesser = compareDates(a, b);
    let compareValueEqual = compareDates(c, b);
    let compareValueGreater = compareDates(b, a);

    expect(compareValueLesser).toBe(-1);
    expect(compareValueEqual).toBe(0);
    expect(compareValueGreater).toBe(1);
  });
});
