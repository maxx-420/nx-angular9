// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionsListingComponent } from './exceptions-listing.component';
import { RenderLabelPipe } from 'libs/core/src/pipe/render-label/render-label.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { Pipe } from '@angular/core';

function mockPipe(options: Pipe): Pipe {
  const metadata: Pipe = {
    name: options.name,
  };

  return <any>Pipe(metadata)(
    class MockPipe {
      transform() { }
    }
  );
}

describe('ExceptionsListingComponent', () => {
  let component: ExceptionsListingComponent;
  let fixture: ComponentFixture<ExceptionsListingComponent>;
  const tableData = [
    {
      upsShipmentNo: '86019262',
      referenceNo: '3176832132',
      exception: 'Customer Destination Closed',
      orderShipped: '2020-11-01 12:00:31.497',
      scheduledDelivery: '2020-11-05 12:00:31.497',
      origin: {
        addressLine1: 'UPS-SCS',
        addressLine2: '660 Fritz Drive',
        city: 'Austin',
        stateProvince: 'TX',
        postalCode: '30041',
        country: 'US',
      },
      destination: {
        addressLine1: 'GENERAL DYNAMICS',
        addressLine2: '6403 SKIPJACK CIRCLE',
        city: 'Boyton',
        stateProvince: 'VA',
        postalCode: '30041',
        country: 'US',
      },
      carrierServiceLevel: 'carrier',
      milestoneStatus: 'Pending',
    },
    {
      upsShipmentNo: '86019263',
      referenceNo: '3176832133',
      exception: 'Customer Destination Closed',
      orderShipped: '2020-11-01 12:00:31.497',
      scheduledDelivery: '2020-11-05 12:00:31.497',
      origin: {
        addressLine1: 'UPS-SCS',
        addressLine2: '660 Fritz Drive',
        city: 'Austin',
        stateProvince: 'TX',
        postalCode: '30041',
        country: 'US',
      },
      destination: {
        addressLine1: 'GENERAL DYNAMICS',
        addressLine2: '6403 SKIPJACK CIRCLE',
        city: 'Boyton',
        stateProvince: 'VA',
        postalCode: '30041',
        country: 'US',
      },
      carrierServiceLevel: 'carrier',
      milestoneStatus: 'Pending',
    },
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExceptionsListingComponent,
        mockPipe({ name: 'content' }),
      ],
      imports: [RouterTestingModule],
      providers: [RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionsListingComponent);
    TestBed.inject(RenderLabelPipe);
    component = fixture.componentInstance;
    component.undeliveredExcDataList = tableData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getClickedRowData', () => {
    spyOn(component, 'getClickedRowData').and.callThrough();
    const data = { upsShipmentNo: '74018344' };
    component.getClickedRowData(data);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should emit HeaderClickEvent', () => {
    const spy = spyOn(component.headerClickEvent, 'emit');
    component.onHeaderClick();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should create table for lateDeliveryException and expect headerClick', () => {
    fixture = TestBed.createComponent(ExceptionsListingComponent);
    TestBed.inject(RenderLabelPipe);
    component = fixture.componentInstance;
    component.isLateDeliveryExceptionsTable = true;
    component.isExceptionTypeIncluded = false;
    component.undeliveredExcDataList = [
      {
        upsShipmentNo: "86019262",
        referenceNo: "3176832132",
        exception: "Customer Destination Closed",
        orderShipped: "2021-11-01 12:00:31.497",
        scheduledDelivery: "2020-11-05 12:00:31.497",

        orderShippedTimeZone: "America/Orleans",
        scheduledDeliveryTimeZone: "America/New York",

        origin: {
          line1: "GENERAL DYNAMICS",
          line2: "6403 SKIPJACK CIRCLE",
          city: "Boyton",
          state: "VA",
          zipCode: "30041",
          country: "US",

          locationCode: "AUS"
        },
        destination: {
          line1: "GENERAL DYNAMICS",
          line2: "6403 SKIPJACK CIRCLE",
          city: "Boyton",
          state: "VA",
          zipCode: "30041",
          country: "US"
        },
        carrierServiceLevel: "carrier",
        milestoneStatus: "Pending"
      },
      {
        upsShipmentNo: "86019262",
        referenceNo: "3176832132",
        exception: "Customer Destination Closed",
        orderShipped: "2020-11-02 12:00:31.497",
        scheduledDelivery: "2020-11-05 12:00:31.497",

        orderShippedTimeZone: "America/Orleans",
        scheduledDeliveryTimeZone: "America/New York",

        origin: {
          line1: "GENERAL DYNAMICS",
          line2: "6403 SKIPJACK CIRCLE",
          city: "Boyton",
          state: "VA",
          zipCode: "30041",
          country: "US",

          locationCode: "AUS"
        },
        destination: {
          line1: "GENERAL DYNAMICS",
          line2: "6403 SKIPJACK CIRCLE",
          city: "Boyton",
          state: "VA",
          zipCode: "30041",
          country: "US"
        },
        carrierServiceLevel: "carrier",
        milestoneStatus: "Pending"
      },
      {
        upsShipmentNo: "86019262",
        referenceNo: "3176832132",
        exception: "Customer Destination Closed",
        orderShipped: "2020-11-02 12:00:31.497",
        scheduledDelivery: "2020-11-05 12:00:31.497",

        orderShippedTimeZone: "America/Jacksonville",
        scheduledDeliveryTimeZone: "America/New York",

        origin: {
          line1: "GENERAL DYNAMICS",
          line2: "6403 SKIPJACK CIRCLE",
          city: "Boyton",
          state: "VA",
          zipCode: "30041",
          country: "US",

          locationCode: "AUS"
        },
        destination: {
          line1: "GENERAL DYNAMICS",
          line2: "6403 SKIPJACK CIRCLE",
          city: "Boyton",
          state: "VA",
          zipCode: "30041",
          country: "US"
        },
        carrierServiceLevel: "carrier",
        milestoneStatus: "Pending"
      },
    ]
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const spy = spyOn(component.headerClickEvent, 'emit');
    component.onHeaderClick();
    expect(spy).toHaveBeenCalledWith(true);
  })
});
