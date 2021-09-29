// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import NavigationUtility from './navigationUtil';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { ROUTER_CONSTANTS } from './../constants/router.constant';
import CommonUtility from './commonUtil';

describe('navigationUtil', () => {
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: '**', redirectTo: '' }]),
      ],
      providers: [Location],
    }).compileComponents();

    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('navigate', () => {
    let spy = spyOn(router, 'navigate');
    NavigationUtility.navigate(null, '/scs/symphony/home', false);
    expect(spy).toHaveBeenCalledTimes(0);
    NavigationUtility.navigate(router, '/scs/symphony/home', false);
    expect(spy).toHaveBeenCalled();
  });

  it('redirectToUCP', () => {
    let spy = spyOn(NavigationUtility, 'redirectToUCP');
    NavigationUtility.redirectToUCP();
    expect(spy).toHaveBeenCalled();
  });

  it('scrollToTop', () => {
    let spy = spyOn(window, 'scrollTo');
    NavigationUtility.scrollToTop(null, null);
    expect(spy).toHaveBeenCalledTimes(0);
    NavigationUtility.scrollToTop('scs', '/inbound/shipment/123');
    expect(spy).toHaveBeenCalledTimes(0);
    NavigationUtility.scrollToTop(
      'scs',
      '/search?searchBy=itemDescription&searchTerm=full'
    );
    expect(spy).toHaveBeenCalledTimes(1);
    NavigationUtility.scrollToTop('scs', '/itemdetails');
    expect(spy).toHaveBeenCalledTimes(2);
    NavigationUtility.scrollToTop('symphony', '/home');
    expect(spy).toHaveBeenCalledTimes(3);
    NavigationUtility.scrollToTop('abc', '/home');
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('checkIfShipmentDetailsPage', () => {
    let result = NavigationUtility.checkIfShipmentDetailsPage('/');
    expect(result).toBeFalse();
    result = NavigationUtility.checkIfShipmentDetailsPage(
      '/shipment/details/123'
    );
    expect(result).toBeTrue();
  });

  it('checkSanitizeUrl', () => {
    let url =
      'https://scsappsdev.ups.com/scs/login?returnto=https://scsappsdev.ups.com/scs/';
    expect(NavigationUtility.sanitizeUrl(url)).toEqual(url);
    url = 'https://www.scsapps.ups.com?returnto=www.attacker.com';
    expect(NavigationUtility.sanitizeUrl(url)).toEqual(null);
    url = '';
    expect(NavigationUtility.sanitizeUrl(url)).toEqual(null);
  });

  it('getLoginReturnTo', () => {
    spyOn(NavigationUtility, 'getQueryParams').and.returnValues(
      null,
      {
        returnto: null,
      },
      {
        returnto: '123',
      }
    );
    expect(NavigationUtility.getLoginReturnTo()).toEqual(window.location.href);

    spyOn(CommonUtility, 'getWindowLocationProperty').and.returnValue(
      getMockWindowLocation()
    );
    expect(NavigationUtility.getLoginReturnTo()).toEqual(
      'https://dummy-url.com/' + ROUTER_CONSTANTS.digitalPlatform
    );

    expect(NavigationUtility.getLoginReturnTo()).toEqual('123');
  });

  it('isNotSymphonyUrl', () => {
    expect(NavigationUtility.isNotSymphonyUrl('/scs/')).toBeFalse();
    expect(NavigationUtility.isNotSymphonyUrl('/scs/ucp')).toBeTrue();
    expect(NavigationUtility.isNotSymphonyUrl('/scs/symphony')).toBeFalse();
    expect(
      NavigationUtility.isNotSymphonyUrl('/scs/symphony/outbound')
    ).toBeFalse();
    expect(NavigationUtility.isNotSymphonyUrl('/scs/brokerage')).toBeTrue();
  });

  it('should call redirectToLASSOLogout', () => {
    const spy = spyOn(
      CommonUtility,
      'getWindowLocationProperty'
    ).and.returnValues(getMockWindowLocation(), {
      href: 'https://dummy-url.com/scs',
    });

    spyOn(NavigationUtility, 'setWindowLocation');

    NavigationUtility.redirectToLASSOLogout();
    NavigationUtility.redirectToLASSOLogout();

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should call redirectToLASSOLogin', () => {
    const spy = spyOn(
      CommonUtility,
      'getWindowLocationProperty'
    ).and.returnValues(getMockWindowLocation(), {
      href: 'https://dummy-url.com/scs',
    });

    spyOn(NavigationUtility, 'setWindowLocation');

    NavigationUtility.redirectToLASSOLogin();
    NavigationUtility.redirectToLASSOLogin();
    NavigationUtility.redirectToLASSOLogin(true);

    expect(spy).toHaveBeenCalledTimes(2);
  });

  function getMockWindowLocation(): Location {
    return {
      host: 'dummy-url.com',
      hostname: 'dummy-url.com',
      href: 'https://dummy-url.com/scs/noaccess',
      origin: 'https://dummy-url.com',
      pathname: '/scs',
      protocol: 'https:',
      ancestorOrigins: null,
      hash: null,
      port: null,
      search: null,
      assign: null,
      reload: null,
      replace: null,
    };
  }
});
