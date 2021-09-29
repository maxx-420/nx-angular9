// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShipmentMilestonesComponent } from './shipment-milestones.component';
import { SimpleChange, Pipe } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import ViewportUtility from '../../../utils/viewport';
import { AnalyticsService } from '../../../service/analytics-wrapper/analytics.service';

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

describe('ShipmentMilestonesComponent', () => {
  let component: ShipmentMilestonesComponent;
  let fixture: ComponentFixture<ShipmentMilestonesComponent>;
  let analyticsService: AnalyticsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShipmentMilestonesComponent,
        mockPipe({ name: 'content' }),
      ],
      imports: [
        MatStepperModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: '', component: ShipmentMilestonesComponent },
          { path: '123', component: ShipmentMilestonesComponent },
        ]),
      ],
      providers: [RenderLabelPipe],
    }).compileComponents();
    analyticsService = TestBed.inject(AnalyticsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentMilestonesComponent);
    component = fixture.componentInstance;
    component.milestoneLabels = {
      shipment: 'SHIPMENT',
      details: 'Details',
      upcoming: 'Upcoming',
      inProgress: 'In Progress',
    };
    component.routePath = 'shipment';
    component.stepsInfo = [
      {
        id: 'Booking',
        name: 'BOOKING',
        shipmentCount: 0,
        order: 2,
        date: '5/19/2020',
        isCompleted: true,
        statusMessage: 'Completed',
      },
      {
        id: 'Warehouse',
        name: 'WAREHOUSE',
        shipmentCount: 0,
        order: 1,
        date: '5/18/2020',
        isCompleted: true,
        statusMessage: 'Completed',
      },
      {
        id: 'Departure',
        name: 'DEPARTURE',
        shipmentCount: 0,
        order: 3,
        date: null,
        isCompleted: false,
        statusMessage: 'DEPARTED',
      },
      {
        id: 'Customs',
        name: 'CUSTOMS',
        shipmentCount: 0,
        order: 4,
        date: null,
        isCompleted: false,
        statusMessage: 'UPCOMING',
      },
      {
        id: 'Delivery',
        name: 'DELIVERY',
        shipmentCount: 0,
        order: 5,
        date: null,
        isCompleted: false,
        statusMessage: 'UPCOMING',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit shipment as selected step when selected index is 0', () => {
    spyOn(component, 'onStepSelection').and.callThrough();
    spyOn(component.milestoneEvent, 'emit');
    const value = 0;
    component.onStepSelection(value);
    fixture.detectChanges();
    expect(component.milestoneEvent.emit).toHaveBeenCalledWith('shipment');
  });

  it('should emit first milestone as selected step when selected index is 1', () => {
    spyOn(component, 'onStepSelection').and.callThrough();
    spyOn(component.milestoneEvent, 'emit');
    const value = 1;
    component.onStepSelection(value);
    fixture.detectChanges();
    expect(component.milestoneEvent.emit).toHaveBeenCalledWith('booking');
  });

  it('should call ngOnChanges and selectedIndex should be 0 when shipment is clicked', () => {
    component.isShipmentClicked = true;
    component.ngOnChanges({
      isShipmentClicked: new SimpleChange(
        null,
        component.isShipmentClicked,
        true
      ),
    });
    fixture.detectChanges();
    expect(component.selectedIndex).toEqual(0);
  });

  it('selectedIndex should be -1 when shipment is not clicked and device is mobile on calling ngOnChanges', () => {
    spyOn(ViewportUtility, 'checkViewport').and.returnValue(true);
    component.isShipmentClicked = false;
    component.ngOnChanges({
      isShipmentClicked: new SimpleChange(
        null,
        component.isShipmentClicked,
        true
      ),
    });
    fixture.detectChanges();
    expect(component.selectedIndex).toEqual(-1);
  });

  it('selectedIndex should not change when shipment is not clicked and device is not mobile on calling ngOnChanges', () => {
    spyOn(ViewportUtility, 'checkViewport').and.returnValue(false);
    component.isShipmentClicked = false;
    component.selectedIndex = 1;
    component.ngOnChanges({
      isShipmentClicked: new SimpleChange(
        null,
        component.isShipmentClicked,
        true
      ),
    });
    fixture.detectChanges();
    expect(component.selectedIndex).toEqual(1);
  });

  it('selectedIndex should be -1 when route path current value is null, previous value is not null and device is mobile', () => {
    spyOn(ViewportUtility, 'checkViewport').and.returnValue(true);
    component.ngOnChanges({
      routePath: new SimpleChange('shipment', null, false),
    });
    fixture.detectChanges();
    expect(component.selectedIndex).toEqual(-1);
  });

  it('selectedIndex should be 0 when route path current value and previous value is null', () => {
    component.ngOnChanges({
      routePath: new SimpleChange(null, null, false),
    });
    fixture.detectChanges();
    expect(component.selectedIndex).toEqual(0);
  });

  it('selectedIndex should be 3 when departure is clicked', () => {
    component.isShipmentClicked = false;
    component.ngOnChanges({
      routePath: new SimpleChange('shipment', 'departure', false),
    });
    fixture.detectChanges();
    expect(component.selectedIndex).toEqual(3);
  });

  it('selectedIndex should be 0 when route path is not defined and the device is not mobile', () => {
    component.isShipmentClicked = false;
    component.routePath = null;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(component.selectedIndex).toEqual(0);
  });

  it('selectedIndex should be 0 when route path is not defined and the device is not mobile', () => {
    component.isShipmentClicked = false;
    component.routePath = null;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(component.selectedIndex).toEqual(0);
  });

  it('selectedIndex should be -1 when route path is not defined and the device is mobile', () => {
    spyOn(ViewportUtility, 'checkViewport').and.returnValue(true);
    component.routePath = null;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(component.selectedIndex).toEqual(-1);
  });

  it('selected index should set to 0 when new viewport is not mobile and selected index is -1', () => {
    spyOn(ViewportUtility, 'checkViewport').and.returnValue(false);
    component.selectedIndex = -1;
    component.setSelectedIndexOnViewportChange();
    expect(component.selectedIndex).toBe(0);
  });

  it('selected index should set to -1 when new viewport is mobile, selected index is 0 and isShipmentClicked is false', () => {
    spyOn(ViewportUtility, 'checkViewport').and.returnValue(true);
    component.selectedIndex = 0;
    component.isShipmentClicked = false;
    component.setSelectedIndexOnViewportChange();
    expect(component.selectedIndex).toBe(-1);
  });

  it('milestone should not clickable when current step status is upcoming', () => {
    expect(component.isMilestoneClickable({ status: 'upcoming' })).toBe(false);
  });

  it('should call onLearnMoreClick', () => {
    component.isLearnMoreClicked = false;
    component.onLearnMoreClick();
    expect(component.isLearnMoreClicked).toBeTruthy();
  });

  it('should call onModalClose', () => {
    component.isLearnMoreClicked = true;
    component.onModalClose({});
    expect(component.isLearnMoreClicked).toBeFalsy();
  });

  it('should call createLinkClickTagObject when trackExpansionToggle is called with true param', () => {
    let spy = spyOn(analyticsService, 'createLinkClickTagObject');
    component.trackExpansionToggle(true, 'Milestone');
    expect(spy).toHaveBeenCalledWith(
      '#',
      `Milestone Accordion Open`,
      'Milestones',
      'Internal',
      { link_section: 'Milestones' }
    );
  });

  it('should call initViewportVariables when orientation change happens', () => {
    let spy = spyOn(ViewportUtility, 'checkViewport').and.returnValue(true);
    component.initViewportVariables();
    expect(spy).toHaveBeenCalled();
    expect(component.isDesktop).toEqual(true);
  });
});
