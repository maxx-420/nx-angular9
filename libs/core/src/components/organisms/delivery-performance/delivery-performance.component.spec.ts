// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPerformanceComponent } from './delivery-performance.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Pipe } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';

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
      filterId: 'deliveryPerformanceSummary',
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
        deliveryPerformanceSummary: [
          {
            mode: 'LTL',
            deliveryStatus: [
              {
                name: 'null',
                count: 4,
              },
              {
                name: 'LATE',
                count: 4,
              },
              {
                name: 'ONTIME',
                count: 33,
              },
            ],
          },
          {
            mode: 'TL',
            deliveryStatus: [
              {
                name: 'LATE',
                count: 7,
              },
              {
                name: 'ONTIME',
                count: 100,
              },
            ],
          },
          {
            mode: 'Parcel',
            deliveryStatus: [
              {
                name: 'LATE',
                count: 10,
              },
              {
                name: 'ONTIME',
                count: 100,
              },
            ],
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

describe('DeliveryPerformanceComponent', () => {
  let component: DeliveryPerformanceComponent;
  let fixture: ComponentFixture<DeliveryPerformanceComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [
        DeliveryPerformanceComponent,
        mockPipe({ name: 'content' }),
      ],
      providers: [
        RenderLabelPipe,
        provideMockStore({ initialState }),
        FormBuilder,
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPerformanceComponent);
    component = fixture.componentInstance;
    component.componentFilterId = 'deliveryPerformanceSummary';
    component.dateFilter = {
      ...dummyDate,
      value: 7,
    };
  });

  it('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should change layout on choosing select', () => {
    component.isDonut = true;
    component.performanceForm
      .get('performanceBy')
      .setValue(component.dropdownOptions[1].value);
    component.changeLayout();
    expect(component.isDonut).toBe(false);
  });

  it('should format data for chart and bar', () => {
    component.formatData(
      initialState.shipmentDashboard.summary.data.deliveryPerformanceSummary
    );
    expect(component.data[0].count).toBe(233);
    expect(
      component.shipmentChartData.deliveryPerformanceSummary.shipmentData[0]
        .modes[0].count
    ).toBe(4);
  });

  it('output event should toggle isViewData', () => {
    component.isViewDataClicked = true;
    component.onViewDataClick();
    expect(component.isViewDataClicked).toBe(false);
  });

  it('should drilldown on click on Donut', () => {
    component.l2ListingConfig = {
      state: '',
      url: '',
    };
    component.onDonutChartClicked({ data: ['LATE'] });
    expect(component.drilldownArray[0].deliveryStatus).toBe('late');
  });

  it('should drilldown on click on Donut', () => {
    component.l2ListingConfig = {
      state: '',
      url: '',
    };
    component.clickOnModeChart({ mode: ['TL'], status: 'Delivered Late' });
    expect(component.drilldownArray[1].deliveryStatus).toBe('late');
  });
});
