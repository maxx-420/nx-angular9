// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import CommonUtility from './commonUtil';
import { UserAgentUtility } from './user-agent.util';
import LocalStorageUtility from './localStorage';
import SessionStorageUtility from './sessionStorage';
import { Renderer2 } from '@angular/core';

describe('commonUtil', () => {
  it('should test utility to compare based on order', () => {
    let a = {
      id: 'BOOKING',
      name: 'Booking',
      count: 122,
      order: 1,
    };
    let b = {
      id: 'WAREHOUSE',
      name: 'Warehouse',
      count: 90,
      order: 2,
    };
    let c = {
      id: 'TRANSIT',
      name: 'In Transit',
      count: 90,
      order: 2,
    };
    let compareValueLesser = CommonUtility.compareMilestonesBasedOnOrder(a, b);
    let compareValueEqual = CommonUtility.compareMilestonesBasedOnOrder(c, b);
    let compareValueGreater = CommonUtility.compareMilestonesBasedOnOrder(b, a);

    expect(compareValueLesser).toBe(-1);
    expect(compareValueEqual).toBe(0);
    expect(compareValueGreater).toBe(1);
  });

  it('should test sanitizeUrl', () => {
    let url = 'https://google.com/';
    let sanitizedUrl = 'https://google.com';
    expect(CommonUtility.sanitizeUrl(url)).toBe(sanitizedUrl);
    expect(CommonUtility.sanitizeUrl(sanitizedUrl)).toBe(sanitizedUrl);
  });

  it('should test utility to getFilterLabel', () => {
    let filterLabel = CommonUtility.getFilterLabel(2);

    expect(filterLabel).toBe('lbl_filter_last_24_hours');
  });

  it('getTopValuesBasedOnCount', () => {
    expect(
      CommonUtility.getTopValuesBasedOnCount(
        [
          { id: '1', name: 'abc', count: '2' },
          { id: '2', name: 'abc', count: '4' },
          { id: '3', name: 'abc', count: '3' },
          { id: '4', name: 'abc', count: '1' },
        ],
        5
      )
    ).toEqual([
      { id: '4', name: 'abc', count: '1' },
      { id: '1', name: 'abc', count: '2' },
      { id: '3', name: 'abc', count: '3' },
      { id: '2', name: 'abc', count: '4' },
    ]);
    expect(
      CommonUtility.getTopValuesBasedOnCount(
        [
          { id: '1', name: 'abc', count: '2' },
          { id: '2', name: 'abc', count: '4' },
          { id: '3', name: 'abc', count: '3' },
          { id: '4', name: 'abc', count: '1' },
        ],
        5,
        'id',
        'desc'
      )
    ).toEqual([
      { id: '4', name: 'abc', count: '1' },
      { id: '3', name: 'abc', count: '3' },
      { id: '2', name: 'abc', count: '4' },
      { id: '1', name: 'abc', count: '2' },
    ]);
  });

  it('getPropValueFromObj', () => {
    let data = {
      userDetails: {
        userId: 'pursingh',
        firstName: 'Puru',
        lastName: 'Singh',
        emailId: 'puru.singh@publicissapient.com',
        companyName: 'Amerock',
        unitKey: 'abc',
        isGuestUser: false,
        productLines: ['GLD', 'GFF'],
      },
      accountTypeDetails: [
        {
          accountTypeCategory: 'primary',
          accountTypes: ['managed_inbound'],
        },
        {
          accountTypeCategory: 'secondary',
          accountTypes: ['managed_outbound'],
        },
      ],
      userGroups: ['BillingDetails'],
      accountTypeExclusions: [
        {
          type: 'Inbound',
          exclusions: {
            components: ['L2-IN-ShipmentListingTable-ShipmentType'],
          },
        },
        {
          type: 'Outbound',
          exclusions: {
            components: [
              'L3-OUT-CustomerPO',
              'L3-OUT-UPSTransportationShipment',
              'L3-OUT-ShipmentMode',
              'L2-OUT-ShipmentListingTable-ScheduledDelivery',
            ],
          },
        },
        {
          type: 'Warehouse',
          exclusions: {
            components: ['L3-WH-InboundShipmentListingTable-CreatedOn'],
          },
        },
      ],
      shipmentAccountTypeExclusions: [
        {
          accountType: 'ManagedInbound',
          type: 'Inbound',
          exclusions: {
            components: ['L3-IN-CreatedOn'],
          },
        },
        {
          accountType: 'NonManagedInbound',
          type: 'Inbound',
          exclusions: {
            components: ['L3-IN-ScheduledDelivery', 'L3-IN-CreatedOn'],
          },
        },

        {
          accountType: 'ManagedOutbound',
          type: 'Outbound',
          exclusions: {
            components: [],
          },
        },
      ],

      usergroupExclusions: [
        {
          type: 'Billing',
          exclusions: {
            components: ['L1-BL-BillingReports'],
          },
        },
      ],
    };

    expect(
      CommonUtility.getPropValueFromObj(data, 'accountTypeExclusions')
    ).toEqual([
      {
        type: 'Inbound',
        exclusions: {
          components: ['L2-IN-ShipmentListingTable-ShipmentType'],
        },
      },
      {
        type: 'Outbound',
        exclusions: {
          components: [
            'L3-OUT-CustomerPO',
            'L3-OUT-UPSTransportationShipment',
            'L3-OUT-ShipmentMode',
            'L2-OUT-ShipmentListingTable-ScheduledDelivery',
          ],
        },
      },
      {
        type: 'Warehouse',
        exclusions: {
          components: ['L3-WH-InboundShipmentListingTable-CreatedOn'],
        },
      },
    ]);

    expect(CommonUtility.getPropValueFromObj(null, null)).toBe(null);
  });

  it('isProdEnv', () => {
    expect(CommonUtility.isProdEnv()).toBe(false);
  });

  it('isDevEnv', () => {
    let spy = spyOn(CommonUtility, 'getWindowLocationProperty');
    spy.and.returnValue('scsappsqa.ups.com');
    expect(CommonUtility.isDevEnv()).toBe(false);

    spy.and.returnValue('scsappsdev.ups.com');
    expect(CommonUtility.isDevEnv()).toBe(true);

    spy.and.returnValue('localhost');
    expect(CommonUtility.isDevEnv()).toBe(true);
  });

  it('getApiAnalyticsErrorDesc', () => {
    expect(CommonUtility.getApiAnalyticsErrorDesc('/scripts/outbound')).toBe(
      null
    );
    expect(
      CommonUtility.getApiAnalyticsErrorDesc('/api/gldwarehouse/v1/warehouse')
    ).toBe(
      'Warehouse Listing Api has failed. Some widgets on the page will show error.'
    );
    expect(
      CommonUtility.getApiAnalyticsErrorDesc(
        '/api/gldoutbound/v1.0/Shipments/1231'
      )
    ).toBe(
      'Outbound Shipment Details Api has failed. Shipment Details page will show error.'
    );
  });

  it('removeSpace', () => {
    const arg = [{ id: 'ASN CREATED' }, { id: 'ASN CREATED' }];
    CommonUtility.removeSpace(arg);
    expect(arg[0].id).toBe('ASNCREATED');
  });

  it('removeSpace when milestones is string', () => {
    const arg = 'ASN CREATED';
    let val = CommonUtility.removeSpace(arg);
    expect(val).toBe('ASNCREATED');
  });

  it('numberWithCommas', () => {
    const arg = 12345;
    const result = CommonUtility.numberWithCommas(arg);
    expect(result).toBe('12,345');
  });

  it('checkScrollHeight', () => {
    const rect: DOMRect = new DOMRect();
    const instance: Element = document.createElement('div');
    spyOn(instance, 'getBoundingClientRect').and.returnValue(rect);
    spyOn(UserAgentUtility, 'isIE').and.returnValue(true);
    const result = CommonUtility.checkScrollHeight(instance);
    expect(result).toEqual({ x: rect.left, y: rect.top });
  });

  it('checkIfValuesInObjectAreTrue', () => {
    const obj1 = {
      a: true,
      b: true,
      c: true,
    };
    const obj2 = {
      a: true,
      b: false,
      c: true,
    };
    expect(CommonUtility.checkIfValuesInObjectAreTrue(obj1)).toBeTrue();
    expect(CommonUtility.checkIfValuesInObjectAreTrue(obj2)).toBeFalse();
  });

  it('checkIfAnyWidgetIsVisible', () => {
    const obj1 = [
      {
        id: 'MovementShipmentCard',
        isDisplay: false,
        viewValue: 'gpf_db_wgt_shpt_title',
      },
      {
        id: 'Reports',
        isDisplay: false,
        viewValue: 'gpf_db_wgt_rpt_title',
      },
      {
        id: 'SearchBar',
        isDisplay: true,
        viewValue: 'gpf_db_wgt_SrchBar_title',
      },
    ];
    const obj2 = [
      {
        id: 'MovementShipmentCard',
        isDisplay: false,
        viewValue: 'gpf_db_wgt_shpt_title',
      },
      {
        id: 'Reports',
        isDisplay: false,
        viewValue: 'gpf_db_wgt_rpt_title',
      },
      {
        id: 'SearchBar',
        isDisplay: false,
        viewValue: 'gpf_db_wgt_SrchBar_title',
      },
    ];
    expect(CommonUtility.checkIfAnyWidgetIsVisible(obj1)).toBeTrue();
    expect(CommonUtility.checkIfAnyWidgetIsVisible(obj2)).toBeFalse();
  });

  it('deepClone and deepEqual', () => {
    const obj1 = {
      a: 1,
      b: true,
      c: 'sample',
    };
    const cloned = CommonUtility.deepClone(obj1);
    expect(CommonUtility.deepEqual(obj1, cloned)).toBeTrue();
  });

  it('should format ModalTitleDateRange', () => {
    const arg = { endDate: '2021/05/19', startDate: '2021/03/21' };
    const result = CommonUtility.getModalTitleDateRange(arg);
    expect(result).toBe(' - From 2021-03-21 to 2021-05-19');
  });

  describe('CommonUtil :: getModuleFromLocationPath', () => {
    it('Empty location path', () => {
      const module = CommonUtility.getModuleFromLocationPath('');
      expect(module).toBe('');
    });

    it('Module location path', () => {
      let module = CommonUtility.getModuleFromLocationPath('/scs/admin');
      expect(module).toBe('admin');

      module = CommonUtility.getModuleFromLocationPath('/scs/search');
      expect(module).toBe('search');
    });

    it('Micro App location path', () => {
      let module = CommonUtility.getModuleFromLocationPath(
        '/scs/symphony/inbound'
      );
      expect(module).toBe('inbound');

      module = CommonUtility.getModuleFromLocationPath(
        '/scs/symphony/outbound'
      );
      expect(module).toBe('outbound');

      module = CommonUtility.getModuleFromLocationPath(
        '/scs/symphony/shipments'
      );
      expect(module).toBe('shipments');
    });

    it('Calculate Percentage', () => {
      let percentage = CommonUtility.calculatePercentage('20', '10');
      expect(percentage).toBe('100');

      percentage = CommonUtility.calculatePercentage('20', '0');
      expect(percentage).toBeNull();

      percentage = CommonUtility.calculatePercentage('20xyz', '10');
      expect(percentage).toBeNull();

      percentage = CommonUtility.calculatePercentage(null, '10');
      expect(percentage).toBeNull();
    });

    it('Get Differential Percentage FormattedString Percentage', () => {
      let percentage = CommonUtility.getDifferentialPercentageFormattedString(
        '20',
        '10'
      );
      expect(percentage).toBe('+100%');

      percentage = CommonUtility.getDifferentialPercentageFormattedString(
        '20',
        '20'
      );
      expect(percentage).toBe('0%');

      percentage = CommonUtility.getDifferentialPercentageFormattedString(
        '5',
        '10'
      );
      expect(percentage).toBe('-50%');

      percentage = CommonUtility.getDifferentialPercentageFormattedString(
        '20',
        '0'
      );
      expect(percentage).toBeNull();

      percentage = CommonUtility.getDifferentialPercentageFormattedString(
        '20xyz',
        '10'
      );
      expect(percentage).toBeNull();

      percentage = CommonUtility.getDifferentialPercentageFormattedString(
        null,
        '10'
      );
      expect(percentage).toBeNull();
    });
    it('Should call modifyListToLibSelectInputFormat and modify array', () => {
      const res = CommonUtility.modifyListToLibSelectInputFormat([
        '123',
        '456',
      ]);
      expect(res[0].value).toBe('123');
      expect(res[1].viewValue).toBe('456');
    });
  });
  it('should call getFormattedCostString', () => {
    let formattedString = CommonUtility.getFormattedCostString('20.12345');
    expect(formattedString).toBe('20.12');

    formattedString = CommonUtility.getFormattedCostString('0');
    expect(formattedString).toBe('0.00');

    formattedString = CommonUtility.getFormattedCostString('51234.1284');
    expect(formattedString).toBe('51,234.13');

    formattedString = CommonUtility.getFormattedCostString('0', '2.2-2');
    expect(formattedString).toBe('00.00');

    formattedString = CommonUtility.getFormattedCostString('12345678');
    expect(formattedString).toBe('12,345,678.00');
  });

  it('should call removeComma', () => {
    let formattedString = CommonUtility.removeComma('2,000.12');
    expect(formattedString).toBe('2000.12');

    formattedString = CommonUtility.removeComma('2-000', '-');
    expect(formattedString).toBe('2000');

    formattedString = CommonUtility.removeComma('1,122,000');
    expect(formattedString).toBe('1122000');
  });

  it('should call window methods', () => {
    let location = CommonUtility.getWindowLocationProperty();
    expect(location).toBe(window.location);
    let hostname = CommonUtility.getWindowLocationProperty('hostname');
    expect(hostname).toBe(window.location.hostname);
    let pathname = CommonUtility.getWindowLocationProperty('pathname');
    expect(pathname).toBe(window.location.pathname);
  });

  it('should call renameObjectKeys', () => {
    let obj: any = { a: 'a' };
    CommonUtility.renameObjectKeys(obj, 'a', 'b');
    expect(obj).toEqual({ b: 'a' });
  });

  it('should call clearUserProfile', () => {
    const spy1 = spyOn(SessionStorageUtility, 'clearUserProfile');
    const spy2 = spyOn(LocalStorageUtility, 'clearUserProfile');
    CommonUtility.clearUserProfile();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should call unicodeToChar', () => {
    expect(CommonUtility.unicodeToChar('abc')).toEqual('abc');
  });

  it('should call getMilestoneLabel', () => {
    expect(CommonUtility.getMilestoneLabel('abc')).toEqual('abc');
    expect(CommonUtility.getMilestoneLabel('delivered')).toEqual('Delivered');
  });

  it('should call getBlueBarDate', () => {
    expect(
      CommonUtility.getBlueBarDate({
        actualDeliveryDateTime: null,
        shipmentEstimatedDateTime: 'abc',
      })
    ).toEqual({
      deliveredDate: '',
      deliveryETA: 'abc',
    });
    expect(
      CommonUtility.getBlueBarDate({
        actualDeliveryDateTime: 'abc',
        shipmentEstimatedDateTime: null,
      })
    ).toEqual({
      deliveredDate: 'abc',
      deliveryETA: '',
    });
  });

  it('should call updateStylingForHeaderBanner', () => {
    let dummyElement = document.createElement('div');
    dummyElement.classList.add('header-banner-visible');
    let spy = spyOn(document, 'querySelector');
    spy.and.returnValue(dummyElement);
    expect(CommonUtility.updateStylingForHeaderBanner()).toEqual(true);

    dummyElement = document.createElement('div');
    dummyElement.classList.add('header-banner-visible1');
    spy.and.returnValue(dummyElement);
    expect(CommonUtility.updateStylingForHeaderBanner()).toEqual(false);

    spy.and.returnValue(null);
    expect(CommonUtility.updateStylingForHeaderBanner()).toEqual(false);
  });

  it('should call addRemoveScrollClassFromPanel', () => {
    let renderer = jasmine.createSpyObj(Renderer2, ['addClass', 'removeClass']);
    CommonUtility.addRemoveScrollClassFromPanel(renderer, false);
    expect(renderer.addClass).toHaveBeenCalled();

    CommonUtility.addRemoveScrollClassFromPanel(renderer, true);
    expect(renderer.removeClass).toHaveBeenCalled();
  });
});
