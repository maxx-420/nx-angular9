// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import SessionStorageUtility from './sessionStorage';

describe('SessionStorageUtility', () => {
  it('should call clear session storage', () => {
    let spy = spyOn(sessionStorage, 'clear');
    SessionStorageUtility.clear();
    expect(spy).toHaveBeenCalled();
  });

  it('should get value from session storage', () => {
    let spy = spyOn(sessionStorage, 'getItem').and.returnValue(
      JSON.stringify([
        'L3-OUT-CustomerPO',
        'L3-OUT-UPSTransportationShipment',
        'L3-OUT-ShipmentMode',
        'L2-OUT-ShipmentListingTable-ScheduledDelivery',
      ])
    );

    expect(SessionStorageUtility.get('exclusions')).toEqual([
      'L3-OUT-CustomerPO',
      'L3-OUT-UPSTransportationShipment',
      'L3-OUT-ShipmentMode',
      'L2-OUT-ShipmentListingTable-ScheduledDelivery',
    ]);
    expect(spy).toHaveBeenCalled();
  });

  it('clearUserProfile', () => {
    let spy = spyOn(sessionStorage, 'removeItem');
    SessionStorageUtility.clearUserProfile(true);
    expect(spy).toHaveBeenCalled();
  });

  it('clearItem', () => {
    let spy = spyOn(sessionStorage, 'removeItem');
    SessionStorageUtility.clearItem('');
    expect(spy).toHaveBeenCalled();
  });

  it('getAccountTypeDetails should return account type details when details are available', () => {
    spyOn(SessionStorageUtility, 'getUserProfile').and.returnValue({
      accountTypeDetails: {},
    });
    expect(SessionStorageUtility.getAccountTypeDetails()).toEqual({});
  });

  it('getAccountTypeDetails should return null details when details are not available', () => {
    spyOn(SessionStorageUtility, 'getUserProfile').and.returnValue(null);
    expect(SessionStorageUtility.getAccountTypeDetails()).toEqual(null);
  });

  it('setUserProfile', () => {
    let spy = spyOn(sessionStorage, 'setItem');
    SessionStorageUtility.setUserProfile(['test']);
    expect(spy).toHaveBeenCalled();
  });

  it('setConfigKeys', () => {
    let spy = spyOn(sessionStorage, 'setItem');
    SessionStorageUtility.setConfigKeys(['test']);
    expect(spy).toHaveBeenCalled();
  });

  it('getConfigKeys', () => {
    let spy = spyOn(SessionStorageUtility, 'get').and.returnValue('test');
    SessionStorageUtility.getConfigKeys('exclusion');
    expect(spy).toHaveBeenCalled();
  });

  it('getUserProfile', () => {
    let spy = spyOn(SessionStorageUtility, 'get').and.returnValue('test');
    SessionStorageUtility.getUserProfile();
    expect(spy).toHaveBeenCalled();
  });
});
