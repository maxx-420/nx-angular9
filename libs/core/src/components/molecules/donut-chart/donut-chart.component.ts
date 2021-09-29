// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
//  Donut Chart Component

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';

import { AnalyticsService } from '../../../service/analytics-wrapper/analytics.service';
import { VIEWPORT_NAMES } from '../../../constants/viewport.constant';

import { default as ViewportUtility } from './../../../utils/viewport';
import {
  chartData,
  chartOptions,
  chartType,
  Config,
} from './donut-chart.config';

@Component({
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
  selector: 'lib-donut-chart',
})
export class DonutChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() chartId;
  @Input() chartTitle: string;
  @Input() data: any;
  @Input() option: any;
  @Input() dataAutomationAttribute = '';
  @Input() noDataMessage = '';
  @Input() attrToFetchData: Array<string>;
  @Input() hasApiFailed: boolean;
  @Input() ariaLabel: string;
  @Input() yAxisLabel = '';
  @Input() timeFilterValue: any;
  @Input() customStyle: any = { height: '351px' };
  @Input() errorReason: string;
  @Input() pageSection: string;
  @Input() filterLabel = '';
  @Input() contentHtmlKey: string;
  @Input() count;
  @Input() hideDrillDownButtonLabel = '';
  @Input() component: any;
  @Output() drilldownEvent = new EventEmitter();
  chartType = chartType;
  chartData: ChartData = chartData;
  chartOptions: ChartOptions = chartOptions;
  isViewDataClicked = false;
  modalTitle: string;
  modalData: Array<any>;
  learnMoreAriaLbl: string;
  ngUnsubscribe = new Subject();
  showChart = false;
  isMobile: boolean;
  showDonutChartLabels: boolean;

  constructor(private readonly analyticsService: AnalyticsService) {
    this.isMobile = ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile);
  }
  /**
   * populateChartDataAndOptions
   */
  populateChartDataAndOptions() {
    const chartLabels: Array<any> = [];
    const chartDatasetData: Array<any> = [];

    this.data?.forEach((item) => {
      chartLabels.push(item[this.attrToFetchData[0]]);
      chartDatasetData.push(item[this.attrToFetchData[1]]);
    });

    this.chartData = {
      ...this.chartData,
      labels: chartLabels,
      dataArr: this.data,
    };
    this.populateChartData(chartDatasetData);
    this.populateChartOptions();
    this.showChart = true;
  }

  /**
   * populateChartOptions
   */
  populateChartOptions() {
    const doughnutLabels: Array<any> = this.option.plugins.doughnutlabel.labels;

    this.chartOptions = {
      ...this.chartOptions,
      layout: this.option ? this.option.layout : this.chartOptions.layout,
      legendCallback: this.customLegend,
      plugins: {
        ...this.chartOptions.plugins,
        doughnutlabel: {
          ...this.chartOptions.plugins.doughnutlabel,
          labels: doughnutLabels,
        },
      },
      legend: {
        ...this.chartOptions.legend,
      },
    };
  }

  /**
   * Getting value from chart component
   * @param state boolean
   */
  clickOnDonutChart(showDonutChartLabels: boolean) {
    this.analyticsService.createLinkClickTagObject(
      '#',
      'Band Interaction',
      'Interaction with Late Delivery Exception Graph',
      'Internal',
      { link_section: 'Late Delivery Exception Graph' }
    );
    this.showDonutChartLabels = showDonutChartLabels;
    this.populateChartOptions();
  }

  /**
   * Getting value from chart component
   * @param state string[]
   */
  clickOnDonutChartSlice(state) {
    this.drilldownEvent.emit(state);
  }

  /**
   * To create custom legend
   * @param chart chart
   */
  readonly customLegend = (chart) => {
    const data = chart.data;
    const totalCount = this.count;
    const legendHtml = [];
    legendHtml.push('<ul style="list-style: none; margin: 15px 0;">');

    if (data.labels.length && data.datasets.length) {
      data.labels.forEach((label, i) => {
        const ds = data.datasets[0];
        const meta = chart.getDatasetMeta(0);
        const arc = meta.data[i];
        const custom = (arc && arc.custom) || {};
        const getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
        const arcOpts = chart.options.elements.arc;
        const fill = custom.backgroundColor
          ? custom.backgroundColor
          : getValueAtIndexOrDefault(
              ds.backgroundColor,
              i,
              arcOpts.backgroundColor
            );

        legendHtml.push(
          '<li class="chart-legend-item" style="display: flex; padding: 3px 20px; align-items: center;">'
        );
        legendHtml.push('<button>');
        legendHtml.push(
          '<span class="chart-legend" style="display: inline-block;margin: 5px;width: 10px;height: 10px;border-radius: 100%;background-color:' +
            fill +
            '"></span>'
        );
        legendHtml.push(
          `<span style="display: inline-block;font-weight: bold;color: #757575; font-size: 10px" class="chart-legend-label-text">${label} ${(
            (ds.data[i] / +totalCount) *
            100
          ).toFixed(2)}%</span>`
        );
        legendHtml.push(
          `&nbsp;<i style="display: inline-block;font-weight: bold;color: #757575;" class="symphony-icons symphony-icons-angle-right" aria-hidden="true"></i>`
        );
        legendHtml.push('</button>');
        legendHtml.push('</li>');
      });
    }
    legendHtml.push('</ul>');
    return legendHtml.join('');
  }

  /**
   * populate chart data
   * @param chartDatasetData chartDatasetData
   * @param chartLabels chartLabels
   */
  populateChartData(chartDatasetData: Array<any>) {
    const tempDataSets = [];
    let dataset = this.chartData.datasets[0];
    dataset = {
      ...dataset,
      data: chartDatasetData,
    };
    tempDataSets.push(dataset);
    this.chartData = {
      ...this.chartData,
      datasets: tempDataSets,
    };
  }

  /**
   * ngOnChanges lifecyle hook
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.data &&
      changes.data.currentValue !== changes.data.previousValue
    ) {
      this.populateChartDataAndOptions();
    }
  }

  /**
   * ngOnInit lifecyle hook
   */
  ngOnInit() {
    this.modalTitle = this.chartTitle;
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.ngUnsubscribe), debounceTime(Config.debounceTime))
      .subscribe((e) => {
        this.showChart = false;
        this.isMobile = ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile);
        this.populateChartDataAndOptions();
      });

    this.populateChartDataAndOptions();
  }

  /**
   * ngOnDestroy lifecycle hook
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * method to invoke when modal is closed
   * @param event event
   */
  onModalClose(event) {
    this.isViewDataClicked = false;
    // Tag for modal close
    this.analyticsService.createModalOpenCloseTagObject(
      this.modalTitle,
      'Modal Closed',
      'Internal',
      { link_section: 'Modal' }
    );
  }

  /**
   * formatModalData
   */
  formatModalData() {
    this.modalData = [];
    this.data?.forEach((item) => {
      this.modalData.push({
        ...item,
      });
    });
  }

  /**
   * onViewDataClick
   */
  onViewDataClick() {
    this.isViewDataClicked = true;
    this.formatModalData();
    // Tag for click of Learn More
    this.analyticsService.createLinkClickTagObject(
      '#',
      'Learn More about ' + this.chartTitle,
      'Contextual Help Interaction',
      'Internal',
      { link_section: 'Contextual Help' }
    );
  }
}
