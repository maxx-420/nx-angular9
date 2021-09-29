// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeChartComponent } from './time-chart.component';
import { Pipe } from '@angular/core';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { SymphonyDatePipe } from '../../../pipe/symphony-date.pipe';
import * as _moment from 'moment';

const moment = _moment;

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

describe('TimeChartComponent', () => {
  let component: TimeChartComponent;
  let fixture: ComponentFixture<TimeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimeChartComponent,
        mockPipe({ name: 'content' }),
        mockPipe({ name: 'dateFormatter' }),
      ],
      providers: [
        {
          provide: RenderLabelPipe,
          useClass: mockPipe({ name: 'content' }),
        },
        {
          provide: SymphonyDatePipe,
          useClass: mockPipe({ name: 'dateFormatter' }),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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

  it('should call formatModalData', () => {
    spyOn(component, 'formatModalData').and.callThrough();
    fixture.detectChanges();
    component.formatModalData();
    expect(component).toBeTruthy();
  });
});
describe('xAxisTicksFormatter', () => {
  let chartData = {
    datasets: [
      {
        backgroundColor: '#A1BBE0',
        borderColor: '#A1BBE0',
        borderWidth: 1,
        fill: false,
        label: 'Shipment Count',
        lineTension: 0,
        pointBackgroundColor: '#2666BF',
        pointBorderColor: '#2666BF',
        pointRadius: 3,
        type: 'line',
        data: [{ t: '2020-09-16 00:00:00', y: '1124' }],
      },
    ],
    labels: [],
  };
  let component: TimeChartComponent;
  let fixture: ComponentFixture<TimeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimeChartComponent,
        mockPipe({ name: 'content' }),
        mockPipe({ name: 'dateFormatter' }),
      ],
      providers: [
        {
          provide: RenderLabelPipe,
          useClass: mockPipe({ name: 'content' }),
        },
        {
          provide: SymphonyDatePipe,
          useClass: mockPipe({ name: 'dateFormatter' }),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should return today if we have only one date and that is today', () => {
    chartData.labels = [moment()];
    component.chartData = chartData;
    component.timeFilterValue = 1;
    let returnValue = component.xAxisTicksFormatter(10, 0, []);
    let today = moment(new Date()).format('DD-MMM');
    expect(returnValue).toBe(today);
  });
  it('should test when there is only one date and that is not today for different values of index', () => {
    chartData.labels = [moment('10-17-2020 11:40 PM', 'MM-DD-YYYY hh:mm A')];
    component.chartData = chartData;
    component.timeFilterValue = 1;
    let returnValue = component.xAxisTicksFormatter(10, 0, []);
    let today = moment(new Date()).format('DD-MMM');
    expect(returnValue).not.toBe(today);
  });
  it('test for filter value 7, 14', () => {
    chartData.labels = [moment('05-17-2018 11:40 PM', 'MM-DD-YYYY hh:mm A')];
    component.chartData = chartData;
    component.timeFilterValue = 7;
    let returnValue = component.xAxisTicksFormatter(10, 0, []);
    expect(returnValue).toBe('17-May');
    component.timeFilterValue = 14;
    returnValue = component.xAxisTicksFormatter(10, 0, []);
    expect(returnValue).toBe('17-May');
  });
  it('test for filter value 30', () => {
    chartData.labels = [
      moment('05-17-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('05-20-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('05-24-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('05-29-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('06-02-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('06-04-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('06-06-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('06-09-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('06-10-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
    ];
    component.chartData = chartData;
    component.timeFilterValue = 30;
    let returnValue = component.xAxisTicksFormatter(10, 7, []);
    expect(returnValue).toBe('Week 2');
    returnValue = component.xAxisTicksFormatter(10, 9, []);
    expect(returnValue).toBe(undefined);
  });
  it('test for filter value 60', () => {
    chartData.labels = [
      moment('05-17-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('05-20-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('05-24-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('05-29-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('06-02-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('06-04-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('06-06-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('07-09-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
      moment('08-10-2018 11:40 PM', 'MM-DD-YYYY hh:mm A'),
    ];
    component.chartData = chartData;
    component.timeFilterValue = 60;
    let returnValue = component.xAxisTicksFormatter(10, 0, []);
    expect(returnValue).toBe('MAY');
    returnValue = component.xAxisTicksFormatter(10, 8, []);
    expect(returnValue).toBe('AUG');
    returnValue = component.xAxisTicksFormatter(10, 4, []);
    expect(returnValue).toBe(undefined);
  });
  it('test when index is not from the list [1,7,14,30,60]', () => {
    component.chartData = chartData;
    component.timeFilterValue = 5;
    let returnValue = component.xAxisTicksFormatter(10, 0, []);
    expect(returnValue).toBe('17-May');
  });
});
describe('setChartDataAndOptions', () => {
  let component: TimeChartComponent;
  let fixture: ComponentFixture<TimeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimeChartComponent,
        mockPipe({ name: 'content' }),
        mockPipe({ name: 'dateFormatter' }),
      ],
      providers: [
        {
          provide: RenderLabelPipe,
          useClass: mockPipe({ name: 'content' }),
        },
        {
          provide: SymphonyDatePipe,
          useClass: mockPipe({ name: 'dateFormatter' }),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should call populateChartData with correct param', () => {
    const shipmentData = [
      { count: '1124', date: '2020-09-16 00:00:00', id: 'DAY1' },
      { count: '3122', date: '2020-09-17 00:00:00', id: 'DAY2' },
      { count: '14', date: '2020-09-18 00:00:00', id: 'DAY3' },
    ];
    component.shipmentData = shipmentData;
    component.attrToFetchData = ['date', 'count'];
    let chartDatasetData = [
      { y: '1124', t: '2020-09-16 00:00:00' },
      { y: '3122', t: '2020-09-17 00:00:00' },
      { y: '14', t: '2020-09-18 00:00:00' },
    ];
    let spy = spyOn(component, 'populateChartData');
    let spy2 = spyOn(component, 'populateChartOptions');
    component.setChartDataAndOptions();
    expect(spy).toHaveBeenCalledWith(chartDatasetData);
    expect(spy2).toHaveBeenCalledWith(3122);
  });
});
