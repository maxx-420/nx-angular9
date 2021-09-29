// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutChartComponent } from './donut-chart.component';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { Pipe, SimpleChange } from '@angular/core';
import { SymphonyDatePipe } from '../../../pipe/symphony-date.pipe';

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

describe('DonutChartComponent', () => {
  let component: DonutChartComponent;
  let fixture: ComponentFixture<DonutChartComponent>;

  const data = [
    {
      name: 'Customer',
      count: '300',
      exceptionReasons: [
        {
          name: 'Service provider vehicle breakdown',
          count: '170',
        },
        {
          name: 'Service provider',
          count: '130',
        },
      ],
    },
    {
      name: 'Agent',
      count: '200',
      exceptionReasons: [
        {
          name: 'Service provider vehicle breakdown',
          count: '170',
        },
        {
          name: 'vehicle breakdown',
          count: '30',
        },
      ],
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DonutChartComponent, mockPipe({ name: 'content' })],
      providers: [RenderLabelPipe, SymphonyDatePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutChartComponent);
    component = fixture.componentInstance;
    component.option = {
      plugins: {
        outlabels: {
          backgroundColor: null,
          color: [
            '#064844',
            '#FF9D7D'
          ],
          text : '%l (%p)',
          stretch: 30,
          font: {
            resizable: true,
            minSize: 15,
            maxSize: 20,
          },
          zoomOutPercentage: 100,
          textAlign: 'start',
        },
        doughnutlabel: {
          display: true,
          labels: [
            {
              text: '',
              font: {
                size: 60,
                weight: 'bold',
                spacing: 1
              },
              color: '#080808',
            },
            {
              text: 'ON TIME',
              font: {
                size: 10,
                weight: 'normal',
              },
              color: '#080808',
            },
          ],
        },
      },
    };
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
  it('should call populateChartData with correct param', () => {
    component.data = data;
    component.count = '1500';
    component.attrToFetchData = ['name', 'count'];
    component.showDonutChartLabels = false;
    let chartDatasetData = ['300', '200'];
    let spy = spyOn(component, 'populateChartData');
    let spy2 = spyOn(component, 'populateChartOptions');
    component.populateChartDataAndOptions();
    expect(spy).toHaveBeenCalledWith(chartDatasetData);
    expect(spy2).toHaveBeenCalledWith();
  });

  it('should call formatModalData', () => {
    spyOn(component, 'formatModalData').and.callThrough();
    fixture.detectChanges();
    component.formatModalData();
    expect(component).toBeTruthy();
  });

  it('should test ngOnChanges', () => {
    component.data = data;
    component.count = '1500';
    component.attrToFetchData = ['name', 'count'];
    component.showDonutChartLabels = false;
    let spy = spyOn(component, 'populateChartDataAndOptions');
    component.ngOnChanges({data: new SimpleChange(null, data, null)});
    expect(spy).toHaveBeenCalled();
    expect(component.showChart).toBeTrue();
  });

  it('should call clickOnDonutChart', () => {
    spyOn(component, 'clickOnDonutChart').and.callThrough();
    let spy = spyOn(component, 'populateChartOptions');
    component.clickOnDonutChart(true);
    expect(component.showDonutChartLabels).toBeTrue();
    expect(spy).toHaveBeenCalled();
  });

  it('should call customLegend', () => {
    const chart = {
      data: {
        datasets: [
          {
            backgroundColor: ['rgba(38, 102, 191, 1)', 'rgba(38, 102, 191, 1)'],
            data: ['300', '200'],
          },
        ],
        labels: ['Customer', 'Agent'],
      },
      getDatasetMeta: (i) => {
        return {
          data: [null, null],
        };
      },
      options: {
        elements: {
          arc: {
            backgroundColor: 'rgba(38, 102, 191, 1)',
          }
        },
      },
    };
    component.count = 2;
    let result = component.customLegend(chart);
    expect(result).toBeTruthy();
  });
});
