// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * TimeChart Component
 */

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import * as _moment from 'moment';

import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { SymphonyDatePipe } from '../../../pipe/symphony-date.pipe';
import { AnalyticsService } from '../../../service/analytics-wrapper/analytics.service';
import { DrilldownParams } from '../../../utils/interfaces/drilldownParams.interface';

import { chartData, chartOptions, chartType } from './time-chart-config';

// prettier-ignore
const moment = (_moment as any).default ? (_moment as any).default : _moment;
@Component({
  selector: 'lib-time-chart',
  templateUrl: './time-chart.component.html',
  styleUrls: ['./time-chart.component.scss'],
})
export class TimeChartComponent implements OnInit, OnChanges {
  chartType = chartType;
  chartData: ChartData = chartData;
  chartOptions: ChartOptions = chartOptions;
  shipmentCountLabel: string;
  isViewDataClicked = false;
  modalTitle: string;
  modalData: Array<any>;
  learnMoreAriaLbl: string;

  @Input() chartId;
  @Input() chartTitle: string;
  @Input() shipmentData: Array<any>;
  @Input() dataAutomationAttribute = '';
  @Input() dataAutomationAttributeFilterChip = '';
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
  @Input() enableDrilldown = false;
  @Input() drilldownParams: DrilldownParams;
  @Input() isLoaded = true;
  @Input() hasChartFilter = false;
  @Input() showDateRangeFilter = false;
  @Input() showLearnMoreInTooltip = false;
  @Output() dateRangeChanged = new EventEmitter();
  @Input() showFilterChip: false;
  @Input() defaultFilters: [];
  @Input() selectedFilters: [];
  @Input() classNameForSelect = '';
  @Output() openFilter = new EventEmitter();
  @Output() chipFilterRemoved = new EventEmitter();
  @Output() clickOnChartData = new EventEmitter();

  constructor(
    private readonly contentPipe: RenderLabelPipe,
    private readonly symphonyDatePipe: SymphonyDatePipe,
    private readonly analyticsService: AnalyticsService
  ) {}

  /**
   * populates ChartData and linewidth options
   * @param shipmentType shipmentType
   */
  setChartDataAndOptions() {
    const chartDatasetData: Array<any> = [];
    const tempShipmentData: Array<any> = this.shipmentData;
    let tempData;

    this.shipmentData?.forEach((item) => {
      tempData = {
        t: item[this.attrToFetchData[0]],
        y: item[this.attrToFetchData[1]],
      };
      chartDatasetData.push(tempData);
    });

    const maxCount = Math.max.apply(
      Math,
      tempShipmentData?.map((o) => o[this.attrToFetchData[1]])
    );

    this.populateChartLabels();
    this.populateChartData(chartDatasetData);
    this.populateChartOptions(maxCount);
  }

  /**
   * populate chart labels
   */
  populateChartLabels() {
    const chartLabels: Array<any> = [];

    this.shipmentData?.forEach((item) => {
      chartLabels.push(item[this.attrToFetchData[0]]);
    });
    this.chartData = {
      ...this.chartData,
      labels: chartLabels,
    };
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
      label: this.shipmentCountLabel,
      data: chartDatasetData,
    };
    tempDataSets.push(dataset);
    this.chartData = {
      ...this.chartData,
      datasets: tempDataSets,
    };
  }

  /**
   * populate chart options
   * @param count count
   */
  populateChartOptions(count) {
    const tempYAxisOptions = [];
    const tempXAxisOptions = [];

    tempYAxisOptions.push({
      ...this.chartOptions.scales.yAxes[0],
      ticks: {
        ...this.chartOptions.scales.yAxes[0].ticks,
        suggestedMax: count !== 0 ? Math.ceil((9 * count) / 8) : 5,
      },
    });

    tempXAxisOptions.push({
      ...this.chartOptions.scales.xAxes[0],
      ticks: {
        ...this.chartOptions.scales.xAxes[0].ticks,
        callback: (value, index, values) =>
          this.xAxisTicksFormatter(value, index, values),
      },
    });
    this.chartOptions = {
      ...this.chartOptions,
      scales: {
        ...this.chartOptions.scales,
        xAxes: tempXAxisOptions,
        yAxes: tempYAxisOptions,
      },
    };
  }

  /**
   * format x axis ticks of chart based on filter range
   * @param value value
   * @param index index
   * @param values values
   */
  xAxisTicksFormatter(value, index, values: Array<any>) {
    if (this.timeFilterValue <= 7) {
      return moment(this.chartData?.labels[index]).format('DD-MMM');
    } else if (this.timeFilterValue <= 14 && this.timeFilterValue > 7) {
      if (index === 0 || index === this.chartData?.labels.length - 1) {
        return moment(this.chartData?.labels[index]).format('DD-MMM');
      }
    } else if (this.timeFilterValue <= 30 && this.timeFilterValue > 14) {
      if (index % 7 === 0) {
        const numOfWeek = index / 7 + 1;
        return 'Week ' + numOfWeek;
      }
    } else if (this.timeFilterValue <= 60 && this.timeFilterValue > 30) {
      // moment object of first asix tick
      const firstLabel = moment(this.chartData?.labels[0]);
      // moment object of last asix tick
      const lastLabel = moment(
        this.chartData?.labels[this.chartData?.labels.length - 1]
      );
      if (index === 0) {
        return firstLabel.format('MMM')?.toUpperCase();
      } else if (
        index === this.chartData?.labels.length - 1 &&
        firstLabel.month() !== lastLabel.month()
      ) {
        return lastLabel.format('MMM')?.toUpperCase();
      }
      // this determines wheather we need to show three month label or two
      else if (
        lastLabel.month() -
          moment(this.chartData?.labels[this.chartData?.labels.length - 1])
            .subtract(60, 'days')
            .month() ===
          2 &&
        lastLabel.month() - firstLabel.month() === 2 &&
        index === Math.floor(this.chartData?.labels.length / 2)
      ) {
        return moment(this.chartData?.labels[index])
          .format('MMM')
          ?.toUpperCase();
      }
    } else {
      return value;
    }
  }

  /**
   * method to invoke when view data link is clicked.
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
    this.shipmentData?.forEach((item) => {
      this.modalData.push({
        ...item,
        date: this.symphonyDatePipe.transform(item.date, 'dd-MMM-yyyy'),
      });
    });
  }

  /**
   * lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.shipmentData &&
      changes.shipmentData.currentValue !== changes.shipmentData.previousValue
    ) {
      this.setChartDataAndOptions();
    }
    if (
      changes.filterLabel &&
      changes.filterLabel.currentValue !== changes.filterLabel.previousValue
    ) {
      this.modalTitle = `${this.chartTitle} - ${this.filterLabel}`;
    }
  }

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit() {
    this.modalTitle = `${this.chartTitle} - ${this.filterLabel}`;
    this.learnMoreAriaLbl =
      this.contentPipe.transform('lbl_learn_more_prefix_aria') +
      this.modalTitle +
      this.contentPipe.transform('lbl_chart_learn_more_suffix_aria');
    this.shipmentCountLabel = this.contentPipe.transform('lbl_shipment_count');
    this.setChartDataAndOptions();
  }

  /**
   * Getting value from chart component
   * @param chartDataValue date yyyy-mm-dd
   */
  clickOnChart(chartDataValue, chartId) {
    const timeChartData = {
      chartDataValue,
      chartId,
    };
    this.clickOnChartData.emit(timeChartData);
  }
}
