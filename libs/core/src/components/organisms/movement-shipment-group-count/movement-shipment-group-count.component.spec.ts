import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Pipe, SimpleChange } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MovementShipmentGroupCountComponent } from './movement-shipment-group-count.component';

import { NavigationUtility } from '../../../utils';
import { ROUTER_CONSTANTS, ROUTE_STATES } from '../../../constants';

import { Router } from '@angular/router';
/* import {
  l2ListingConfig,
  mySupplyChainCountsHLD,
  ShipmentCountsConfigGFF,
} from './shipment-dashboard-config'; */
import { ShipmentDrilldownKeys } from '../../../global-config/shipment-group-count-filter.config';
import { ShipmentCountsKeys } from '../../../global-config/movement-shipment-group-count.config';
import { MilestoneStatus } from '../../../constants';

function mockPipe(options: Pipe): Pipe {
  const metadata: Pipe = {
    name: options.name,
  };

  return <any>Pipe(metadata)(
    class MockPipe {
      transform() {}
    }
  );
}
const initialState = {
  shipmentDashboard: {
    summary: {
      data: {
        totalCount: 1230,
        milestoneStatusSummary: [
          {
            id: 'Pending',
            name: 'Pending',
            count: '20',
            order: 1,
          },
          {
            id: 'Rated',
            name: 'Rated',
            count: '4',
            order: 2,
          },
          {
            id: 'Booked',
            name: 'Booked',
            count: '8',
            order: 3,
          },
          {
            id: 'In Transit',
            name: 'In Transit',
            count: '90',
            order: 4,
          },
          {
            id: 'Customs',
            name: 'Customs',
            count: '15',
            order: 5,
          },
          {
            id: 'Delivered',
            name: 'Delivered',
            count: '50',
            order: 6,
          },
          {
            id: ' ASN Created',
            name: 'ASN Created',
            count: '23',
            order: 7,
          },
          {
            id: 'FTZ',
            name: 'FTZ',
            count: '9',
            order: 8,
          },
          {
            id: 'Receiving',
            name: 'Receiving',
            count: '5',
            order: 9,
          },
          {
            id: 'Putaway',
            name: 'Putaway',
            count: '6',
            order: 10,
          },
        ],
        scheduleToShipSummary: [
          {
            count: '100',
          },
        ],
        missedPickupSummary: [
          {
            count: '20',
          },
        ],
        scheduledToDeliverSummary: [
          {
            count: '20',
          },
        ],
        missedDeliveredSummary: [
          {
            count: '20',
          },
        ],
        errorDetails: [],
        success: true,
      },
      errorDetails: null,
      isLoaded: true,
    },
  },
};

const dummyDate = {
  endDate: '2021/04/08',
  startDate: '2021/04/02',
};

describe('MovementShipmentGroupCountComponent for HLD User', () => {
  let component: MovementShipmentGroupCountComponent;
  let fixture: ComponentFixture<MovementShipmentGroupCountComponent>;
  let router: Router;
  let store: MockStore;
  let l2ListingConfig = {
    state: {
      from: ROUTE_STATES.dashboard,
      url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
    },
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        MovementShipmentGroupCountComponent,
        mockPipe({ name: 'content' }),
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementShipmentGroupCountComponent);
    component = fixture.componentInstance;
    component.config = {
      data: initialState.shipmentDashboard.summary.data,
      total: {
        id: ShipmentCountsKeys.totalCount,
        duration: 'last60Days',
        count: 0,
        state: {
          from: ROUTE_STATES.dashboard,
          url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
        },
        url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}`,
      },
      counts: [
        {
          id: ShipmentCountsKeys.shipmentsInTransitSummary,
          duration: 'last60Days',
          icon: 'shipment-count-in-transit',
          count: 0,
          state: {
            from: ROUTE_STATES.dashboard,
            url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
          },
          url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}`,
        },
        {
          id: ShipmentCountsKeys.shipmentsDeliveredSummary,
          duration: 'last60Days',
          icon: 'shipment-count-delivered',
          count: 0,
          state: {
            from: ROUTE_STATES.dashboard,
            url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
          },
          url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}`,
        },
        {
          id: ShipmentCountsKeys.shipmentsBookedSummary,
          duration: 'last60Days',
          icon: 'shipment-count-booked',
          count: 0,
          state: {
            from: ROUTE_STATES.dashboard,
            url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
          },
          url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}`,
        },
        {
          id: ShipmentCountsKeys.missedPickupSummary,
          duration: 'last60Days',
          icon: 'shipment-count-pickup',
          count: 0,
          state: {
            from: ROUTE_STATES.dashboard,
            url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
          },
          url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}`,
        },
        {
          id: ShipmentCountsKeys.undeliveredExceptions,
          duration: 'last60Days',
          icon: 'shipment-count-exception',
          count: 0,
          state: {
            from: ROUTE_STATES.dashboard,
            url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
          },
          url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}`,
        },
      ],
      hasApiFailed: false,
    };
    component.componentFilterId = 'missed';
    component.selectedCountFilters = {
      ...dummyDate,
      value: 7,
    };
  });

  it('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('output event should toggle isViewData', () => {
    component.isViewDataClicked = true;
    component.onViewDataClick();
    expect(component.isViewDataClicked).toBe(false);
  });

  it('should call setLearnMoreTableData', () => {
    const setLearnMoreTableData = spyOn(component, 'setLearnMoreTableData');
    component.ngOnInit();
    component.setLearnMoreTableData();
    fixture.detectChanges();
    expect(setLearnMoreTableData).toHaveBeenCalled();
  });

  /** Commented the code as cthe code in relation with this is commented */
  // it('should show error when API Fails', () => {
  //   store.setState({
  //     shipmentDashboard: {
  //       summary: {
  //         data: {},
  //         filterID: 'missed',
  //         errorDetails: [],
  //         isLoaded: true,
  //       },
  //     },
  //   });
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   expect(component.hasSummaryApiFailed).toBe(true);
  // });
  //
  // it('should set isLoading to true upon changes', () => {
  //   component.isLoading = false;
  //   const changes = { triggerLoading: true };
  //   component.ngOnChanges(<any>changes);
  //   expect(component.isLoading).toBe(true);
  // });

  it('should set modalTitleDate to true upon changes', () => {
    component.selectedCountFilters = {
      endDate: '2021/05/19',
      startDate: '2021/03/21',
    };
    component.ngOnChanges(<any>{
      selectedChipFilters: new SimpleChange(
        {},
        component.selectedCountFilters,
        false
      ),
    });
    fixture.detectChanges();
    expect(component.learnmoreModalTitleDate).toBe(
      ' - From 2021-03-21 to 2021-05-19'
    );
  });

  it('should call navigate when onTileClick is called with totalCount for HLD user', () => {
    let spy = spyOn(NavigationUtility, 'navigate');
    component.router = null;
    component.config.state = {
      ...l2ListingConfig.state,
    };
    component.selectedCountFilters = {
      value: 60,
      startDate: null,
      endDate: null,
    };
    fixture.detectChanges();
    const expectedNavigationExtras = {
      ...l2ListingConfig.state,
      shipmentsDrilldownFilters: [
        {
          key: ShipmentDrilldownKeys.shipmentCreation,
          value: {
            type: 'relative',
            range: -60,
            startDate: null,
            endDate: null,
          },
        },
      ],
    };
    const tileData = {
      id: 'totalCount',
      state: {
        from: ROUTE_STATES.dashboard,
        url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
      },
      url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}/`,
    };
    component.onTileClick(event, tileData);
    expect(spy).toHaveBeenCalledWith(
      null,
      [`/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}/`],
      false,
      expectedNavigationExtras,
      undefined,
      true
    );
  });

  it('should call navigate when onTileClick is called with missedPickups for HLD user', () => {
    let spy = spyOn(NavigationUtility, 'navigate');
    component.router = null;
    component.config.state = {
      ...l2ListingConfig.state,
    };
    component.selectedCountFilters = {
      startDate: '2021-03-05',
      endDate: '2021-03-11',
      value: -1,
    };
    fixture.detectChanges();

    const expectedNavigationExtras = {
      ...l2ListingConfig.state,
      shipmentsDrilldownFilters: [
        {
          key: ShipmentDrilldownKeys.shipmentCreation,
          value: {
            type: 'relative',
            range: -60,
          },
        },
        {
          key: ShipmentDrilldownKeys.scheduledShip,
          value: {
            type: 'custom',
            startDate: '2021-03-05',
            endDate: '2021-03-11',
            range: 1,
          },
        },
        {
          key: ShipmentDrilldownKeys.status,
          value: [
            MilestoneStatus.pending.toLowerCase(),
            MilestoneStatus.rated.toLowerCase(),
            MilestoneStatus.booked.toLowerCase(),
          ],
        },
      ],
    };
    const tileData = {
      id: 'missedPickupSummary',
      state: {
        from: ROUTE_STATES.dashboard,
        url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
      },
      url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}/`,
    };
    component.onTileClick(event, tileData);
    expect(spy).toHaveBeenCalledWith(
      null,
      [`/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}/`],
      false,
      expectedNavigationExtras,
      undefined,
      true
    );
  });

  it('should set learn more data', () => {
    component.config = {};
    component.config = {
      data: initialState.shipmentDashboard.summary,
      counts: [
        {
          id: ShipmentCountsKeys.shipmentsDeliveredSummary,
          duration: 'last60Days',
          icon: 'shipment-count-delivered',
          count: 0,
          state: {
            from: ROUTE_STATES.dashboard,
            url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
          },
          url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}`,
        },
      ],
      hasApiFailed: false,
    };
    component.setLearnMoreTableData();
    fixture.detectChanges();
    expect(component.learnMoreTableData.length).toBe(1);
  });

  it('should navigate to shipment listing page on click of a tile', () => {
    let spy = spyOn(NavigationUtility, 'navigate');
    const tileData = {
      count: 60,
      duration: 'last60Days',
      icon: 'shipment-count-in-transit',
      id: 'shipmentsInTransitSummary',
      url: 'listing',
    };
    component.onTileClick(null, tileData);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});

describe('MovementShipmentGroupCountComponent for GFF User', () => {
  let component: MovementShipmentGroupCountComponent;
  let fixture: ComponentFixture<MovementShipmentGroupCountComponent>;
  let router: Router;
  let l2ListingConfig = {
    state: {
      from: ROUTE_STATES.dashboard,
      url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        MovementShipmentGroupCountComponent,
        mockPipe({ name: 'content' }),
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementShipmentGroupCountComponent);
    component = fixture.componentInstance;
    component.isGFF = true;
    component.config = {
      data: null,
      total: {
        id: ShipmentCountsKeys.totalCount,
        count: 0,
        state: {
          from: ROUTE_STATES.dashboard,
          url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
        },
        url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}`,
      },
      counts: [
        {
          id: ShipmentCountsKeys.shipmentsInTransitSummary,
          icon: 'shipment-count-in-transit',
          count: 0,
          state: {
            from: ROUTE_STATES.dashboard,
            url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
          },
          url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}`,
        },
        {
          id: ShipmentCountsKeys.shipmentsDeliveredSummary,
          icon: 'shipment-count-delivered',
          count: 0,
          state: {
            from: ROUTE_STATES.dashboard,
            url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
          },
          url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}`,
        },
      ],
      hasApiFailed: false,
    };
    component.selectedCountFilters = {
      ...dummyDate,
      value: 7,
    };
  });

  it('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call navigate when onTileClick is called with totalCount for GFF user', () => {
    let spy = spyOn(NavigationUtility, 'navigate');
    component.router = null;
    component.config.state = {
      ...l2ListingConfig.state,
    };
    fixture.detectChanges();
    const expectedNavigationExtras = {
      ...l2ListingConfig.state,
      shipmentsDrilldownFilters: [
        {
          key: ShipmentDrilldownKeys.shipmentBooked,
          value: {
            type: 'relative',
            range: -7,
            ...dummyDate,
          },
        },
      ],
    };
    const tileData = {
      id: 'totalCount',
      state: {
        from: ROUTE_STATES.dashboard,
        url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
      },
      url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}/`,
    };
    component.onTileClick(event, tileData);
    expect(spy).toHaveBeenCalledWith(
      null,
      [`/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}/`],
      false,
      expectedNavigationExtras,
      undefined,
      true
    );
  });

  it('should call navigate when onTileClick is called with shipments in transit for GFF user', () => {
    let spy = spyOn(NavigationUtility, 'navigate');
    component.router = null;
    component.selectedCountFilters = {
      startDate: '2021-03-05',
      endDate: '2021-03-11',
      value: -1,
    };
    component.config.state = {
      ...l2ListingConfig.state,
    };
    fixture.detectChanges();
    const expectedNavigationExtras = {
      ...l2ListingConfig.state,
      shipmentsDrilldownFilters: [
        {
          key: ShipmentDrilldownKeys.shipmentBooked,
          value: {
            type: 'custom',
            startDate: '2021-03-05',
            endDate: '2021-03-11',
            range: 1,
          },
        },
        {
          key: ShipmentDrilldownKeys.status,
          value: [
            MilestoneStatus.pickup.toLowerCase(),
            MilestoneStatus.departure.toLowerCase(),
            MilestoneStatus.arrival.toLowerCase(),
            MilestoneStatus.importCustoms.toLowerCase(),
            MilestoneStatus.exportCustoms.toLowerCase(),
          ],
        },
      ],
    };
    const tileData = {
      id: ShipmentCountsKeys.shipmentsInTransitSummary,
      state: {
        from: ROUTE_STATES.dashboard,
        url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
      },
      url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}/`,
    };
    component.onTileClick(event, tileData);
    expect(spy).toHaveBeenCalledWith(
      null,
      [`/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}/`],
      false,
      expectedNavigationExtras,
      undefined,
      true
    );
  });
});
