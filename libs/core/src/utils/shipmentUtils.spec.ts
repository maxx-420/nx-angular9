// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import ShipmentUtility from './shipmentUtils';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import ViewportUtility from './viewport';
import { AnalyticsService } from '../service/analytics-wrapper/analytics.service';
import { TaggingService } from './../service/tagging-service/tagging.service';
import { UserAgentUtility } from './user-agent.util';
import { CustomEncoder } from './customEncoder';
import {
  ROUTER_CONSTANTS,
  CARRIER_LINK_REDIRECTION,
  SHIPMENT_STATUS,
  ACCOUNT_TYPE_CONSTANTS,
} from '../constants';
import { AccessControlUtility } from './access-control.util';

describe('getMilestoneStatus', () => {
  it('should give current milestone status', () => {
    const completedStep = {
      id: 'Warehouse',
      name: 'WAREHOUSE',
      milestoneCompletionDateTime: '2020-05-06',
      milestoneEstimatedDateTime: null,
      activityCount: 3,
      order: 1,
    };

    const upcomingStep = {
      id: 'Customs',
      name: 'CUSTOMS',
      milestoneCompletionDateTime: null,
      milestoneEstimatedDateTime: null,
      activityCount: 0,
      order: 4,
    };

    const inProgressStep = {
      id: 'Departure',
      name: 'DEPARTURE',
      milestoneCompletionDateTime: null,
      milestoneEstimatedDateTime: '20-05-2020',
      activityCount: 1,
      order: 3,
    };

    expect(ShipmentUtility.getMilestoneStatus(completedStep)).toBe('completed');
    expect(ShipmentUtility.getMilestoneStatus(upcomingStep)).toBe('upcoming');
    expect(ShipmentUtility.getMilestoneStatus(inProgressStep)).toBe(
      'inProgress'
    );
  });
});

describe('goBackToList', () => {
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

  it('should return correct value for isShipmentClicked and selectedStep', () => {
    expect(ShipmentUtility.goBackToList('', router, true, 100)).toEqual({
      isShipmentClicked: true,
      selectedStep: '',
    });
    expect(
      ShipmentUtility.goBackToList('shipment', router, true, 100)
    ).toEqual({ isShipmentClicked: true, selectedStep: 'shipment' });
    expect(
      ShipmentUtility.goBackToList('warehouse', router, false, 100)
    ).toEqual({ isShipmentClicked: false, selectedStep: 'warehouse' });

    spyOn(ViewportUtility, 'checkViewport').and.returnValue(true);
    expect(
      ShipmentUtility.goBackToList('shipment', router, true, 100)
    ).toEqual({ isShipmentClicked: false, selectedStep: '' });
    expect(
      ShipmentUtility.goBackToList('warehouse', router, true, 100)
    ).toEqual({ isShipmentClicked: true, selectedStep: '' });
  });
});

describe('parseAddresses', () => {
  const milestoneData = {
    primaryDetail: {
      info: {
        upsWMSOrderNumber: '44381926',
        clientRefNumber: '3176832132',
        carrierServiceLevel: 'Air',
        clientRefPONo: '612786128',
        upsTMSShipmentNo: '12122',
      },
      addresses: [
        {
          line1: 'LTD BLDG 2 ',
          line2: 'NO.88 LANE1276 NANLE RD',
          city: 'SONGJIANG SHANGHAI',
          zipCode: '201611',
          state: 'state',
          country: 'CHINA',
          type: 'Origin',
        },
        {
          line1: 'LTD BLDG 2 ',
          line2: 'NO.88 LANE1276 NANLE RD',
          city: 'SONGJIANG SHANGHAI',
          zipCode: '201611',
          state: 'state',
          country: 'CHINA',
          type: 'Destination',
        },
      ],
    },
    alerts: [
      {
        alertCode: 'late',
        alertDateTime: '2020-05-06T12:06:30.4Z',
        alertMessage: 'Expected Delivery date has changed',
      },
      {
        alertCode: 'changeInCarrier',
        alertDateTime: '2020-05-06T12:06:30.4Z',
        alertMessage: 'Carrier has changed',
      },
    ],
    milestones: [
      {
        id: 'Warehouse',
        name: 'WAREHOUSE',
        milestoneCompletionDateTime: '20-05-2020',
        milestoneEstimatedDateTime: null,
        activityCount: 3,
        order: 1,
      },
      {
        id: 'Booking',
        name: 'BOOKING',
        milestoneCompletionDateTime: '20-05-2020',
        milestoneEstimatedDateTime: null,
        activityCount: 1,
        order: 2,
      },
      {
        id: 'Departure',
        name: 'DEPARTURE',
        milestoneCompletionDateTime: null,
        milestoneEstimatedDateTime: '20-05-2020',
        activityCount: 1,
        order: 3,
      },
      {
        id: 'Customs',
        name: 'CUSTOMS',
        milestoneCompletionDateTime: null,
        milestoneEstimatedDateTime: null,
        activityCount: 0,
        order: 4,
      },
      {
        id: 'Delivery',
        name: 'DELIVERY',
        milestoneCompletionDateTime: null,
        milestoneEstimatedDateTime: '20-05-2020',
        activityCount: 0,
        order: 5,
      },
    ],
    items: [
      {
        itemNo: '726951925',
        description: 'SUMMER ASSORTMENT',
        shipmentQty: '0.0',
        shippedQty: '210.0',
        shipmentDimensions: {
          length: '12.0000',
          width: '13.0000',
          height: '3.0000',
          unitOfMeasurement: {
            name: 'IN',
            symbol: "''",
          },
        },
        shipmentWeight: {
          weight: '8.0000',
          unitOfMeasurement: {
            name: 'KGS',
            symbol: 'kg',
          },
        },
      },
    ],
    documents: [
      {
        name: 'QUOTE',
        url: 'www.Symphpony.com/Quote',
      },
      {
        name: 'PURCHASE ORDER',
        url: 'www.Symphpony.com/Quote',
      },
    ],
    shipmentNotes: [
      {
        dateTime: '2020-05-18T12:06:30',
        description: 'Lorem Ipsum',
      },
    ],
    errorDetails: null,
    success: true,
  };

  const parsedAddress = {
    origin: {
      line1: 'LTD BLDG 2 ',
      line2: 'NO.88 LANE1276 NANLE RD',
      city: 'SONGJIANG SHANGHAI',
      zipCode: '201611',
      state: 'state',
      country: 'CHINA',
      type: 'Origin',
    },
    destination: {
      line1: 'LTD BLDG 2 ',
      line2: 'NO.88 LANE1276 NANLE RD',
      city: 'SONGJIANG SHANGHAI',
      zipCode: '201611',
      state: 'state',
      country: 'CHINA',
      type: 'Destination',
    },
  };

  it('should return correct parsed address', () => {
    expect(ShipmentUtility.parseAddresses(milestoneData)).toEqual(
      parsedAddress
    );
  });
});

describe('getStringAddressForGoogleMap', () => {
  it('should return correct parsed address', () => {
    const customEncoder = new CustomEncoder();
    expect(
      customEncoder.decodeValue(
        ShipmentUtility.getStringAddressForGoogleMap({
          line1: 'LTD BLDG 2 ',
          line2: 'NO.88 LANE1276 NANLE RD',
          city: 'SONGJIANG SHANGHAI',
          zipCode: '201611',
          state: 'state',
          country: 'CHINA',
          type: 'Origin',
        })
      )
    ).toEqual(
      'LTD+BLDG+2+,+NO.88+LANE1276+NANLE+RD,+SONGJIANG+SHANGHAI,+state,+CHINA,+201611'
    );
    expect(
      customEncoder.decodeValue(
        ShipmentUtility.getStringAddressForGoogleMap({
          line2: 'NO.88 LANE1276 NANLE RD',
          city: 'SONGJIANG SHANGHAI',
          zipCode: '201611',
          state: 'state',
          country: 'CHINA',
          type: 'Origin',
        })
      )
    ).toEqual(
      ',+NO.88+LANE1276+NANLE+RD,+SONGJIANG+SHANGHAI,+state,+CHINA,+201611'
    );
    expect(
      customEncoder.decodeValue(
        ShipmentUtility.getStringAddressForGoogleMap({
          line1: 'LTD BLDG 2 ',
          city: 'SONGJIANG SHANGHAI',
          zipCode: '201611',
          state: 'state',
          country: 'CHINA',
          type: 'Origin',
        })
      )
    ).toEqual('LTD+BLDG+2+,+,+SONGJIANG+SHANGHAI,+state,+CHINA,+201611');
    expect(
      customEncoder.decodeValue(
        ShipmentUtility.getStringAddressForGoogleMap({
          line1: 'LTD BLDG 2 ',
          line2: 'NO.88 LANE1276 NANLE RD',
          city: 'SONGJIANG SHANGHAI',
          zipCode: '201611',
          country: 'CHINA',
          type: 'Origin',
        })
      )
    ).toEqual(
      'LTD+BLDG+2+,+NO.88+LANE1276+NANLE+RD,+SONGJIANG+SHANGHAI,+,+CHINA,+201611'
    );
    expect(
      customEncoder.decodeValue(
        ShipmentUtility.getStringAddressForGoogleMap({
          line1: 'LTD BLDG 2 ',
          line2: 'NO.88 LANE1276 NANLE RD',
          city: 'SONGJIANG SHANGHAI',
          zipCode: '201611',
          state: 'state',
          type: 'Origin',
        })
      )
    ).toEqual(
      'LTD+BLDG+2+,+NO.88+LANE1276+NANLE+RD,+SONGJIANG+SHANGHAI,+state,+,+201611'
    );

    expect(
      customEncoder.decodeValue(
        ShipmentUtility.getStringAddressForGoogleMap({})
      )
    ).toBe(',+,+,+,+,+');
  });
});

describe('showCarrierLink', () => {
  it('should return true if carrier code or carrier name contains UPS', () => {
    expect(ShipmentUtility.showCarrierLink('UPS1234', 'UPS')).toBe(true);
    expect(ShipmentUtility.showCarrierLink('1234', 'UPS1234')).toBe(true);
    expect(ShipmentUtility.showCarrierLink('1234UpS', '1234')).toBe(true);
    expect(ShipmentUtility.showCarrierLink('1234', '1234')).toBe(false);
  });
});

describe('filterCarrierShipmentsTableData', () => {
  it('should call filterCarrierShipmentsTableData', () => {
    const carrierShipmentsTableData = [
      { shipmentNumber: '', data: 'a' },
      { shipmentNumber: '  ', data: 'b' },
      { shipmentNumber: null, data: 'c' },
      { shipmentNumber: 'abc', data: 'd' },
      { shipmentNumber: 'NA', data: 'd' },
    ];

    const result = ShipmentUtility.filterCarrierShipmentsTableData(
      carrierShipmentsTableData
    );
    expect(result).toEqual([{ shipmentNumber: 'abc', data: 'd' }]);
  });
});

describe('isUPSShipmentServiceLevel', () => {
  it('should return true if shipment service level contains UPS', () => {
    expect(ShipmentUtility.isUPSShipmentServiceLevel('UPS1234')).toBe(true);
    expect(ShipmentUtility.isUPSShipmentServiceLevel('123UPS4')).toBe(true);
    expect(ShipmentUtility.isUPSShipmentServiceLevel('1234')).toBe(false);
    expect(ShipmentUtility.isUPSShipmentServiceLevel(null)).toBe(false);
  });
});

describe('sortMilestonesAndAddStatusField', () => {
  it('should set all milestones status as completed when shipment is completed', () => {
    let milestones = [
      {
        id: 'Booking',
        name: 'Booking',
        milestoneCompletionDateTime: '2020-06-16',
        milestoneEstimatedDateTime: '2020-06-15',
        activityCount: '1',
        order: '1',
      },
      {
        id: 'Departure',
        name: 'Departure',
        milestoneCompletionDateTime: '2020-06-20',
        milestoneEstimatedDateTime: '2020-06-20',
        activityCount: '2',
        order: '2',
      },
      {
        id: 'Delivery',
        name: 'Delivery',
        milestoneCompletionDateTime: null,
        milestoneEstimatedDateTime: '2020-06-29',
        activityCount: '2',
        order: '3',
      },
      {
        id: 'Receiving',
        name: 'Receiving',
        milestoneCompletionDateTime: null,
        milestoneEstimatedDateTime: null,
        activityCount: '1',
        order: '4',
      },
      {
        id: 'Putaway',
        name: 'Putaway',
        milestoneCompletionDateTime: '2020-07-07',
        milestoneEstimatedDateTime: '2020-07-07',
        activityCount: '2',
        order: '5',
      },
    ];

    let sortedMilestonesWithStatusField = [
      {
        id: 'Booking',
        name: 'Booking',
        milestoneCompletionDateTime: '2020-06-16',
        milestoneEstimatedDateTime: '2020-06-15',
        activityCount: '1',
        order: '1',
        status: 'completed',
      },
      {
        id: 'Departure',
        name: 'Departure',
        milestoneCompletionDateTime: '2020-06-20',
        milestoneEstimatedDateTime: '2020-06-20',
        activityCount: '2',
        order: '2',
        status: 'completed',
      },
      {
        id: 'Delivery',
        name: 'Delivery',
        milestoneCompletionDateTime: null,
        milestoneEstimatedDateTime: '2020-06-29',
        activityCount: '2',
        order: '3',
        status: 'completed',
      },
      {
        id: 'Receiving',
        name: 'Receiving',
        milestoneCompletionDateTime: null,
        milestoneEstimatedDateTime: null,
        activityCount: '1',
        order: '4',
        status: 'completed',
      },
      {
        id: 'Putaway',
        name: 'Putaway',
        milestoneCompletionDateTime: '2020-07-07',
        milestoneEstimatedDateTime: '2020-07-07',
        activityCount: '2',
        order: '5',
        status: 'completed',
      },
    ];
    expect(ShipmentUtility.sortMilestonesAndAddStatusField(milestones)).toEqual(
      sortedMilestonesWithStatusField
    );
  });

  it('should set previous milestones status as completed when delivery is completed', () => {
    let milestones = [
      {
        id: 'Booking',
        name: 'Booking',
        milestoneCompletionDateTime: '2020-06-16',
        milestoneEstimatedDateTime: '2020-06-15',
        activityCount: '1',
        order: '1',
      },
      {
        id: 'Departure',
        name: 'Departure',
        milestoneCompletionDateTime: null,
        milestoneEstimatedDateTime: '2020-06-20',
        activityCount: '2',
        order: '2',
      },
      {
        id: 'Delivery',
        name: 'Delivery',
        milestoneCompletionDateTime: '2020-06-29',
        milestoneEstimatedDateTime: '2020-06-29',
        activityCount: '2',
        order: '3',
      },
      {
        id: 'Receiving',
        name: 'Receiving',
        milestoneCompletionDateTime: null,
        milestoneEstimatedDateTime: null,
        activityCount: '1',
        order: '4',
      },
      {
        id: 'Putaway',
        name: 'Putaway',
        milestoneCompletionDateTime: null,
        milestoneEstimatedDateTime: null,
        activityCount: '2',
        order: '5',
      },
    ];

    let sortedMilestonesWithStatusField = [
      {
        id: 'Booking',
        name: 'Booking',
        milestoneCompletionDateTime: '2020-06-16',
        milestoneEstimatedDateTime: '2020-06-15',
        activityCount: '1',
        order: '1',
        status: 'completed',
      },
      {
        id: 'Departure',
        name: 'Departure',
        milestoneCompletionDateTime: null,
        milestoneEstimatedDateTime: '2020-06-20',
        activityCount: '2',
        order: '2',
        status: 'completed',
      },
      {
        id: 'Delivery',
        name: 'Delivery',
        milestoneCompletionDateTime: '2020-06-29',
        milestoneEstimatedDateTime: '2020-06-29',
        activityCount: '2',
        order: '3',
        status: 'completed',
      },
      {
        id: 'Receiving',
        name: 'Receiving',
        milestoneCompletionDateTime: null,
        milestoneEstimatedDateTime: null,
        activityCount: '1',
        order: '4',
        status: 'inProgress',
      },
      {
        id: 'Putaway',
        name: 'Putaway',
        milestoneCompletionDateTime: null,
        milestoneEstimatedDateTime: null,
        activityCount: '2',
        order: '5',
        status: 'inProgress',
      },
    ];
    expect(
      ShipmentUtility.sortMilestonesAndAddStatusField(milestones, null, [
        SHIPMENT_STATUS.delivery,
      ])
    ).toEqual(sortedMilestonesWithStatusField);
  });

  it('should set Booking and warehouse as completed when departure is completed and shipment is managed outbound', () => {
    let milestones = [
      {
        id: 'Created',
        name: 'Created',
        milestoneCompletionDateTime: '2020-06-30',
        milestoneEstimatedDateTime: '2020-06-30',
        activityCount: '1',
        order: '1',
      },
      {
        id: 'Booking',
        name: 'Booking',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '2020-07-02',
        activityCount: '1',
        order: '2',
      },
      {
        id: 'Warehouse',
        name: 'Warehouse',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '2020-07-01',
        activityCount: '2',
        order: '3',
      },
      {
        id: 'Departure',
        name: 'Departure',
        milestoneCompletionDateTime: '2020-08-01',
        milestoneEstimatedDateTime: '',
        activityCount: '0',
        order: '4',
      },
      {
        id: 'Customs',
        name: 'Customs',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '',
        activityCount: '0',
        order: '5',
      },
      {
        id: 'Delivery',
        name: 'Delivery',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '2020-07-06',
        activityCount: '0',
        order: '6',
      },
    ];

    let sortedMilestonesWithStatusField = [
      {
        id: 'Created',
        name: 'Created',
        milestoneCompletionDateTime: '2020-06-30',
        milestoneEstimatedDateTime: '2020-06-30',
        activityCount: '1',
        order: '1',
        status: 'completed',
      },
      {
        id: 'Booking',
        name: 'Booking',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '2020-07-02',
        activityCount: '1',
        order: '2',
        status: 'completed',
      },
      {
        id: 'Warehouse',
        name: 'Warehouse',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '2020-07-01',
        activityCount: '2',
        order: '3',
        status: 'completed',
      },
      {
        id: 'Departure',
        name: 'Departure',
        milestoneCompletionDateTime: '2020-08-01',
        milestoneEstimatedDateTime: '',
        activityCount: '0',
        order: '4',
        status: 'completed',
      },
      {
        id: 'Customs',
        name: 'Customs',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '',
        activityCount: '0',
        order: '5',
        status: 'upcoming',
      },
      {
        id: 'Delivery',
        name: 'Delivery',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '2020-07-06',
        activityCount: '0',
        order: '6',
        status: 'upcoming',
      },
    ];
    expect(
      ShipmentUtility.sortMilestonesAndAddStatusField(
        milestones,
        'ManagedOutbound'
      )
    ).toEqual(sortedMilestonesWithStatusField);
  });

  it('should not set Booking and warehouse as completed when they are in progress and departure is complete but its id is null', () => {
    let milestones = [
      {
        id: 'Created',
        name: 'Created',
        milestoneCompletionDateTime: '2020-06-30',
        milestoneEstimatedDateTime: '2020-06-30',
        activityCount: '1',
        order: '1',
      },
      {
        id: 'Booking',
        name: 'Booking',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '2020-07-02',
        activityCount: '1',
        order: '2',
      },
      {
        id: 'Warehouse',
        name: 'Warehouse',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '2020-07-01',
        activityCount: '2',
        order: '3',
      },
      {
        id: null,
        name: 'Departure',
        milestoneCompletionDateTime: '2020-08-01',
        milestoneEstimatedDateTime: '',
        activityCount: '0',
        order: '4',
      },
      {
        id: 'Customs',
        name: 'Customs',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '',
        activityCount: '0',
        order: '5',
      },
      {
        id: 'Delivery',
        name: 'Delivery',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '2020-07-06',
        activityCount: '0',
        order: '6',
      },
    ];

    let sortedMilestonesWithStatusField = [
      {
        id: 'Created',
        name: 'Created',
        milestoneCompletionDateTime: '2020-06-30',
        milestoneEstimatedDateTime: '2020-06-30',
        activityCount: '1',
        order: '1',
        status: 'completed',
      },
      {
        id: 'Booking',
        name: 'Booking',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '2020-07-02',
        activityCount: '1',
        order: '2',
        status: 'inProgress',
      },
      {
        id: 'Warehouse',
        name: 'Warehouse',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '2020-07-01',
        activityCount: '2',
        order: '3',
        status: 'inProgress',
      },
      {
        id: null,
        name: 'Departure',
        milestoneCompletionDateTime: '2020-08-01',
        milestoneEstimatedDateTime: '',
        activityCount: '0',
        order: '4',
        status: 'completed',
      },
      {
        id: 'Customs',
        name: 'Customs',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '',
        activityCount: '0',
        order: '5',
        status: 'upcoming',
      },
      {
        id: 'Delivery',
        name: 'Delivery',
        milestoneCompletionDateTime: '',
        milestoneEstimatedDateTime: '2020-07-06',
        activityCount: '0',
        order: '6',
        status: 'upcoming',
      },
    ];
    expect(
      ShipmentUtility.sortMilestonesAndAddStatusField(
        milestones,
        'ManagedOutbound'
      )
    ).toEqual(sortedMilestonesWithStatusField);
  });
});

describe('getShipmentType', () => {
  beforeEach(() => {
    let shipmentConfig: any = {
      MI: [
        'WH-MANTRAN-IN-INT',
        'WH-MANTRAN-IN-DOM',
        'WH-MANTRAN-IN-INT-FTZ',
        'WH-MANTRAN-IN-DOM-FTZ',
      ],
      NMI: ['WH-IN'],
      MO: [
        'WH-MANTRAN-OUT-INT',
        'WH-MANTRAN-OUT-DOM',
        'WH-MANTRAN-OUT-DOM-PS',
        'WH-MANTRAN-OUT-INT-PS',
      ],
      NMO: ['WH-OUT'],
    };
    spyOn(AccessControlUtility, 'getCurrentFieldMapping').and.returnValue(
      shipmentConfig
    );
  });
  it('should return correct shipment type', () => {
    expect(ShipmentUtility.getShipmentType('inbound', 'WH-IN')).toBe(
      'NonManagedInbound'
    );
    expect(ShipmentUtility.getShipmentType('outbound', 'WH-OUT')).toBe(
      'NonManagedOutbound'
    );
    expect(
      ShipmentUtility.getShipmentType('inbound', 'WH-MANTRAN-IN-INT')
    ).toBe('ManagedInbound');
    expect(
      ShipmentUtility.getShipmentType('outbound', 'WH-MANTRAN-OUT-INT')
    ).toBe('ManagedOutbound');
    expect(ShipmentUtility.getShipmentType('abcd', 'WH-MANTRAN-OUT-INT')).toBe(
      undefined
    );
  });
});

describe('onCarrierShipmentLinkClick', () => {
  it('should create link as per usps carrier Name', () => {
    let spy = spyOn(window, 'open');
    ShipmentUtility.onCarrierShipmentLinkClick('123', null, true, {
      carrierName: 'usps',
    });
    const url = CARRIER_LINK_REDIRECTION.usps.replace(
      '%%tracking_number%%',
      '123'
    );
    expect(spy).toHaveBeenCalledWith(url, '_blank');
  });

  it('should create link as per fedex carrier Name', () => {
    let spy = spyOn(window, 'open');
    ShipmentUtility.onCarrierShipmentLinkClick('123', null, true, {
      carrierName: 'fedex',
    });
    const url = CARRIER_LINK_REDIRECTION.fedex.replace(
      '%%tracking_number%%',
      '123'
    );
    expect(spy).toHaveBeenCalledWith(url, '_blank');
  });

  it('should create link as per expeditors carrier Name', () => {
    let spy = spyOn(window, 'open');
    ShipmentUtility.onCarrierShipmentLinkClick('123', null, true, {
      carrierName: 'expeditors',
    });
    const url = CARRIER_LINK_REDIRECTION.expeditors.replace(
      '%%tracking_number%%',
      '123'
    );
    expect(spy).toHaveBeenCalledWith(url, '_blank');
  });

  it('should create link as per ups carrier Name', () => {
    let spy = spyOn(window, 'open');
    ShipmentUtility.onCarrierShipmentLinkClick('123', null, false, {
      carrierName: 'ups',
    });
    const url = CARRIER_LINK_REDIRECTION.ups.replace(
      '%%tracking_number%%',
      '123'
    );
    expect(spy).toHaveBeenCalledWith(url, '_blank');
  });

  it('should create ups link for invalid carrier name or no carrier name present', () => {
    let spy = spyOn(window, 'open');
    ShipmentUtility.onCarrierShipmentLinkClick('123', null, false, undefined);
    const url = CARRIER_LINK_REDIRECTION.ups.replace(
      '%%tracking_number%%',
      '123'
    );
    expect(spy).toHaveBeenCalledWith(url, '_blank');
  });

  it('should not call createLinkClickTagObject when analyticsService reference is not passed', () => {
    let analyticsService = new AnalyticsService(new TaggingService());
    let spy = spyOn(analyticsService, 'createLinkClickTagObject');
    ShipmentUtility.onCarrierShipmentLinkClick('123', null);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should call createLinkClickTagObject when analyticsService reference is passed', () => {
    let analyticsService = new AnalyticsService(new TaggingService());
    let spy = spyOn(analyticsService, 'createLinkClickTagObject');
    ShipmentUtility.onCarrierShipmentLinkClick('123', null);
    expect(spy).toHaveBeenCalledTimes(0);
    ShipmentUtility.onCarrierShipmentLinkClick('123', analyticsService);
    expect(spy).toHaveBeenCalled();
  });
});

describe('formatDateSummaryData', () => {
  let dailySummary = [
    {
      id: 'DAY1',
      date: '2020-09-16 00:00:00',
      count: '7',
    },
    {
      id: 'DAY2',
      date: '2020-09-17 00:00:00',
      count: '0',
    },
    {
      id: 'DAY3',
      date: '2020-09-18 00:00:00',
      count: '0',
    },
    {
      id: 'DAY4',
      date: '2020-09-19 00:00:00',
      count: '0',
    },
    {
      id: 'DAY5',
      date: '2020-09-20 00:00:00',
      count: '0',
    },
    {
      id: 'DAY6',
      date: '2020-09-21 00:00:00',
      count: '0',
    },
    {
      id: 'DAY7',
      date: '2020-09-22 00:00:00',
      count: '0',
    },
  ];

  it('should sort summary according to date and should not replace space in date with T when browser is not IE', () => {
    expect(ShipmentUtility.formatDateSummaryData(dailySummary)).toEqual([
      { id: 'DAY1', date: '2020-09-16 00:00:00', count: '7' },
      { id: 'DAY2', date: '2020-09-17 00:00:00', count: '0' },
      { id: 'DAY3', date: '2020-09-18 00:00:00', count: '0' },
      { id: 'DAY4', date: '2020-09-19 00:00:00', count: '0' },
      { id: 'DAY5', date: '2020-09-20 00:00:00', count: '0' },
      { id: 'DAY6', date: '2020-09-21 00:00:00', count: '0' },
      { id: 'DAY7', date: '2020-09-22 00:00:00', count: '0' },
    ]);
  });

  it('should replace space character with T when browser is IE and sort according to date', () => {
    spyOn(UserAgentUtility, 'isIE').and.returnValue(true);
    expect(ShipmentUtility.formatDateSummaryData(dailySummary)).toEqual([
      { id: 'DAY1', date: '2020-09-16T00:00:00', count: '7' },
      { id: 'DAY2', date: '2020-09-17T00:00:00', count: '0' },
      { id: 'DAY3', date: '2020-09-18T00:00:00', count: '0' },
      { id: 'DAY4', date: '2020-09-19T00:00:00', count: '0' },
      { id: 'DAY5', date: '2020-09-20T00:00:00', count: '0' },
      { id: 'DAY6', date: '2020-09-21T00:00:00', count: '0' },
      { id: 'DAY7', date: '2020-09-22T00:00:00', count: '0' },
    ]);
  });
});

describe('getCancellationAlertData', () => {
  it('should return alert data object', () => {
    expect(
      ShipmentUtility.getCancellationAlertData(
        {
          upsWMSOrderNumber: '86019262',
          clientRefNumber: '74018344',
          carrierServiceLevel: 'CS US - UPS Ground Residential',
          clientRefPONo: '1642207471',
          upsTMSShipmentNo: '86019262',
          scheduledDelivery: '2020-07-04 12:00',
          createdOn: '2020-07-03 12:00',
          shipmentMode: 'Air',
          templateType: 'WH-MANTRAN-OUT-DOM',
          shipmentServiceLevel: 'EDT-CS UPS EMEA -  Standard DUSS',
          cancellationDateTime: '2020-09-22 00:00:00',
          cancellationReason: 'Out of stock',
        },
        'Shipment Cancelled'
      )
    ).toEqual({
      alertDateTime: '2020-09-22 00:00:00',
      alertMessage: 'Shipment Cancelled: Out of stock',
    });

    expect(
      ShipmentUtility.getCancellationAlertData(
        {
          upsWMSOrderNumber: '86019262',
          clientRefNumber: '74018344',
          carrierServiceLevel: 'CS US - UPS Ground Residential',
          clientRefPONo: '1642207471',
          upsTMSShipmentNo: '86019262',
          scheduledDelivery: '2020-07-04 12:00',
          createdOn: '2020-07-03 12:00',
          shipmentMode: 'Air',
          templateType: 'WH-MANTRAN-OUT-DOM',
          shipmentServiceLevel: 'EDT-CS UPS EMEA -  Standard DUSS',
          cancellationDateTime: null,
          cancellationReason: 'loren ipsum',
          isPartiallyCanceled: true,
        },
        'Partially Cancelled'
      )
    ).toEqual({
      alertDateTime: null,
      alertMessage: 'Partially Cancelled: loren ipsum',
    });
  });
});

describe('formatFinancialData', () => {
  it('should concatenate currency and values', () => {
    expect(
      ShipmentUtility.formatFinancialData([
        {
          claimType: 'ABC',
          claimAmount: '1000',
          claimAmountCurrency: 'USD',
          claimFilingDateTime: '2021-03-10 22:30:30',
          claimStatus: 'Closed',
          claimClosureDateTime: '2021-03-10 22:30:30',
          claimAmountPaid: '1000',
          claimAmountPaidCurrency: 'USD',
        },
      ])
    ).toEqual([
      {
        claimType: 'ABC',
        claimAmount: 'USD 1,000.00',
        claimAmountCurrency: 'USD',
        claimFilingDateTime: '2021-03-10 22:30:30',
        claimStatus: 'Closed',
        claimClosureDateTime: '2021-03-10 22:30:30',
        claimAmountPaid: '1000',
        claimAmountPaidCurrency: 'USD',
        claimPaidAmount: 'USD 1,000.00',
      },
    ]);
  });
});

describe('getMovementShipmentQueryParams', () => {
  it('should return GFF shipment query params', () => {
    const data = {
      upsShipmentNo: '86019262',
      referenceNo: '09736485656',
      exception: 'Customer Destination Closed',
      carrierShipmentNumber: ['1Z81RR540310448478'],
      customerPONumber: 'ABCD',
      orderShipped: '2020-11-01 12:00:31.497',
      scheduledDelivery: '2020-11-05 12:00:31.497',
      carrier: 'United Postal Service',
      status: 'Booked',
      productLine: 'GFF',
      accountType: 'MM',
      upsFileNumber: '1234',
      upsOffice: 'abcd',
    };
    expect(ShipmentUtility.getMovementShipmentQueryParams(data)).toEqual({
      productLine: 'GFF',
      accountType: 'MM',
      upsFileNumber: '1234',
      upsOffice: 'abcd',
    });
  });

  it('should return query params for non GFF shipment', () => {
    const data = {
      upsShipmentNo: '86019262',
      referenceNo: '09736485656',
      exception: 'Customer Destination Closed',
      carrierShipmentNumber: ['1Z81RR540310448478'],
      customerPONumber: 'ABCD',
      orderShipped: '2020-11-01 12:00:31.497',
      scheduledDelivery: '2020-11-05 12:00:31.497',
      carrier: 'United Postal Service',
      status: 'Booked',
      productLine: 'HLD',
      accountType: 'MM',
      upsFileNumber: null,
      upsOffice: null,
    };
    expect(ShipmentUtility.getMovementShipmentQueryParams(data)).toEqual({
      productLine: 'HLD',
      accountType: 'MM',
    });
  });
});

describe('navigateToMovementShipment', () => {
  it('should return GFF shipment query params', () => {
    const data = {
      upsShipmentNo: '86019262',
      productLine: 'GFF',
      accountType: 'MM',
      upsFileNumber: '1234',
      upsOffice: 'abcd',
    };
    const mockRouter = {
      navigate: (url, extras) => {},
    };
    const url = `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.details}/`;
    const mockState = {};
    let spy = spyOn(mockRouter, 'navigate');
    ShipmentUtility.navigateToMovementShipment(
      data,
      url,
      'upsShipmentNo',
      mockRouter,
      mockState
    );
    expect(spy).toHaveBeenCalled();
  });
});

describe('getShipmentTypes', () => {
  it('should return Inbound as shipment type when account type is MI', () => {
    spyOn(AccessControlUtility, 'isManagedInbound').and.returnValue(true);
    spyOn(AccessControlUtility, 'isManagedMovement').and.returnValue(false);

    expect(ShipmentUtility.getShipmentTypes()).toEqual([
      ACCOUNT_TYPE_CONSTANTS.categories.inbound,
    ]);
  });

  it('should return empty array as shipment type when account type is MI+MM', () => {
    spyOn(AccessControlUtility, 'isManagedMovement').and.returnValue(true);
    spyOn(AccessControlUtility, 'isManagedInbound').and.returnValue(true);

    expect(ShipmentUtility.getShipmentTypes().length).toEqual(0);
  });

  it('should return Movement as shipment type MM for all other cases', () => {
    spyOn(AccessControlUtility, 'isManagedMovement').and.returnValue(true);

    expect(ShipmentUtility.getShipmentTypes()).toEqual([
      ACCOUNT_TYPE_CONSTANTS.categories.movement,
    ]);
  });
});

describe('getConvergenceShipmentTypes', () => {
  it('should return Inbound as shipment type when account type is MI', () => {
    spyOn(AccessControlUtility, 'isManagedInbound').and.returnValue(true);
    spyOn(AccessControlUtility, 'isManagedMovement').and.returnValue(false);

    expect(ShipmentUtility.getConvergenceShipmentType()).toEqual([
      ACCOUNT_TYPE_CONSTANTS.categories.inbound,
    ]);
  });

  it('should return both as shipment type when account type is MI+MM', () => {
    spyOn(AccessControlUtility, 'isManagedMovement').and.returnValue(true);
    spyOn(AccessControlUtility, 'isManagedInbound').and.returnValue(true);

    expect(ShipmentUtility.getConvergenceShipmentType().length).toEqual(2);
  });

  it('should return Movement as shipment type when account type is MMM', () => {
    spyOn(AccessControlUtility, 'isManagedInbound').and.returnValue(false);
    spyOn(AccessControlUtility, 'isManagedMovement').and.returnValue(true);

    expect(ShipmentUtility.getConvergenceShipmentType()).toEqual([
      ACCOUNT_TYPE_CONSTANTS.categories.movement,
    ]);
  });
});
