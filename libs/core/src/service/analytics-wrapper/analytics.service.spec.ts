// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { TestBed } from '@angular/core/testing';
import { AccessControlUtility } from '../../utils/access-control.util';
import {
  EVENT_FLAG_VALUES,
  PAGE_NAME_PREFIX,
  ROUTER_CONSTANTS,
  UPS_PAGE_DESCRIPTION_PREFIX,
} from '../../constants';
import { AnalyticsService } from './analytics.service';
import { CommonUtility, SessionStorageUtility } from '../../utils';
import { TaggingService } from '../tagging-service/tagging.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let taggingService: TaggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyticsService);
    taggingService = TestBed.inject(TaggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should test getLinkPageName when url contains search', () => {
    spyOn(service, 'getCurrentUrl').and.returnValue(
      'random/' + ROUTER_CONSTANTS.search
    );
    expect(service.getLinkPageName({})).toBe(
      PAGE_NAME_PREFIX + ROUTER_CONSTANTS.search
    );
  });
  it('should test getLinkPageName when url contains account', () => {
    spyOn(service, 'getCurrentUrl').and.returnValue(
      'random/' + ROUTER_CONSTANTS.account
    );
    expect(service.getLinkPageName({})).toBe(
      PAGE_NAME_PREFIX + ROUTER_CONSTANTS.account
    );
  });
  it('should test getLinkPageName when url contains contact', () => {
    spyOn(service, 'getCurrentUrl').and.returnValue(
      'random/' + ROUTER_CONSTANTS.contact
    );
    expect(service.getLinkPageName()).toBe(
      PAGE_NAME_PREFIX + ROUTER_CONSTANTS.contact
    );
  });
  it('should test getLinkPageName when url contains warehouse', () => {
    spyOn(service, 'getCurrentUrl').and.returnValue(
      'random' + ROUTER_CONSTANTS.warehouse
    );
    expect(service.getLinkPageName({ warehouse_id: 100 })).toBe(
      PAGE_NAME_PREFIX +
        ROUTER_CONSTANTS.gldPlatform +
        ':' +
        ROUTER_CONSTANTS.warehouse +
        ':' +
        100
    );
  });
  it('should test getLinkPageName when url does not contain search, account or warehouse', () => {
    spyOn(service, 'getCurrentUrl').and.returnValue('random1/random2/random/');
    expect(service.getLinkPageName({})).toBe(
      PAGE_NAME_PREFIX + 'random1:random2:random'
    );
  });
  it('should test getPageSection when url either contains search or account', () => {
    spyOn(service, 'getCurrentUrl').and.returnValue(
      'scs/symphony/' + ROUTER_CONSTANTS.account
    );
    expect(service.getPageSection()).toBe('Symphony');
  });
  it('should test getPageSection when url neither contains search nor account', () => {
    spyOn(service, 'getCurrentUrl').and.returnValue(
      'scs/symphony/' + ROUTER_CONSTANTS.warehouse
    );
    expect(service.getPageSection()).toBe('Warehouse');
  });
  it('should test getAccountType when Primary Acount Type is ManagedInbound and secondary account type is ManagedOutbound', () => {
    spyOn(AccessControlUtility, 'getAccountTypesList').and.returnValue([
      'MI',
      'MO',
    ]);
    const spy = spyOn(SessionStorageUtility, 'set');
    service.setAccountType();
    expect(spy).toHaveBeenCalledWith(
      'AccountTypeForPageLoad',
      'ManagedInbound | ManagedOutbound'
    );
  });
  it('should test getAccountType when Primary Acount Type is ManagedInbound and secondary account type is NonManagedOutbound', () => {
    spyOn(AccessControlUtility, 'getAccountTypesList').and.returnValue([
      'MI',
      'NMO',
    ]);
    const spy = spyOn(SessionStorageUtility, 'set');
    service.setAccountType();
    expect(spy).toHaveBeenCalledWith(
      'AccountTypeForPageLoad',
      'ManagedInbound | NonManagedOutbound'
    );
  });
  it('should test getAccountType when Primary Acount Type is NonManagedInbound and secondary account type is ManagedOutbound', () => {
    spyOn(AccessControlUtility, 'getAccountTypesList').and.returnValue([
      'NMI',
      'MO',
    ]);
    const spy = spyOn(SessionStorageUtility, 'set');
    service.setAccountType();
    expect(spy).toHaveBeenCalledWith(
      'AccountTypeForPageLoad',
      'NonManagedInbound | ManagedOutbound'
    );
  });
  it('should test getAccountType when Primary Acount Type is NonManagedInbound and secondary account type is NonManagedOutbound', () => {
    spyOn(AccessControlUtility, 'getAccountTypesList').and.returnValue([
      'NMI',
      'NMO',
    ]);
    const spy = spyOn(SessionStorageUtility, 'set');
    service.setAccountType();
    expect(spy).toHaveBeenCalledWith(
      'AccountTypeForPageLoad',
      'NonManagedInbound | NonManagedOutbound'
    );
  });

  it('should test setProductLinesForPageLoadTag', () => {
    spyOn(
      AccessControlUtility,
      'getAllCompanyProductLineAccess'
    ).and.returnValue(['GLD', 'GFF']);
    const spy = spyOn(SessionStorageUtility, 'set');
    service.setProductLinesForPageLoadTag();
    expect(spy).toHaveBeenCalledWith('ProductLineForPageLoad', 'GLD | GFF');
  });

  it('should test setServiceLinesForPageLoadTag', () => {
    spyOn(
      AccessControlUtility,
      'getAllCompanyServiceLineAccess'
    ).and.returnValue(['FG', 'PS']);
    const spy = spyOn(SessionStorageUtility, 'set');
    service.setServiceLinesForPageLoadTag();
    expect(spy).toHaveBeenCalledWith('ServiceLineForPageLoad', 'FG | PS');
  });
  it('should call sanitizeUrl when getCurrentUrl is called', () => {
    let spy = spyOn(CommonUtility, 'sanitizeUrl');
    service.getCurrentUrl();
    expect(spy).toHaveBeenCalled();
  });
  it('should test getPageDescription when getPageSection returns Home', () => {
    spyOn(service, 'getPageSection').and.returnValue('Dashboard');
    expect(service.getPageDescription()).toBe(
      UPS_PAGE_DESCRIPTION_PREFIX + 'Dashboard'
    );
  });
  it('should test getPageDescription when getPageSection returns Search', () => {
    spyOn(service, 'getPageSection').and.returnValue('Search');
    expect(service.getPageDescription()).toBe(
      UPS_PAGE_DESCRIPTION_PREFIX + 'Search'
    );
  });
  it('should test getPageDescription when getPageSection returns Account', () => {
    spyOn(service, 'getPageSection').and.returnValue('Account');
    expect(service.getPageDescription()).toBe(
      UPS_PAGE_DESCRIPTION_PREFIX + 'Account'
    );
  });
  it('should test getPageDescription when getPageSection does not return account, search or  home', () => {
    spyOn(service, 'getPageSection').and.returnValue('warehouse');
    service.urlTerms = [];
    expect(service.getPageDescription()).toBe(
      UPS_PAGE_DESCRIPTION_PREFIX + 'warehouse L0'
    );
  });
  it('test getAppUserType when getUserProfile returns null', () => {
    spyOn(SessionStorageUtility, 'getUserProfile').and.returnValue(null);
    expect(service.getAppUserType()).toBe(undefined);
  });
  it('test getAppUserType when getUserProfile returns a userProfile where userDetails is null', () => {
    spyOn(SessionStorageUtility, 'getUserProfile').and.returnValue({
      userDetails: null,
    });
    expect(service.getAppUserType()).toBe(undefined);
  });
  it('test getAppUserType when getUserProfile returns a userProfile with valid userDetails', () => {
    spyOn(SessionStorageUtility, 'getUserProfile').and.returnValue({
      userDetails: { userType: 'good' },
    });
    expect(service.getAppUserType()).toBe('good');
  });
  it('should call tagOnGenericLinkClick when createModalOpenCloseTagObject is called', () => {
    let spy = spyOn(taggingService, 'tagOnGenericLinkClick');
    service.createLinkClickTagObject('', '', '', '', {});
    expect(spy).toHaveBeenCalled();
  });
  it('should call tagOnGenericLinkClick when createFormTagObject is called', () => {
    spyOn(service, 'getLinkPageName').and.returnValue('');
    spyOn(service, 'getEncryptedCompanyId').and.returnValue('');
    let spy = spyOn(taggingService, 'tagOnGenericLinkClick');
    service.createFormTagObject('', '', '', '');
    expect(spy).toHaveBeenCalled();
    service.createFormTagObject('', '', '', '', {
      event_flag: EVENT_FLAG_VALUES.internal_site_search,
    });
    let tagObj = {
      form_name: '',
      link_name: '',
      link_page_name: '',
      event_desc: '',
      link_type: '',
      encrypted_company_id: '',
      event_flag: EVENT_FLAG_VALUES.internal_site_search,
    };
    expect(spy).toHaveBeenCalledWith(tagObj);
  });
  it('should call tagOnPageLoad when createSearchResultsLoadTagObject is called', () => {
    let spy = spyOn(taggingService, 'tagOnPageLoad');
    service.createSearchResultsLoadTagObject(true, '', {});
    expect(spy).toHaveBeenCalled();
  });
  it('should call tagOnGenericLinkClick when createSearchResultsLoadTagObject is called', () => {
    let spy = spyOn(taggingService, 'tagOnGenericLinkClick');
    service.createSearchResultsLoadTagObject(false, '');
    expect(spy).toHaveBeenCalled();
  });
  it('should call tagOnPageLoad when createPageLoadTagObject is called', () => {
    let spy = spyOn(taggingService, 'tagOnPageLoad');
    service.createPageLoadTagObject('', {});
    expect(spy).toHaveBeenCalled();
  });
  it('should call setEventDescForPageLoadTag with more than one company details', () => {
    spyOn(AccessControlUtility, 'getAllSelectedCompanyDetails').and.returnValue(
      [
        {
          id: 455,
          name: 'CIENA-19458-US-GOOD',
          hasFtzAccess: false,
          eId:
            'ed8e85d99863f11566b0b77ee30b789cf11e517dd18e7c6e2a155be9c70772c4',
          productLines: [
            {
              productType: 'GLD',
              serviceLines: [
                {
                  serviceLineName: 'PS',
                },
              ],
            },
          ],
          unitName: null,
        },
        {
          id: 447,
          name: 'CIENA-19459-US-DEFECTIVE',
          hasFtzAccess: false,
          eId:
            'ed8e85d99863f11566b0b77ee30b789cf11e517dd18e7c6e2a155be9c70772c4',
          productLines: [
            {
              productType: 'GLD',
              serviceLines: [
                {
                  serviceLineName: 'PS',
                },
              ],
            },
          ],
          unitName: null,
        },
      ]
    );
    let spy = spyOn(SessionStorageUtility, 'set');
    service.setEventDescForPageLoadTag();

    expect(spy).toHaveBeenCalled();
  });
  it('should call setEventDescForPageLoadTag with one company details', () => {
    spyOn(AccessControlUtility, 'getAllSelectedCompanyDetails').and.returnValue(
      [
        {
          id: 455,
          name: 'CIENA-19458-US-GOOD',
          hasFtzAccess: false,
          eId:
            'ed8e85d99863f11566b0b77ee30b789cf11e517dd18e7c6e2a155be9c70772c4',
          productLines: [
            {
              productType: 'GLD',
              serviceLines: [
                {
                  serviceLineName: 'PS',
                },
              ],
            },
          ],
          unitName: null,
        },
      ]
    );
    let spy = spyOn(SessionStorageUtility, 'set');
    service.setEventDescForPageLoadTag();

    expect(spy).toHaveBeenCalled();
  });
  it('should call setKeysInSessionStorage with one company details', () => {
    let spy1 = spyOn(service, 'setEventDescForPageLoadTag');
    service.setKeysInSessionStorage();

    expect(spy1).toHaveBeenCalled();
  });
});
