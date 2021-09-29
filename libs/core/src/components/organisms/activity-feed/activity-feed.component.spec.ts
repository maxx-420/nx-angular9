// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFeedComponent } from './activity-feed.component';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { SymphonyDatePipe } from '../../../pipe/symphony-date.pipe';
import { MILESTONE_STATUS } from './../../../constants/global.constant';

import { Pipe } from '@angular/core';

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

describe('ActivityFeedsComponent', () => {
  let component: ActivityFeedComponent;
  let fixture: ComponentFixture<ActivityFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityFeedComponent, mockPipe({ name: 'content' }), SymphonyDatePipe],
      providers: [RenderLabelPipe, SymphonyDatePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityFeedComponent);
    component = fixture.componentInstance;
    component.componentID = {
      documentsTab: 'DocumentsTab',
      entryDetails: 'L3-IN-ShipmentDetailCardEntryDetails',
      itemShippedCard: 'L3-IN-ItemsShippedCard',
      transportationDetailsCard: 'TransportationDetailsCard',
      carrierShipmentNumberCard: 'L3-IN-CarrierShipmentNumberCard',
      logiNextLink: 'L3-OUT-ShipmentDetailCardLogiNextLink',
    };
    component.inclusionList = {
      DocumentsTab: 'DocumentsTab',
      'L3-IN-ShipmentDetailCardEntryDetails':
        'L3-IN-ShipmentDetailCardEntryDetails',
      'L3-IN-ItemsShippedCard': 'L3-IN-ItemsShippedCard',
      TransportationDetailsCard: 'TransportationDetailsCard',
      'L3-IN-CarrierShipmentNumberCard': 'L3-IN-CarrierShipmentNumberCard',
      'L3-OUT-ShipmentDetailCardLogiNextLink':
        'L3-OUT-ShipmentDetailCardLogiNextLink',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCompletedStatusLabel', () => {
    component.milestoneStatus = MILESTONE_STATUS.completed;
    component.milestoneCompletionDateTime = "2020-10-09";
    expect(component.getMilestoneStatusLabel()).toBe(': 2020-10-09');
  });

  it('should call getCompletedStatusLabel if milestoneCompletionDateTime is null', () => {
    component.milestoneStatus = MILESTONE_STATUS.completed;
    component.milestoneCompletionDateTime = null;
    expect(component.getMilestoneStatusLabel()).toBe('');
  });

  it('should call getCompletedStatusLabel if milestoneStatus is inProgress', () => {
    component.milestoneStatus = MILESTONE_STATUS.inProgress;
    expect(component.getMilestoneStatusLabel()).toBe('');
  });

  it('should call openLogiNextTrackUrl', () => {
    let segmentNumber = 0;
    component.openLogiNextTrackUrl(segmentNumber);
    expect(component).toBeTruthy();
  });
  it('should call showLogiNextLink', () => {
    let additionalTrackingIndicator = 'Y';
    component.showLogiNextLink(additionalTrackingIndicator);
    expect(component).toBeTruthy();
  });

  it('showLogiNextLink', () => {
    let additionalTrackingIndicator = 'Y';
    component.milestoneID = 'InTransit';
    component.originCountryCode ='US';

    // If all conditions are satisfied
    expect(
      component.showLogiNextLink(additionalTrackingIndicator)
    ).toBe(true);

    // if Milestone ID is not In Transit
    component.milestoneID = 'Booking';
    expect(
      component.showLogiNextLink(additionalTrackingIndicator)
    ).toBe(false);

    // If originCountryCode is not present
    component.originCountryCode = null;
    component.milestoneID = 'InTransit';
    expect(
      component.showLogiNextLink(additionalTrackingIndicator)
    ).toBe(false);

    // If additionalTrackingIndicator is N
    component.originCountryCode = 'US';
    additionalTrackingIndicator = 'N';
    expect(
      component.showLogiNextLink(additionalTrackingIndicator)
    ).toBe(false);

  });


  it('should call ngAfterViewInit', () => {
    component.isActive = true;
    component.ngAfterViewInit();
    expect(component.isActive).toBeTruthy();
  });

  it('should call ngAfterViewInit if is active false', () => {
    component.isActive = false;
    component.ngAfterViewInit();
    expect(component.isActive).toBeFalsy();
  });

  it('should call showEntryDetails', () => {
    component.milestoneID = 'customs';
    component.isUcpAccess = true;
    component.hasEntryDetailAccess = true;
    let value = component.showEntryDetails(24343);
    expect(value).toBe(24343);
  });
});
