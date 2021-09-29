// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import CommonUtility from './commonUtil';
import {
  isConvergenceDashboardExperience,
  isConvergenceReportExperience,
  isConvergenceWarehouseExperience,
} from './experience.util';

describe('isConvergenceDashboardExperience', () => {
  const dashboardExperience = 'old';
  const warehouseExperience = 'old';

  it('should return false if old dashboard experience in session', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(
      () => dashboardExperience
    );
    expect(isConvergenceDashboardExperience()).toEqual(false);
  });

  it('should return false if dashboard experience in session is not defined', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(() => null);
    expect(isConvergenceDashboardExperience()).toEqual(false);
  });

  it('should return false if old warehouse experience in session', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(
      () => warehouseExperience
    );
    expect(isConvergenceWarehouseExperience()).toEqual(false);
  });

  it('should return false if warehouse experience in session is not defined', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(() => null);
    expect(isConvergenceWarehouseExperience()).toEqual(false);
  });
});

describe('isConvergenceReportExperience', () => {
  const reportExperience = 'old';

  it('should return false if old report experience in session', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(
      () => reportExperience
    );
    expect(isConvergenceReportExperience()).toEqual(false);
  });
});
