// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import {
  ACCOUNT_TYPE_CONSTANTS,
  USER_AUTH_TYPE,
  ACCOUNT_SERVICELINES_CONSTANTS,
} from '../constants';
import { SHIPMENT_TYPE } from '../constants';
import { ACCESS_CONTROL_CONFIG } from '../global-config';
import { AccessControlUtility } from './access-control.util';
import { default as CommonUtility } from './commonUtil';
import { default as InclusionUtility } from './inclusion/inclusion-util';
import { SessionStorageUtility } from './sessionStorage';

const accountTypeExclusionData = [
  {
    type: 'Inbound',
    exclusions: {
      components: [
        'L2-IN-ShipmentListingTable-ScheduledDelivery',
        'L2-IN-ShipmentListingTable-OriginCity',
        'L2-IN-ShipmentListingTable-OriginCountry',
        'L2-IN-ShipmentListingTable-ServiceUsed',
        'L2-IN-ShipmentListingTable-BookedOn',
      ],
    },
  },
  {
    type: 'Outbound',
    exclusions: {
      components: ['L2-OUT-ShipmentListingTable-ScheduledDelivery'],
    },
  },
  {
    type: 'Warehouse',
    exclusions: {
      components: [
        'L2-WH-InboundMilestoneMetricsBar',
        'L2-WH-OutboundMilestoneMetricsBar',
        'L3-WH-InboundShipmentsByDeliveryDateLineGraph',
        'L3-WH-InboundShipmentsByModeBarGraph',
        'L3-WH-InboundShipmentsByStatusBarGraph',
        'L3-WH-InboundShipmentListingTable-BookedOn',
        'L3-WH-InboundShipmentListingTable-ScheduledDelivery',
        'L3-WH-InboundShipmentListingTable-OriginCity',
        'L3-WH-InboundShipmentListingTable-OriginCountry',
        'L3-WH-InboundShipmentListingTable-ServiceUsed',
        'L3-WH-InboundShipmentListingTable-ShipmentType',
      ],
    },
  },
];

const accountTypeDetails = [
  {
    accountTypeCategory: 'Inbound',
    accountTypes: ['MI'],
  },
  {
    accountTypeCategory: 'Outbound',
    accountTypes: ['MO'],
  },
];

const mockSessionStorage = {
  getAccountTypeDetails: () => {
    return accountTypeDetails;
  },

  get: () => {
    return true;
  },

  getPropValueFromObj: (key: string) => {
    return accountTypeExclusionData;
  },
};

const inboundL3ExclusionData = [
  'L3-IN-CarrierShipmentNumberCard',
  'L3-IN-DocumentCard',
  'L3-IN-CareerServiceLevel',
  'L3-IN-ShipmentMode',
  'L3-IN-BookedOn',
  'L3-IN-ScheduledDelivery',
  'L3-IN-Origin',
];

const inboundL2ExclusionData = [
  'L2-IN-ShipmentListingTable-ScheduledDelivery',
  'L2-IN-ShipmentListingTable-OriginCity',
  'L2-IN-ShipmentListingTable-OriginCountry',
  'L2-IN-ShipmentListingTable-ServiceUsed',
  'L2-IN-ShipmentListingTable-BookedOn',
];

const outboundL2ExclusionData = [
  'L2-OUT-ShipmentListingTable-ScheduledDelivery',
];

const warehouseExclusionData = [
  'L2-WH-InboundMilestoneMetricsBar',
  'L2-WH-OutboundMilestoneMetricsBar',
  'L3-WH-InboundShipmentsByDeliveryDateLineGraph',
  'L3-WH-InboundShipmentsByModeBarGraph',
  'L3-WH-InboundShipmentsByStatusBarGraph',
  'L3-WH-InboundShipmentListingTable-BookedOn',
  'L3-WH-InboundShipmentListingTable-ScheduledDelivery',
  'L3-WH-InboundShipmentListingTable-OriginCity',
  'L3-WH-InboundShipmentListingTable-OriginCountry',
  'L3-WH-InboundShipmentListingTable-ServiceUsed',
  'L3-WH-InboundShipmentListingTable-ShipmentType',
];

const companyDetails = [
  {
    name: 'Swarovski',
    id: 19,
    hasFtzAccess: false,
    eId: '5fe0abd56bb88949c9ecf7bb251cf8e8f5c4e2acab0674d4cc068ec3fac54253',
    productLines: [
      {
        productType: 'GLD',
        serviceLines: [
          {
            serviceLineName: 'FG',
          },
        ],
      },
      {
        productType: 'HLD',
        serviceLines: [
          {
            serviceLineName: 'Health',
          },
        ],
      },
      {
        productType: 'GFF',
      },
    ],
    unitName: null,
  },
];

describe('getCompanyDetails', () => {
  it('should return all selected company details', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.returnValue(companyDetails);
    expect(AccessControlUtility.getAllSelectedCompanyDetails().length).toEqual(
      1
    );
  });
  it('should return first selected company details', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.returnValue(companyDetails);
    expect(AccessControlUtility.getFirstSelectedCompanyDetails().name).toEqual(
      'Swarovski'
    );
  });
});

describe('getUserGroupAccess', () => {
  it('should check if serviceLines contain a service', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(() => {
      return companyDetails;
    });
    expect(
      AccessControlUtility.userHasServiceLine(
        ACCOUNT_SERVICELINES_CONSTANTS.finishedGoods
      )
    ).toBe(true);
  });
  it('should check if isPostSalesCustomer returns false', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(() => {
      return companyDetails;
    });
    expect(AccessControlUtility.isPostSalesCustomer()).toBe(false);
  });
  it('should check if isFinishedGoodsCustomer returns true', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(() => {
      return companyDetails;
    });
    expect(AccessControlUtility.isFinishedGoodsCustomer()).toBe(true);
  });
  it('should check if ftz access is there', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(() => {
      return [
        {
          hasFtzAccess: true,
        },
      ];
    });
    expect(AccessControlUtility.hasFtzAccess()).toBe(true);
  });
  it('should check if ftz access is not there', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(() => {
      return companyDetails;
    });
    expect(AccessControlUtility.hasFtzAccess()).toBe(false);
  });
  it('should return true if companyDetails have brokerage in product line', () => {
    spyOn(AccessControlUtility, 'getCompanyProductLineAccess').and.returnValue([
      ACCESS_CONTROL_CONFIG.productLine.brokerage,
    ]);
    spyOn(SessionStorageUtility, 'get').and.returnValue(null);
    expect(
      AccessControlUtility.checkProductLineAccess(
        ACCESS_CONTROL_CONFIG.productLine.brokerage
      )
    ).toBe(true);
  });
  it('should return false if userDetails does not have brokerage in product line', () => {
    spyOn(AccessControlUtility, 'getCompanyProductLineAccess').and.returnValue([
      ACCESS_CONTROL_CONFIG.productLine.gld,
    ]);
    spyOn(SessionStorageUtility, 'get').and.returnValue(null);
    expect(
      AccessControlUtility.checkProductLineAccess(
        ACCESS_CONTROL_CONFIG.productLine.brokerage
      )
    ).toBe(false);
  });
  it('should return true if userDetails have only Brokerage in product line', () => {
    spyOn(AccessControlUtility, 'getCompanyProductLineAccess').and.returnValue([
      ACCESS_CONTROL_CONFIG.productLine.brokerage,
    ]);
    spyOn(AccessControlUtility, 'checkAccountTypeAccess').and.returnValue(true);
    expect(AccessControlUtility.isUCPAccessOnly()).toBe(true);
  });
  it('should return true if userDetails have Brokerage in product line', () => {
    spyOn(AccessControlUtility, 'getCompanyProductLineAccess').and.returnValue([
      ACCESS_CONTROL_CONFIG.productLine.brokerage,
    ]);
    spyOn(AccessControlUtility, 'checkAccountTypeAccess').and.returnValue(true);
    expect(AccessControlUtility.isUCPAccess()).toBe(true);
  });
});

describe('getAllCompanyProductLineAccess', () => {
  const companyDetails: any[] = [
    {
      id: '455',
      name: 'CIENA-19458-US-GOOD',
      hasFtzAccess: false,
      eId: 'ed8e85d99863f11566b0b77ee30b789cf11e517dd18e7c6e2a155be9c70772c4',
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
      id: '448',
      name: 'CIENA-19459-US-DEFECTIVE',
      hasFtzAccess: false,
      eId: 'ed8e85d99863f11566b0b77ee30b789cf11e517dd18e7c6e2a155be9c70772c4',
      productLines: [
        {
          productType: 'HLD',
          serviceLines: [
            {
              serviceLineName: 'Health',
            },
          ],
        },
      ],
      unitName: null,
    },
  ];
  it('should return company level product lines for all the companies', () => {
    spyOn(AccessControlUtility, 'getAllSelectedCompanyDetails').and.returnValue(
      companyDetails
    );
    expect(AccessControlUtility.getAllCompanyProductLineAccess()).toEqual([
      ACCESS_CONTROL_CONFIG.productLine.gld,
      ACCESS_CONTROL_CONFIG.productLine.hld,
    ]);
  });

  it('should return company level service lines for all the companies', () => {
    spyOn(AccessControlUtility, 'getAllSelectedCompanyDetails').and.returnValue(
      companyDetails
    );
    expect(AccessControlUtility.getAllCompanyServiceLineAccess()).toEqual([
      'PS',
      'Health',
    ]);
  });
});

describe('getProductLineAccess', () => {
  it('should return company level product lines', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(
      () => companyDetails
    );
    expect(AccessControlUtility.getCompanyProductLineAccess()).toEqual([
      ACCESS_CONTROL_CONFIG.productLine.gld,
      ACCESS_CONTROL_CONFIG.productLine.hld,
      ACCESS_CONTROL_CONFIG.productLine.gff,
    ]);
  });

  it('should return company level service lines', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(
      () => companyDetails
    );
    expect(AccessControlUtility.getCompanyServiceLineAccess()).toEqual([
      'FG',
      'Health',
    ]);
  });

  it('_createCompanyMappingKeyList should return array of keys with null shipment type', () => {
    spyOn(AccessControlUtility, 'getCompanyProductLineAccess').and.returnValue([
      'GLD',
    ]);
    spyOn(AccessControlUtility, 'getCompanyServiceLineAccess').and.returnValue([
      'PS',
    ]);
    spyOn(AccessControlUtility, 'getAccountTypesList').and.returnValue(['MI']);
    spyOn(AccessControlUtility, '_fetchUserRole').and.returnValue(undefined);
    AccessControlUtility.setCompanyMappingKeyDetails();
    expect(AccessControlUtility._createCompanyMappingKeyList(null)).toEqual([
      'GLD@PS@MI@',
      'GLD@PS@MI',
      'GLD@*@MI',
      'GLD@PS@*',
      'GLD@*@*',
    ]);
  });
  it('_createCompanyMappingKeyList should return array of keys with executive Role type', () => {
    spyOn(AccessControlUtility, 'getCompanyProductLineAccess').and.returnValue([
      'GLD',
    ]);
    spyOn(AccessControlUtility, 'getCompanyServiceLineAccess').and.returnValue([
      'PS',
    ]);
    spyOn(AccessControlUtility, 'getAccountTypesList').and.returnValue(['MI']);
    spyOn(AccessControlUtility, '_fetchUserRole').and.returnValue('executive');
    AccessControlUtility.setCompanyMappingKeyDetails();
    expect(AccessControlUtility._createCompanyMappingKeyList(null)).toEqual([
      'GLD@PS@MI@executive',
      'GLD@PS@MI',
      'GLD@*@MI',
      'GLD@PS@*',
      'GLD@*@*',
    ]);
  });

  it('_createCompanyMappingKeyList should return array of keys with ManagedInbound shipment type', () => {
    spyOn(AccessControlUtility, 'getCompanyProductLineAccess').and.returnValue([
      'GLD',
    ]);
    spyOn(AccessControlUtility, 'getCompanyServiceLineAccess').and.returnValue([
      'PS',
    ]);
    AccessControlUtility.setCompanyMappingKeyDetails();
    expect(
      AccessControlUtility._createCompanyMappingKeyList('ManagedInbound')
    ).toEqual(['GLD@PS@MI', 'GLD@*@MI', 'GLD@PS@*', 'GLD@*@*', '*@*@MI']);
  });

  it('setCompanyMappingKeyDetails should set service line GFF for account type GFF', () => {
    spyOn(AccessControlUtility, 'getCompanyProductLineAccess').and.returnValue([
      'GLD',
    ]);
    spyOn(AccessControlUtility, 'getAccountTypesList').and.returnValue(['MI']);
    AccessControlUtility.setCompanyMappingKeyDetails();
    expect(
      AccessControlUtility.companyMappingKeyDetails.serviceLineSequence
    ).toEqual('GFF');
  });

  it('getCurrentFieldMapping should return an array of exclusions with shipment type ManagedInbound', () => {
    spyOn(
      AccessControlUtility,
      '_createCompanyMappingKeyList'
    ).and.returnValue(['GLD@PS@MI', 'GLD@*@MI', 'GLD@PS@*', 'GLD@*@*']);
    expect(
      AccessControlUtility.getCurrentFieldMapping(
        {
          'GLD@PS@MI': ['GLD@PS@MI'],
          'GLD@FG@*': ['GLD@FG@*'],
          'GLD@*@*': ['GLD@*@*'],
        },
        'ManagedInbound'
      )
    ).toEqual(['GLD@PS@MI']);
  });

  it('getCurrentFieldMapping should return an array of exclusions with shipment type null', () => {
    spyOn(
      AccessControlUtility,
      '_createCompanyMappingKeyList'
    ).and.returnValue(['GLD@PS@MI', 'GLD@*@MI', 'GLD@PS@*', 'GLD@*@*']);
    expect(
      AccessControlUtility.getCurrentFieldMapping({
        'GLD@PS@MI': ['GLD@PS@MI'],
        'GLD@FG@*': ['GLD@FG@*'],
        'GLD@*@*': ['GLD@*@*'],
      })
    ).toEqual(['GLD@PS@MI']);
  });

  it('getCurrentFieldMapping should return undefined when not matched any key', () => {
    spyOn(AccessControlUtility, '_createCompanyMappingKeyList').and.returnValue(
      null
    );
    expect(
      AccessControlUtility.getCurrentFieldMapping({
        'GLD@PS@MIO': ['GLD@PS@MI'],
      })
    ).toEqual([]);
  });

  it('should check if HLD product line access is there', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(() => {
      return companyDetails;
    });
    expect(AccessControlUtility.isProductLineHLD()).toBe(true);
  });

  it('should check if user with GFF is GFF only user', () => {
    spyOn(AccessControlUtility, 'getCompanyProductLineAccess').and.returnValue([
      'GFF',
    ]);
    expect(AccessControlUtility.isGFFOnlyUser()).toBe(true);
  });

  it('should check if user with GFF and BRK is GFF only user', () => {
    spyOn(AccessControlUtility, 'getCompanyProductLineAccess').and.returnValue([
      'GFF',
      'BRK',
    ]);
    expect(AccessControlUtility.isGFFOnlyUser()).toBe(true);
  });

  it('should check if user with GFF and GLD is not GFF only user', () => {
    spyOn(AccessControlUtility, 'getCompanyProductLineAccess').and.returnValue([
      'GFF',
      'GLD',
    ]);
    expect(AccessControlUtility.isGFFOnlyUser()).toBe(false);
  });

  it('should check if user with GLD is not GFF only user', () => {
    spyOn(AccessControlUtility, 'getCompanyProductLineAccess').and.returnValue([
      'GLD',
    ]);
    expect(AccessControlUtility.isGFFOnlyUser()).toBe(false);
  });
});

describe('getExclusionsList', () => {
  beforeEach(() => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(
      mockSessionStorage.getPropValueFromObj
    );
    spyOn(AccessControlUtility, '_fetchExclusionsFromSession').and.returnValue(
      accountTypeExclusionData
    );
  });
  it('should return exclusion list for inbound L2', () => {
    expect(
      AccessControlUtility.getExclusionsList(
        ACCESS_CONTROL_CONFIG.accountTypeExclusionKey,
        null,
        ACCESS_CONTROL_CONFIG.modules.inbound
      )
    ).toEqual(inboundL2ExclusionData);
  });
  it('should return exclusion list for outbound L2', () => {
    expect(
      AccessControlUtility.getExclusionsList(
        ACCESS_CONTROL_CONFIG.accountTypeExclusionKey,
        null,
        ACCESS_CONTROL_CONFIG.modules.outbound
      )
    ).toEqual(outboundL2ExclusionData);
  });
  it('should return exclusion list for warehouse L3', () => {
    expect(
      AccessControlUtility.getExclusionsList(
        ACCESS_CONTROL_CONFIG.accountTypeExclusionKey,
        null,
        ACCESS_CONTROL_CONFIG.modules.warehouse
      )
    ).toEqual(warehouseExclusionData);
  });
});

describe('When empty list is returned', () => {
  const getNullList = () => {
    return null;
  };
  beforeEach(() => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(getNullList);
    spyOn(SessionStorageUtility, 'getAccountTypeDetails').and.callFake(
      getNullList
    );
  });

  it('should return null when exclusion type is not available in the list', () => {
    expect(
      AccessControlUtility.getExclusionsList('inbound', 'abcd', null)
    ).toEqual(null);
  });

  it('should return true for inbound L2 booked on access when exclusion list is null', () => {
    expect(
      AccessControlUtility.hasComponentAccess(
        'inbound',
        'L2-IN-ShipmentListingTable-BookedOn',
        null,
        null
      )
    ).toBe(true);
  });

  it('should return null when account details is null', () => {
    expect(AccessControlUtility._fetchAccountTypeData('primary')).toBe(null);
  });
});

describe('hasComponentAccess', () => {
  beforeEach(() => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(
      mockSessionStorage.getPropValueFromObj
    );
  });
  it('should return false for inbound L2 booked on access', () => {
    expect(
      AccessControlUtility.hasComponentAccess(
        'inbound',
        'L2-IN-ShipmentListingTable-BookedOn',
        null,
        null
      )
    ).toBe(false);
  });

  it('should return true for inbound L2 created on access', () => {
    expect(
      AccessControlUtility.hasComponentAccess(
        'inbound',
        'L2-IN-ShipmentListingTable-CreatedOn',
        'accountTypeExclusions',
        null
      )
    ).toBe(true);
  });
});

describe('shipment exclusions', () => {
  const shipmentTypeExclusions = [
    {
      accountType: 'NonManagedInbound',
      type: 'Inbound',
      exclusions: {
        components: [
          'L3-IN-CarrierShipmentNumberCard',
          'L3-IN-DocumentCard',
          'L3-IN-CareerServiceLevel',
          'L3-IN-ShipmentMode',
          'L3-IN-BookedOn',
          'L3-IN-ScheduledDelivery',
          'L3-IN-Origin',
          'L3-IN-ShipmentType',
        ],
      },
    },
    {
      accountType: 'ManagedInbound',
      type: 'Inbound',
      exclusions: {
        components: [
          'L3-IN-CreatedOn',
          'L3-IN-ItemsShipped-Ref1',
          'L3-IN-ItemsShipped-Ref2',
          'L3-IN-ItemsShipped-Ref3',
        ],
      },
    },
    {
      accountType: 'NonManagedOutbound',
      type: 'Outbound',
      exclusions: {
        components: [
          'L3-OUT-CustomerPO',
          'L3-OUT-UPSTransportationShipment',
          'L3-OUT-ShipmentMode',
        ],
      },
    },
  ];

  beforeEach(() => {
    // spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(
    //   getShipmentTypeExclusions
    // );
    spyOn(AccessControlUtility, '_fetchExclusionsFromSession').and.returnValue(
      shipmentTypeExclusions
    );
  });

  it('should return exclusion list for NonManaged Shipment L3', () => {
    expect(
      AccessControlUtility.getExclusionsList(
        ACCESS_CONTROL_CONFIG.shipmentTypeExclusionKey,
        ACCOUNT_TYPE_CONSTANTS.types.nonManagedInbound,
        null,
        ACCESS_CONTROL_CONFIG.filterKey.accountType
      )
    ).toEqual([
      'L3-IN-CarrierShipmentNumberCard',
      'L3-IN-DocumentCard',
      'L3-IN-CareerServiceLevel',
      'L3-IN-ShipmentMode',
      'L3-IN-BookedOn',
      'L3-IN-ScheduledDelivery',
      'L3-IN-Origin',
      'L3-IN-ShipmentType',
    ]);
  });
});

describe('getComponentAccessFromList', () => {
  it('should return false for inbound L3 booked on access', () => {
    expect(
      AccessControlUtility.getComponentAccessFromList(
        inboundL3ExclusionData,
        'L3-IN-BookedOn'
      )
    ).toBe(false);
  });

  it('should return true for inbound L3 created on access', () => {
    expect(
      AccessControlUtility.getComponentAccessFromList(
        inboundL3ExclusionData,
        'L3-IN-CreatedOn'
      )
    ).toBe(true);
  });

  it('should return true for inbound L3 created on access when exclusion list is empty', () => {
    expect(
      AccessControlUtility.getComponentAccessFromList(null, 'L3-IN-CreatedOn')
    ).toBe(true);
  });
});

describe('_fetchAccountTypeData', () => {
  const inboundAccountType = ['MI'];

  beforeEach(() => {
    spyOn(SessionStorageUtility, 'getAccountTypeDetails').and.callFake(
      mockSessionStorage.getAccountTypeDetails
    );
  });
  it('should return null when type is null', () => {
    expect(AccessControlUtility._fetchAccountTypeData(null)).toBe(null);
  });

  it('should return primary account type when type is primary', () => {
    expect(AccessControlUtility._fetchAccountTypeData('Inbound')).toEqual(
      inboundAccountType
    );
  });
});

describe('isManagedInbound', () => {
  it('should return true when primary account type is managed and value is already stored in session', () => {
    spyOn(SessionStorageUtility, 'get').and.callFake(mockSessionStorage.get);
    expect(AccessControlUtility.isManagedInbound()).toBe(true);
  });

  it('should return true when primary account type is managed and value is not stored in session', () => {
    const getNullValue = () => {
      return null;
    };
    spyOn(SessionStorageUtility, 'get').and.callFake(getNullValue);
    spyOn(SessionStorageUtility, 'getAccountTypeDetails').and.callFake(
      mockSessionStorage.getAccountTypeDetails
    );

    expect(AccessControlUtility.isManagedInbound()).toBe(true);
  });

  it('should return false when primary account type is not managed and value is not stored in session', () => {
    const getNullValue = () => {
      return null;
    };
    spyOn(SessionStorageUtility, 'get').and.callFake(getNullValue);
    spyOn(SessionStorageUtility, 'getAccountTypeDetails').and.callFake(
      getNullValue
    );

    expect(AccessControlUtility.isManagedInbound()).toBe(false);
  });

  it('should return true when isInbound is called', () => {
    spyOn(SessionStorageUtility, 'getAccountTypeDetails').and.callFake(
      mockSessionStorage.getAccountTypeDetails
    );
    expect(AccessControlUtility.hasInboundCategory()).toBeTrue();
  });
});

describe('isManagedOutbound', () => {
  it('should return true when secondary account type is managed and value is already stored in session', () => {
    spyOn(SessionStorageUtility, 'get').and.callFake(mockSessionStorage.get);
    expect(AccessControlUtility.isManagedOutbound()).toBe(true);
  });

  it('should return true when secondary account type is managed and value is not stored in session', () => {
    const getNullValue = () => {
      return null;
    };
    spyOn(SessionStorageUtility, 'get').and.callFake(getNullValue);
    spyOn(SessionStorageUtility, 'getAccountTypeDetails').and.callFake(
      mockSessionStorage.getAccountTypeDetails
    );

    expect(AccessControlUtility.isManagedOutbound()).toBe(true);
  });

  it('should return false when secondary account type is not managed and value is not stored in session', () => {
    const getNullValue = () => {
      return null;
    };
    spyOn(SessionStorageUtility, 'get').and.callFake(getNullValue);
    spyOn(SessionStorageUtility, 'getAccountTypeDetails').and.callFake(
      getNullValue
    );

    expect(AccessControlUtility.isManagedOutbound()).toBe(false);
  });

  it('should return true when isOutbound is called', () => {
    spyOn(SessionStorageUtility, 'getAccountTypeDetails').and.callFake(
      mockSessionStorage.getAccountTypeDetails
    );
    expect(AccessControlUtility.hasOutboundCategory()).toBeTrue();
  });
});

describe('getHtmlContentKeyByActType', () => {
  it('should retrun when act type managed inbound', () => {
    spyOn(AccessControlUtility, 'isManagedInbound').and.returnValue(true);
    let res = AccessControlUtility.getHtmlContentKeyByActType(
      SHIPMENT_TYPE.inbound,
      'shipment_by_status'
    );
    expect(res).toEqual('lbl_inbound_managed_shipment_by_status');
  });

  it('should retrun when act type non-managed inbound', () => {
    spyOn(AccessControlUtility, 'isManagedInbound').and.returnValue(false);
    let res = AccessControlUtility.getHtmlContentKeyByActType(
      SHIPMENT_TYPE.inbound,
      'shipment_by_status'
    );
    expect(res).toEqual('lbl_inbound_nonmanaged_shipment_by_status');
  });

  it('should retrun when act type managed outbound', () => {
    spyOn(AccessControlUtility, 'isManagedOutbound').and.returnValue(true);
    let res = AccessControlUtility.getHtmlContentKeyByActType(
      SHIPMENT_TYPE.outbound,
      'shipment_by_status'
    );
    expect(res).toEqual('lbl_outbound_managed_shipment_by_status');
  });

  it('should retrun when act type non-managed outbound', () => {
    spyOn(AccessControlUtility, 'isManagedOutbound').and.returnValue(false);
    let res = AccessControlUtility.getHtmlContentKeyByActType(
      SHIPMENT_TYPE.outbound,
      'shipment_by_status'
    );
    expect(res).toEqual('lbl_outbound_nonmanaged_shipment_by_status');
  });

  it('test user is admin', () => {
    let userGroups = ['EmployeeAdmin'];
    spyOn(AccessControlUtility, '_fetchExclusionsFromSession').and.returnValue(
      userGroups
    );
    expect(AccessControlUtility.isAdminUser()).toBe(true);
  });
  it('test user is not an admin', () => {
    let userGroups = [];
    spyOn(AccessControlUtility, '_fetchExclusionsFromSession').and.returnValue(
      userGroups
    );
    expect(AccessControlUtility.isAdminUser()).toBe(false);
  });
});

describe('getHtmlContentKeyByShipmentType', () => {
  it('should retrun when shipmentType is non null', () => {
    let res = AccessControlUtility.getHtmlContentKeyByShipmentType(
      'ManagedOutbound',
      'shipment_by_status'
    );
    expect(res).toEqual('lbl_managedoutbound_shipment_by_status');
  });

  it('should retrun when shipmentType is null', () => {
    let res = AccessControlUtility.getHtmlContentKeyByShipmentType(
      null,
      'shipment_by_status'
    );
    expect(res).toEqual('lbl_undefined_shipment_by_status');
  });
});

describe('isManagedMovement', () => {
  const accountTypeDetails = [
    {
      accountTypeCategory: 'Movement',
      accountTypes: ['MM'],
    },
  ];

  const mockSessionStorage = {
    getAccountTypeDetails: () => {
      return accountTypeDetails;
    },
    get: () => {
      return true;
    },
  };

  beforeEach(() => {
    spyOn(SessionStorageUtility, 'getAccountTypeDetails').and.callFake(
      mockSessionStorage.getAccountTypeDetails
    );
  });

  it('should return true when primary account type is managed and value is already stored in session', () => {
    spyOn(SessionStorageUtility, 'get').and.returnValue(true);
    expect(AccessControlUtility.isManagedMovement()).toBe(true);
  });

  it('should return true when primary account type is managed movement and value is not stored in session', () => {
    spyOn(SessionStorageUtility, 'get')
      .withArgs('isMM')
      .and.returnValue(null)
      .withArgs('isHLDAccess')
      .and.returnValue(true);
    expect(AccessControlUtility.isManagedMovement()).toBe(true);
  });

  it('should showHLDExperience when product line is not HLD or GFF and account type MM', () => {
    spyOn(AccessControlUtility, 'getCompanyProductLineAccess').and.returnValue([
      'GLD',
    ]);
    expect(AccessControlUtility.checkIfHLDOrGFF()).toBe(false);
    expect(AccessControlUtility.showHLDExperience()).toBe(true);
  });

  it('should return true when isMovement is called', () => {
    expect(AccessControlUtility.hasMovementCategory()).toBeTrue();
  });
});

describe('getAccessibleModules', () => {
  const accountTypeDetails = [
    {
      accountTypeCategory: 'Movement',
      accountTypes: ['MM'],
    },
  ];

  const mockSessionStorage = {
    getAccountTypeDetails: () => {
      return accountTypeDetails;
    },
    get: () => {
      return true;
    },
  };

  beforeEach(() => {
    spyOn(SessionStorageUtility, 'getAccountTypeDetails').and.callFake(
      mockSessionStorage.getAccountTypeDetails
    );
  });

  it('should return correct modules as received from BE inclusions', () => {
    const modules = {
      Dashboard: 'Dashboard',
      Reports: 'Reports',
      Shipments: 'Shipments',
      Brokerage: 'Brokerage',
    };
    spyOn(InclusionUtility, 'getInclusions').and.returnValue(modules);
    expect(AccessControlUtility.getAccessibleModules()).toEqual([
      'dashboard',
      'reports',
      'shipments',
      'brokerage',
    ]);
  });
});

describe('getAccountTypesList', () => {
  const mockSessionStorage = {
    getAccountTypeDetails: () => {
      return accountTypeDetails;
    },
    get: () => {
      return true;
    },
  };

  beforeEach(() => {
    spyOn(SessionStorageUtility, 'getAccountTypeDetails').and.callFake(
      mockSessionStorage.getAccountTypeDetails
    );
  });

  it('should return list of account types', () => {
    const expectedAccountTypes = ['MI', 'MO'];
    expect(AccessControlUtility.getAccountTypesList()).toEqual(
      expectedAccountTypes
    );
  });
});

describe('getUserAuthType', () => {
  const companies = [
    {
      id: '445',
      name: 'CIENA-19458-US-GOOD',
      productLine: null,
      isDefaultUnit: false,
    },
    {
      id: '448',
      name: 'CIENA-19459-US-DEFECTIVE',
      productLine: null,
      isDefaultUnit: false,
    },
  ];

  it('should check if multiview', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.returnValue(companies);
    spyOn(SessionStorageUtility, 'getConfigKeys').and.returnValue(true);
    expect(AccessControlUtility.isMultiAccountCombination()).toEqual(true);
  });
});

describe('getUserAuthType', () => {
  const userDetails = {
    userId: 'amerock_uat_user',
    eUserId:
      'JDLxctaxPxF1uxRb+JA5Ag==p3M4jK0bD41wqz9/pZaj2a0XsR23cZ6BiE3DWhsCmaw=',
    firstName: 'amerock_uat_user',
    lastName: '',
    emailId: 'amerock_uat_user@gmail.com',
    userType: 'Customer',
    authType: 'B2CCustomer',
  };

  it('should return user auth type', () => {
    spyOn(CommonUtility, 'getPropValueFromObj').and.callFake(() => userDetails);
    expect(AccessControlUtility.getUserAuthType()).toEqual(
      USER_AUTH_TYPE.B2CCustomer
    );
  });
});
