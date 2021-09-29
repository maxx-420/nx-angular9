// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NavigationService } from './navigation.service';
import { CommonUtility } from '../../utils';

describe('NavigationService', () => {
  let service: NavigationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: '**', redirectTo: '' }]),
      ],
    });
    service = TestBed.inject(NavigationService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call navigateWithQueryParams', () => {
    let spy = spyOn(router, 'navigate');
    service.navigateWithQueryParams('/', null);
    expect(spy).toHaveBeenCalledWith(['/'], {
      queryParamsHandling: 'preserve',
      replaceUrl: false,
    });
    let queryParams = {
      key1: 'value1',
    };
    service.navigateWithQueryParams('/', queryParams, true);
    expect(spy).toHaveBeenCalledWith(['/'], {
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  });

  it('should call getQueryParams', () => {
    let val = service.getQueryParams();
    expect(val).toEqual({});
  });

  it('should get the query param from the url', () => {
    const mockLocation: Location = {
      host: 'scsappsqa.ups.com',
      hostname: 'scsappsqa.ups.com',
      href:
        'https://scsappsqa.ups.com/scs/symphony/shipments/details/SN7889714?productLine=HLD&accountType=MM',
      origin: 'https://scsappsqa.ups.com',
      pathname: '/scs/symphony/shipments/details/SN7889714',
      protocol: 'http:',
      ancestorOrigins: null,
      hash: null,
      port: null,
      search: '?productLine=HLD&accountType=MM',
      assign: null,
      reload: null,
      replace: null,
    };

    spyOn(CommonUtility, 'getWindowLocationProperty').and.returnValue(
      mockLocation
    );
    expect(service.getQueryParams()).toEqual({
      accountType: 'MM',
      productLine: 'HLD',
    });
  });
});
