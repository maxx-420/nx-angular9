// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { TestBed } from '@angular/core/testing';

import { MyMonitoringService } from './app-monitoring.service';
import SessionStorageUtility from './../../utils/sessionStorage';

describe('MyMonitoringService', () => {
  let service: MyMonitoringService;

  beforeEach(() => {
    spyOn(SessionStorageUtility, 'getConfigKeys').and.returnValue('abc');
    spyOn(SessionStorageUtility, 'getUserProfile').and.returnValue({
      userDetails: { userId: '123' },
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadPageView', () => {
    let spy = spyOn(service.appInsights, 'trackPageView');

    service.isAppInsightLogEnabled = false;
    service.logPageView('test', 'test');
    expect(spy).toHaveBeenCalledTimes(0);

    service.isAppInsightLogEnabled = true;
    service.logPageView('test', 'test');
    expect(spy).toHaveBeenCalledWith({ name: 'test', uri: 'test' });
  });

  it('logEvent', () => {
    let spy = spyOn(service.appInsights, 'trackEvent');

    service.isAppInsightLogEnabled = false;
    service.logEvent('test');
    expect(spy).toHaveBeenCalledTimes(0);

    service.isAppInsightLogEnabled = true;
    service.logEvent('test');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('logMetric', () => {
    let spy = spyOn(service.appInsights, 'trackMetric');

    service.isAppInsightLogEnabled = false;
    service.logMetric('test', 1223);
    expect(spy).toHaveBeenCalledTimes(0);

    service.isAppInsightLogEnabled = true;
    service.logMetric('test', 123);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('logException', () => {
    let spy = spyOn(service.appInsights, 'trackException');

    service.isAppInsightLogEnabled = false;
    service.logException('test');
    expect(spy).toHaveBeenCalledTimes(0);

    service.isAppInsightLogEnabled = true;
    service.logException('test');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('logTrace', () => {
    let spy = spyOn(service.appInsights, 'trackTrace');

    service.isAppInsightLogEnabled = false;
    service.logTrace('test');
    expect(spy).toHaveBeenCalledTimes(0);

    service.isAppInsightLogEnabled = true;
    service.logTrace('test');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
