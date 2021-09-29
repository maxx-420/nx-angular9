import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MovementShipmentCountComponent } from './movement-shipment-count.component';
import { Pipe, SimpleChange } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

import { NavigationUtility } from '../../../utils';
import { ROUTER_CONSTANTS, ROUTE_STATES } from '../../../constants';

/* import {
  mySupplyChainCountsHLD,
  undeliveredExceptionsHLD,
} from '../movement-shipment-group-count/shipment-dashboard-config'; */

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

const dummyDate = {
  endDate: '2021/04/08',
  startDate: '2021/04/02',
};

const initialState = {
  shipmentDashboard: {
    exceptionsCount: {
      data: {
        errorDetails: [],
        success: true,
        count: 120,
      },
      errorDetails: null,
      isLoaded: true,
    },
  },
};

describe('MovementShipmentCountComponent', () => {
  let component: MovementShipmentCountComponent;
  let fixture: ComponentFixture<MovementShipmentCountComponent>;
  let router: Router;
  let shipmentCountsKeys = {
    scheduleToShipSummary: 'scheduleToShipSummary',
    missedPickupSummary: 'missedPickupSummary',
    shipmentsInTransitSummary: 'shipmentsInTransitSummary',
    scheduledToDeliverSummary: 'scheduledToDeliverSummary',
    missedDeliveredSummary: 'missedDeliveredSummary',
    shipmentsDeliveredSummary: 'shipmentsDeliveredSummary',
    totalCount: 'totalCount',
    undeliveredExceptions: 'undeliveredExceptions',
    financialSummary: 'financialSummary',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        MovementShipmentCountComponent,
        mockPipe({ name: 'content' }),
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementShipmentCountComponent);
    component = fixture.componentInstance;
    component.config = {
      id: shipmentCountsKeys.undeliveredExceptions,
      duration: 'last60Days',
      icon: 'undelivered-exceptions',
      count: 0,
      isSVG: true,
      state: {
        from: ROUTE_STATES.dashboard,
        url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
      },
      url: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.exceptions}`,
    };
    component.selectedCountFilters = {
      value: 60,
      ...dummyDate,
    };
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  /** Commented the test case as the code in relation to it is commented */
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
      selectedCountFilters: new SimpleChange(
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

  it('output event should toggle isViewData', () => {
    component.isViewDataClicked = true;
    component.onViewDataClick();
    expect(component.isViewDataClicked).toBe(false);
  });

  it('should call setLearnMoreTableData', () => {
    const setLearnMoreTableData = spyOn(component, 'setLearnMoreTableData');
    component.learnMoreTableData = [];
    component.config = {
      total: {
        id: shipmentCountsKeys.totalCount,
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
          id: shipmentCountsKeys.shipmentsInTransitSummary,
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
          id: shipmentCountsKeys.shipmentsDeliveredSummary,
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
    };
    fixture.detectChanges();
    component.setLearnMoreTableData();
    expect(setLearnMoreTableData).toHaveBeenCalled();
  });

  it('should navigate when onTitleClick is called on undelivered exceptions', () => {
    let spy = spyOn(NavigationUtility, 'navigate');
    component.router = null;
    const tileData = {
      id: 'undeliveredExceptions',
      state: {
        from: ROUTE_STATES.dashboard,
        url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
      },
      url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.exceptions}/`,
    };

    const expectedNavigationExtras = {
      ...tileData.state,
      shipmentsDrilldownFilters: [
        {
          key: 'createdOn',
          value: {
            type: 'relative',
            range: -60,
            ...dummyDate,
          },
        },
      ],
    };
    component.onTileClick(event, tileData);

    expect(spy).toHaveBeenCalledWith(
      null,
      [
        `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.exceptions}/`,
      ],
      false,
      expectedNavigationExtras,
      undefined,
      true
    );
  });
});
