// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentStatusBarComponent } from './shipment-status-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Pipe, SimpleChange } from '@angular/core';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import NavigationUtility from './../../../utils/navigationUtil';
import {
  getWarehouseMilestoneRollupConfig,
  setMilestoneRollupConfig,
} from './shipment-status-bar.config';

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

import { ROUTER_CONSTANTS } from '../../../constants/router.constant';
import { UserAgentUtility } from './../../../utils/user-agent.util';
import { ShipmentTypeConfig } from './../../../global-config/config';
import { AccessControlUtility } from '../../../utils/access-control.util';
import {
  ROLLUP_GRP_KEYS,
  SHIPMENT_STATUS,
} from '../../../constants/global.constant';

describe('ShipmentStatusBarComponent', () => {
  let component: ShipmentStatusBarComponent;
  let fixture: ComponentFixture<ShipmentStatusBarComponent>;
  let milestoneRollUpData = {
    shipmentType: 'Inbound',
    totalCount: '250',
    milestoneStatusSummary: [
      {
        order: '1',
        name: 'Booking',
        id: 'Booking',
        count: '100',
      },
      {
        order: '2',
        name: 'Departure',
        id: 'Departure',
      },
      {
        order: '3',
        name: 'Customs',
        id: 'Customs',
        count: '10',
      },
      {
        order: '4',
        name: 'Delivery',
        id: 'Delivery',
        count: '0',
      },
      {
        order: '5',
        name: 'Receiving',
        id: 'Receiving',
        count: '0',
      },
      {
        order: '6',
        name: 'Putaway',
        id: 'Putaway',
        count: '50',
      },
    ],
    summaryType: 'inbound',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentStatusBarComponent, mockPipe({ name: 'content' })],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: RenderLabelPipe,
          useClass: mockPipe({ name: 'content' }),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnChanges with dashboard variation with managed trans', () => {
    let spy = spyOn(component, 'getMilestoneRollUpData').and.callThrough();
    component.variation = component.Variations.dashboard;
    component.isAcountTypeManagedInbound = true;
    component.isAcountTypeManagedOutbound = true;
    component.milestoneStatusData = {
      shipmentType: null,
      totalCount: null,
      milestoneStatusSummary: [],
    };
    fixture.detectChanges();
    component.milestoneStatusData = milestoneRollUpData;

    fixture.detectChanges();
    component.ngOnChanges({
      milestoneStatusData: new SimpleChange(
        null,
        component.milestoneStatusData,
        false
      ),
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(
      component.milestoneStatusData,
      setMilestoneRollupConfig().dashboardInboundManagedTrans
    );
    expect(spy).toHaveBeenCalledWith(
      component.milestoneStatusData,
      setMilestoneRollupConfig().dashboardOutboundManagedTrans
    );
  });

  it('test ngOnChanges with warehouse variation with managed trans', () => {
    let spy = spyOn(component, 'getMilestoneRollUpData').and.callThrough();
    component.variation = component.Variations.warehouse;
    component.milestoneStatusData = milestoneRollUpData;

    fixture.detectChanges();
    component.ngOnChanges({
      milestoneStatusData: new SimpleChange(
        null,
        component.milestoneStatusData,
        false
      ),
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      component.milestoneStatusData,
      getWarehouseMilestoneRollupConfig(
        component.milestoneStatusData.summaryType
      )
    );
  });

  it('test ngOnChanges with dashboard variation with non-managed trans', () => {
    let spy = spyOn(component, 'getMilestoneRollUpData').and.callThrough();
    component.variation = component.Variations.dashboard;
    component.isAcountTypeManagedInbound = false;
    component.isAcountTypeManagedOutbound = false;
    component.milestoneStatusData = {
      shipmentType: null,
      totalCount: null,
      milestoneStatusSummary: [],
    };
    fixture.detectChanges();
    component.milestoneStatusData = milestoneRollUpData;

    fixture.detectChanges();
    component.ngOnChanges({
      milestoneStatusData: new SimpleChange(
        null,
        component.milestoneStatusData,
        false
      ),
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(
      component.milestoneStatusData,
      setMilestoneRollupConfig().dashboardInboundNonManagedTrans
    );
    expect(spy).toHaveBeenCalledWith(
      component.milestoneStatusData,
      setMilestoneRollupConfig().dashboardOutboundNonManagedTrans
    );
  });

  it('test ngOnChanges with warehouse variation with non-managed trans', () => {
    let spy = spyOn(component, 'getMilestoneRollUpData').and.callThrough();
    component.variation = component.Variations.warehouse;
    component.milestoneStatusData = milestoneRollUpData;

    fixture.detectChanges();
    component.ngOnChanges({
      milestoneStatusData: new SimpleChange(
        null,
        component.milestoneStatusData,
        false
      ),
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      component.milestoneStatusData,
      getWarehouseMilestoneRollupConfig(
        component.milestoneStatusData.summaryType
      )
    );
  });

  it('test ngOnChanges with dashboard variation when undefined is passed in transaction type', () => {
    let spy = spyOn(component, 'getMilestoneRollUpData').and.callThrough();
    component.variation = component.Variations.dashboard;
    component.isAcountTypeManagedInbound = undefined;
    component.isAcountTypeManagedOutbound = undefined;
    component.milestoneStatusData = {
      shipmentType: null,
      totalCount: null,
      milestoneStatusSummary: [],
    };
    fixture.detectChanges();
    component.milestoneStatusData = milestoneRollUpData;

    fixture.detectChanges();
    component.ngOnChanges({
      milestoneStatusData: new SimpleChange(
        null,
        component.milestoneStatusData,
        false
      ),
    });
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('getMilestoneRollUpData should not be called when milestoneStatusData current value is nulls', () => {
    let spy = spyOn(component, 'getMilestoneRollUpData').and.callThrough();
    component.ngOnChanges({
      milestoneStatusData: new SimpleChange(null, null, false),
    });
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('test navigateToL2Page', () => {
    const url = `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.inbound}`;
    spyOn(NavigationUtility, 'navigate').and.callThrough();
    component.navigateToL2Page('Inbound');
    expect(NavigationUtility.navigate).toHaveBeenCalledWith(null, url, true);
  });

  it('test getMilestoneRollUpData', () => {
    component.getMilestoneRollUpData(
      null,
      setMilestoneRollupConfig().dashboardInboundManagedTrans
    );
    expect(component.rollupMetricsData).toEqual([
      { id: 'shipments', count: 0 },
      { id: 'inTransit', count: 0 },
      { id: 'receiving', count: 0 },
      { id: 'putaway', count: 0 },
    ]);
    component.getMilestoneRollUpData(
      {
        shipmentType: 'Inbound',
        totalCount: '250',
        milestoneStatusSummary: [
          {
            order: '1',
            name: 'Booking',
            id: 'Booking',
            count: '100',
          },
          {
            order: '2',
            name: 'Departure',
            id: 'Departure',
          },
          {
            order: '3',
            name: 'Customs',
            id: 'Customs',
            count: '10',
          },
          {
            order: '4',
            name: 'Delivery',
            id: 'Delivery',
            count: '0',
          },
          {
            order: '5',
            name: 'Receiving',
            id: 'Receiving',
            count: '0',
          },
          {
            order: '6',
            name: 'Putaway',
            id: 'Putaway',
            count: '50',
          },
        ],
        summaryType: 'test',
      },
      setMilestoneRollupConfig().dashboardInboundManagedTrans
    );
    expect(component.rollupMetricsData).toEqual([
      { id: 'shipments', count: 250 },
      { id: 'inTransit', count: 110 },
      { id: 'receiving', count: 0 },
      { id: 'putaway', count: 50 },
    ]);
  });

  it('openLearnMorePopUp', () => {
    spyOn(component, 'refreshViewIfIE').and.callThrough();
    component.openLearnMorePopUp();
    expect(component.showLearnMorePopUp).toBe(true);
    expect(component.refreshViewIfIE).toHaveBeenCalled();
  });

  it('onPopUpClose', () => {
    spyOn(component, 'refreshViewIfIE').and.callThrough();
    spyOn(UserAgentUtility, 'isIE').and.returnValue(true);
    component.onPopUpClose(true);
    expect(component.showLearnMorePopUp).toBe(false);
    expect(component.refreshViewIfIE).toHaveBeenCalled();
  });

  it('getAriaLabel', () => {
    component.rollupMetricsData = [
      { id: 'shipments', count: 250 },
      { id: 'inTransit', count: 110 },
      {},
      { id: 'putaway', count: 50 },
    ];
    expect(component.getAriaLabel()).toBe(
      'undefined undefined, 250 undefined, 110 undefined, undefined undefined, 50 undefined'
    );
  });
  it('uses getWarehouseMilestoneRollupConfig to get relevant milestoneconfig', () => {
    const config = [
      {
        name: ROLLUP_GRP_KEYS.inProcess,
        statusMapping: [
          SHIPMENT_STATUS.created,
          SHIPMENT_STATUS.pending,
          SHIPMENT_STATUS.rated,
          SHIPMENT_STATUS.booked,
          SHIPMENT_STATUS.warehouse,
        ],
      },
      {
        name: ROLLUP_GRP_KEYS.inTransit,
        statusMapping: [SHIPMENT_STATUS.in_transit, SHIPMENT_STATUS.customs],
      },
      {
        name: ROLLUP_GRP_KEYS.delivered,
        statusMapping: [SHIPMENT_STATUS.delivered],
      },
    ];
    spyOn(
      AccessControlUtility,
      '_createCompanyMappingKeyList'
    ).and.returnValue(['GLD@FG@NMI_MO']);
    const result = getWarehouseMilestoneRollupConfig(
      ShipmentTypeConfig.outbound
    );
    expect(result).toEqual(config);
  });
});
