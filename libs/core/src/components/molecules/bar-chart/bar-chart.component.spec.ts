// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { BarChartComponent } from './bar-chart.component';
import { Pipe, SimpleChange } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BarChartComponent, mockPipe({ name: 'content' })],
      providers: [RenderLabelPipe, FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    component.shipmentChartData = [
      {
        name: 'WAREHOUSE',
        id: 'Warehouse',
        count: '110',
      },
      {
        name: 'BOOKING',
        id: 'Booking',
        count: '90',
      },
      {
        name: 'DEPARTURE',
        id: 'Departure',
        count: '150',
      },
    ];
    component.attrToFetchData = ['name', 'count'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onChanges', () => {
    component.ngOnChanges({
      shipmentChartData: new SimpleChange(
        component.shipmentChartData,
        component.shipmentChartData,
        false
      ),
    });
    fixture.detectChanges();
    component.ngOnChanges({
      shipmentChartData: new SimpleChange(
        component.shipmentChartData,
        null,
        false
      ),
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set suggestedMax to 1', () => {
    component.shipmentChartData = [
      {
        name: 'BOOKING',
        id: 'Booking',
        count: '0',
      },
      {
        name: 'DEPARTURE',
        id: 'Departure',
        count: '0',
      },
    ];
    component.ngOnChanges({
      shipmentChartData: new SimpleChange(
        null,
        component.shipmentChartData,
        false
      ),
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('test for null shipmentChartData', () => {
    const data = [
      {
        name: 'BOOKING',
        id: 'Booking',
        count: '0',
      },
      {
        name: 'DEPARTURE',
        id: 'Departure',
        count: '0',
      },
    ];
    component.shipmentChartData = null;
    component.ngOnChanges({
      shipmentChartData: new SimpleChange(
        data,
        component.shipmentChartData,
        false
      ),
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call onViewDataClick', () => {
    spyOn(component, 'onViewDataClick').and.callThrough();
    fixture.detectChanges();
    component.onViewDataClick();
    expect(component).toBeTruthy();
  });

  it('should call onModalClose', () => {
    spyOn(component, 'onModalClose').and.callThrough();
    fixture.detectChanges();
    component.onModalClose({});
    expect(component).toBeTruthy();
  });

  it('should call checkIfNoData if all count zero', () => {
    const data = [
      {
        id: 'Created',
        name: 'Created',
        count: '0',
        order: '1',
      },
      {
        id: 'Booking',
        name: 'Booking',
        count: '0',
        order: '2',
      },
    ];
    let res = component.checkIfNoData(data);
    expect(res).toEqual([]);
  });

  it('should call checkIfNoData if all count not zero', () => {
    const data = [
      {
        id: 'Created',
        name: 'Created',
        count: '10',
        order: '1',
      },
      {
        id: 'Booking',
        name: 'Booking',
        count: '2',
        order: '2',
      },
    ];
    let res = component.checkIfNoData(data);
    expect(res).toEqual(data);
  });

  it('should call checkIfNoData if input is null', () => {
    let res = component.checkIfNoData(null);
    expect(res).toBe(null);
  });

  it('should call onChanges when shipmentChartData is ordersSummary', () => {
    const data: any = {
      id: 'activities-summary',
      ordersSummary: {
        shipmentData: [
          {
            name: 'Pick Dispatched',
            modes: [
              {
                name: 'LTL',
                count: '97',
              },
            ],
          },
          {
            name: 'Pick Completed',
            modes: [
              {
                name: 'LTL',
                count: '33',
              },
            ],
          },
        ],
      },
      success: true,
    };
    component.stacked = true;
    component.ngOnChanges({
      shipmentChartData: new SimpleChange(null, data, false),
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('defaultDataLabelFormatter should return label', () => {
    const obj = {
      chart: {
        $chartTotalPluginConfig: {
          totalOfLabels: ['10000'],
        },
      },
      dataIndex: 0,
    };
    const result = component.defaultDataLabelFormatter(null, obj);
    expect(result).toEqual('10000');
  });
});
