// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartComponent} from './chart.component';
import {Pipe, SimpleChange} from '@angular/core';
import {chartTypeDonut} from './chart-config';

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

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent, mockPipe({name: 'content'})],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.chartData = {
      datasets: [
        {
          barThickness: 10,
          backgroundColor: [
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
          ],
          data: ['100', '110', '120', '130', '140', '150'],
          label: 'Shipment Count',
        },
      ],
      labels: [
        'Booking',
        'Departure',
        'Customs',
        'Delivery',
        'Receiving',
        'PutAway',
      ],
    };
    component.chartOptions = {
      responsive: true,
      title: {
        display: false,
        text: 'Chart',
        fontSize: 14,
      },
      legend: {
        position: 'top',
        display: false,
        align: 'end',
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            gridLines: {
              display: true,
              drawTicks: false,
            },
            ticks: {
              display: true,
              fontColor: 'rgba(0, 0, 0, 1)',
              fontSize: 10,
              lineHeight: 1.09,
              padding: 16,
              fontFamily: 'Roboto',
              maxRotation: 0,
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            gridLines: {
              drawTicks: false,
            },
            ticks: {
              fontColor: 'rgba(97, 97, 97, 1)',
              fontSize: 10,
              lineHeight: 1.09,
              fontFamily: 'Roboto',
              padding: 10.5,
            },
          },
        ],
      },
      plugins: {
        datalabels: {
          display: false,
        },
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test mergeChartOptionsWithDefaultOptions', () => {
    component.chartOptions = null;
    spyOn(component, 'strToArray').and.returnValue([]);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should test strToArray', () => {
    component.strToArray('', 18);
    expect(component).toBeTruthy();
    component.strToArray(null, 18);
    expect(component).toBeTruthy();
    component.strToArray(undefined, 18);
    expect(component).toBeTruthy();
    component.strToArray('3123', 18);
    expect(component).toBeTruthy();
    component.strToArray(' ', 18);
    expect(component).toBeTruthy();
    let result = component.strToArray('this is a sample string', 5);
    expect(result).toEqual(['this', 'is a', 'sample', 'string']);
  });
  it('test whether my chart is assigned', () => {
    component.chartData = {
      datasets: [
        {
          barThickness: 10,
          backgroundColor: [
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
          ],
          data: ['100', '110', '120', '130', '140', '150'],
          label: 'Shipment Count',
        },
      ],
      labels: [
        'Booking',
        'Departure',
        'Customs',
        'Delivery',
        'Receiving',
        'PutAway',
      ],
    };
    component.createChartData();

    expect(component.myChart.data).toEqual(component.chartData);
  });

  it('test ngOnChanges', () => {
    spyOn(component, 'isNoRecordPresent').and.callThrough();
    const data = {
      datasets: [
        {
          barThickness: 10,
          backgroundColor: [
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
          ],
          data: ['100', '110', '120'],
          label: 'Shipment Count',
        },
      ],
      labels: ['Booking', 'Departure', 'Customs'],
    };
    component.ngOnChanges({
      chartData: new SimpleChange(
        component.chartData,
        component.chartData,
        false
      ),
      chartOptions: new SimpleChange(
        component.chartOptions,
        component.chartOptions,
        false
      ),
    });
    fixture.detectChanges();
    expect(component.isNoRecordPresent).toHaveBeenCalledTimes(0);
    component.ngOnChanges({
      chartData: new SimpleChange(component.chartData, data, false),
      chartOptions: new SimpleChange(
        component.chartOptions,
        component.chartOptions,
        false
      ),
    });
    fixture.detectChanges();
    expect(component.isNoRecordPresent).toHaveBeenCalledTimes(1);
  });

  it('test ngAfterViewInit', () => {
    let spy = spyOn(component, 'generateLegends').and.callThrough();
    let spy2 = spyOn(component, 'clickOnChart').and.callThrough();
    spyOn(document, 'getElementById').and.returnValue(
      document.createElement('div')
    );
    component.chartId = 'test-chart';
    component.chartType = chartTypeDonut;
    component.emitClickEvent = true;
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('test isNoRecordPresent', () => {
    let data = {
      datasets: [
        {
          barThickness: 10,
          backgroundColor: [
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
            'rgba(38, 102, 191, 1)',
          ],
          data: [],
          label: 'Shipment Count',
        },
      ],
    };
    component.isNoRecordPresent(data);
    expect(component.showChart).toEqual(false);
    data = null;
    component.isNoRecordPresent(data);
    expect(component.showChart).toEqual(true);
    data = {
      datasets: [],
    };
    component.isNoRecordPresent(data);
    expect(component.showChart).toEqual(true);
  });

  it('test chartOptionsOnDataChange', () => {
    let result = component.chartOptionsOnDataChange(
      component.chartOptions,
      null
    );
    expect(result).toEqual(undefined);
    let data = {
      datasets: [],
    };
    result = component.chartOptionsOnDataChange(component.chartOptions, data);
    expect(result.scales.xAxes[0].gridLines.lineWidth).toEqual([]);
    result = component.chartOptionsOnDataChange(null, data);
    expect(result.scales.xAxes[0].gridLines.lineWidth).toEqual([]);
  });

  it('test onOptionsChange', () => {
    spyOn(component, 'chartOptionsOnDataChange').and.callThrough();
    component.onOptionsChange(null, component.chartOptions);
    expect(component.chartOptionsOnDataChange).toHaveBeenCalledTimes(0);
    component.onOptionsChange(component.chartOptions, null);
    expect(component.chartOptionsOnDataChange).toHaveBeenCalledTimes(1);
  });

  it('test getCustomClass', () => {
    // spyOn(component, 'getCustomClass').and.callThrough();
    component.isDonutChart = true;
    let result = component.getCustomClass();
    expect(result).toEqual('donut-chart');
  });
  it('test getCustomClass when chart is a WIP chart', () => {
    component.isWIPChart = true;
    let result = component.getCustomClass();
    expect(result).toEqual('wip-chart');
  });
  it('test getCustomClass when chart is a ChartWithFilter', () => {
    component.isChartWithFilter = true;
    let result = component.getCustomClass();
    expect(result).toEqual('chart-with-filter');
  });
  it('test getCustomClass when chart is a default chart', () => {
    component.isDonutChart = false;
    component.isWIPChart = false;
    component.isChartWithFilter = false;
    let result = component.getCustomClass();
    expect(result).toEqual('default-chart');
  });
  it('test breakChartLabels when chart is a line chart', () => {
    component.chartType = 'line';
    let result = component.breakChartLabels(component.chartData);
    expect(result).toEqual(component.chartData);
  });
  it('test breakLabelOnWordBreak', () => {
    let result = component.breakLabelOnWordBreak('test string');
    expect(result).toEqual(['test', 'string']);
    result = component.breakLabelOnWordBreak('');
    expect(result).toEqual([]);
  });
  it('test getNoDataHeight when chart is a WIP chart', () => {
    component.isWIPChart = true;
    let result = component.getNoDataHeight();
    expect(result).toEqual({height: '237px'});
  });
  it('test getNoDataHeight when chart is a ChartWithFilter', () => {
    component.isChartWithFilter = true;
    let result = component.getNoDataHeight();
    expect(result).toEqual({height: '245px'});
  });
});
