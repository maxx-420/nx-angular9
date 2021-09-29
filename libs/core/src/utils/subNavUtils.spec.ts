// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import SubNavUtility from './subNavUtils';

const analyticsService = {
  createLinkClickTagObject: () => {
    return '';
  },
}

describe('subNavUtils', () => {
  it('should call myAccountClick', () => {
    spyOn(SubNavUtility, 'myAccountClick').and.callThrough();
    SubNavUtility.myAccountClick(analyticsService);
    expect(SubNavUtility.myAccountClick).toBeTruthy();
  });

  it('should call contactUsClick', () => {
    spyOn(SubNavUtility, 'contactUsClick').and.callThrough();
    SubNavUtility.contactUsClick(analyticsService);
    expect(SubNavUtility.contactUsClick).toBeTruthy();
  });

  it('should call logOutClick', () => {
    spyOn(SubNavUtility, 'logOutClick').and.callThrough();
    SubNavUtility.logOutClick(analyticsService);
    expect(SubNavUtility.logOutClick).toBeTruthy();
  });
});
