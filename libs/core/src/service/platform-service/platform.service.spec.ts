import { TestBed } from '@angular/core/testing';

import { PlatformService } from './platform.service';

describe('PlatformService', () => {
  let service: PlatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('accountToggle', () => {
    let spy = spyOn(service.getProfileInfo$, 'next');
    service.setProfileInfo('value');
    expect(spy).toHaveBeenCalledWith('value');
  });

  it('addOrientationChangeListener', () => {
    var callbackFn;
    let spy = spyOn(window, 'addEventListener').and.callFake(
      (event: string, callback: any) => {
        callbackFn = callback;
      }
    );
    service.addOrientationChangeListener();
    callbackFn();
    callbackFn({ origin: 'https://localhost' });
    expect(spy).toHaveBeenCalled();
  });
  it('setShipmentList', () => {
    let spy = spyOn(service.totalShipmentList$, 'next');
    service.setShipmentList({});
    expect(spy).toHaveBeenCalledWith({});
  });
  it('clearShipmentList', () => {
    let spy = spyOn(service.totalShipmentList$, 'next');
    service.clearShipmentList();
    expect(spy).toHaveBeenCalled();
  });
});
