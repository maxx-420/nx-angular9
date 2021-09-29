// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { ChartUtility } from './chart.util';

describe('ChartUtility', () => {
  it('should test xAxisTicksFormatter ', () => {
    let returnValue = ChartUtility.xAxisTicksFormatter(
      10,
      0,
      5,
      {
        labels: [],
      },
      null
    );
    expect(returnValue).not.toBeUndefined;
  });
});
