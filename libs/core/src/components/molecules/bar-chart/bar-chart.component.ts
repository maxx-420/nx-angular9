// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * BarChart component of core
 */

import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import CommonUtility from '../../../utils/commonUtil';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { AnalyticsService } from '../../../service/analytics-wrapper/analytics.service';
import { DrilldownParams } from '../../../utils/interfaces/drilldownParams.interface';

import {
  chartData,
  chartId,
  chartOptions,
  chartType,
  COLOR_ACCENT_BLUE,
} from './bar-chart-config';

const TOGGLE_DEFAULT_VALUE = 'ordersSummary';

const BACKGROUND_COLORS = [
  '#2666BF',
  '#B57BC7',
  '#FFA0C3',
  '#FF9D7D',
  '#FFC100',
  '#C3D24A',
  '#4CAF85',
  '#00857D',
];

const BLACK_COLOR = '#000000';

@Component({
  selector: 'lib-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BarChartComponent
  implements OnInit, OnChanges, OnDestroy, AfterContentInit {
  chartType = chartType;
  chartData: ChartData = chartData;
  chartOptions: ChartOptions = chartOptions;
  shipmentCountLabel: string;
  isViewDataClicked = false;
  modalTitle: string;
  learnMoreAriaLbl: string;

  toppings = new FormControl(); // TODO
  legendList: string[];

  @Input() chartId = chartId;
  @Input() chartTitle: string;
  @Input() shipmentChartData: Array<any> = [];
  @Input() option;
  @Input() dataAutomationAttribute = '';
  @Input() dataAutomationAttributeFilterChip = '';
  @Input() ariaLabel: string;
  @Input() noDataMessage = '';
  @Input() yAxisLabel = '';
  @Input() yAxisScaleLabel: string;
  @Input() xAxisScaleLabel: string;
  @Input() attrToFetchData: Array<string>;
  @Input() hasApiFailed: boolean;
  @Input() customStyle: any = { height: '351px' };
  @Input() errorReason: string;
  @Input() pageSection: string;
  @Input() filterLabel = '';
  @Input() contentHtmlKey: string;
  @Input() toggleList;
  chartFilterForm: FormGroup;
  @Input() enableDrilldown = false;
  @Input() drilldownParams: DrilldownParams;
  @Input() barColor = COLOR_ACCENT_BLUE;
  @Input() countLabel = 'lbl_shipment_count';

  @Input() showFilterChip: false;
  @Input() defaultFilters: [];
  @Input() selectedFilters: [];
  @Output() openFilter = new EventEmitter();
  @Output() chipFilterRemoved = new EventEmitter();

  @Input() isOldChart = true;
  @Input() showYAxesLabel = true;
  @Input() stackedChartColors = BACKGROUND_COLORS;

  @Input() toggleValue = TOGGLE_DEFAULT_VALUE;
  @Input() stacked = false;
  @Input() emitClickEvent = false;
  showCustomLegends = false;
  @Input() toggleTypes = [];
  @Input() labelCustomMapping: any;
  @Input() showModeFilter = false;
  @Input() customTooltipCallback: any = null;
  @Output() clickOnChartData = new EventEmitter();

  @Input() showLearnMoreInTooltip = false;
  @Input() learnMoreTableTitle: string;
  @Input() customDataLabelsFormatter: any = this.defaultDataLabelFormatter;
  @Input() learnMoreData: any;

  showColorLabelTooltip = false;
  ngUnsubscribe = new Subject();
  customLegendsStyle = { top: '74px', right: '10px', 'font-size': '10px' };

  constructor(
    private readonly contentPipe: RenderLabelPipe,
    private readonly analyticsService: AnalyticsService,
    private readonly fb: FormBuilder
  ) {
    this.chartFilterForm = this.fb.group({
      mode: ['', Validators.required],
    });
  }

  /**
   * populates ChartData and linewidth options
   * @param shipmentType shipmentType
   */
  setChartDataAndOptions(onLegendChange = false) {
    const chartLabels: Array<any> = [];
    let chartDatasetData: Array<any> = [];
    // sorting milestoneStatusSummary in ascending order bassed on order property

    const tempMilestoneStatusSummary: Array<any> =
      this.stacked && this.shipmentChartData
        ? this.shipmentChartData[this.toggleValue]?.shipmentData
        : this.shipmentChartData;
    let maxCount = 0;

    maxCount = Math.max.apply(
      Math,
      tempMilestoneStatusSummary?.map((o) => o[this.attrToFetchData[1]])
    );
    tempMilestoneStatusSummary?.forEach((item) => {
      chartLabels.push(item[this.attrToFetchData[0]]);
      this.showCustomLegends = false;
      if (this.stacked && this.shipmentChartData[this.toggleValue]) {
        this.legendList = this.shipmentChartData[
          this.toggleValue
        ].modesAvailable;
        if (
          this.shipmentChartData[this.toggleValue] &&
          (!this.legendList || !this.legendList.length)
        ) {
          chartDatasetData.push(item.modes[0][this.attrToFetchData[1]]);
        } else {
          maxCount = 0;
          const maxList = [];
          this.showCustomLegends = true;
          chartDatasetData = (onLegendChange
            ? this.chartFilterForm.get('mode').value
            : this.shipmentChartData[this.toggleValue].modesAvailable
          ).map((mode) => {
            return {
              label: mode,
              barThickness: 10,
              backgroundColor:
                this.stackedChartColors[this.legendList.indexOf(mode)] ||
                BLACK_COLOR,
              pointBackgroundColor:
                this.stackedChartColors[this.legendList.indexOf(mode)] ||
                BLACK_COLOR,

              data: tempMilestoneStatusSummary.reduce((res, val, i) => {
                const stackedChartMode = this.labelCustomMapping
                  ? val &&
                    val.modes.find(
                      (o) =>
                        o.name?.toLowerCase() === this.labelCustomMapping[mode]
                    )
                  : val && val.modes.find((o) => o.name === mode);
                maxList.splice(
                  i,
                  1,
                  (maxList[i] ?? 0) +
                    (stackedChartMode
                      ? stackedChartMode[this.attrToFetchData[1]]
                      : 0)
                );
                res.push(
                  stackedChartMode
                    ? stackedChartMode[this.attrToFetchData[1]]
                    : 0
                );
                return res;
              }, []),
            };
          });
          maxCount = Math.max.apply(null, maxList);
        }
      } else {
        chartDatasetData.push(item[this.attrToFetchData[1]]);
      }
    });
    this.populateChartData(chartDatasetData, chartLabels);
    this.populateChartOptions(maxCount);
  }

  /**
   * populate chart data
   * @param chartDatasetData chartDatasetData
   * @param chartLabels chartLabels
   */
  populateChartData(chartDatasetData: Array<any>, chartLabels: Array<any>) {
    let tempDatasets = [];
    if (
      this.stacked &&
      this.shipmentChartData &&
      this.shipmentChartData[this.toggleValue]?.modesAvailable
    ) {
      if (this.toggleValue !== 'deliveryPerformanceSummary') {
        this.showColorLabelTooltip = true;
      }
      tempDatasets = chartDatasetData;
    } else {
      tempDatasets.push({
        ...this.chartData.datasets[0],
        label: this.shipmentCountLabel,
        backgroundColor: this.barColor || COLOR_ACCENT_BLUE,
        data: chartDatasetData,
      });
    }
    this.chartData = {
      ...this.chartData,
      labels: chartLabels,
      datasets: tempDatasets,
      toolTipData: {
        data: this.shipmentChartData,
        content: this.contentPipe,
        tooltipCallback: this.customTooltipCallback,
      },
    };
  }

  /**
   * populate chart options
   * @param count count
   */
  populateChartOptions(count) {
    const tempYAxisOptions = [];

    tempYAxisOptions.push({
      ...this.chartOptions.scales.yAxes[0],
      ticks: {
        ...this.chartOptions.scales.yAxes[0].ticks,
        suggestedMax: count !== 0 ? Math.ceil((5 * count) / 4) : 1,
      },
      scaleLabel: this.option ? this.option.scales.yAxes[0].scaleLabel : '',
    });
    this.chartOptions = {
      ...this.chartOptions,
      scales: {
        yAxes: tempYAxisOptions,
        xAxes: [
          {
            ...this.chartOptions.scales.xAxes[0],
            scaleLabel: this.option
              ? this.option.scales.xAxes[0].scaleLabel
              : '',
          },
        ],
      },
    };

    if (this.xAxisScaleLabel) {
      this.chartOptions.scales.xAxes[0].scaleLabel = {
        display: true,
        fontColor: 'rgba(0, 0, 0, 1)',
        fontSize: 10,
        labelString: this.xAxisScaleLabel,
      };
    }

    if (this.yAxisScaleLabel) {
      this.chartOptions.scales.yAxes[0].scaleLabel = {
        display: true,
        fontColor: 'rgba(0, 0, 0, 1)',
        fontSize: 10,
        labelString: this.yAxisScaleLabel,
      };
    }

    this.chartOptions.plugins.datalabels.formatter = this.customDataLabelsFormatter;
  }

  /**
   * method to invoke when view data link is clicked.
   */
  onViewDataClick() {
    this.isViewDataClicked = true;
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
   * ngOnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.shipmentChartData &&
      !CommonUtility.deepEqual(
        changes.shipmentChartData.previousValue,
        changes.shipmentChartData.currentValue
      )
    ) {
      this.shipmentChartData = this.checkIfNoData(this.shipmentChartData);
      this.setChartDataAndOptions();
    }
  }

  /**
   * checkIfNoData
   */
  checkIfNoData(data: Array<any>) {
    const activeData =
      this.stacked && data ? data[this.toggleValue]?.shipmentData : data;
    return activeData?.every(
      (item) => +item[this.attrToFetchData[1]] === 0
    ) /* if all counts have value '0', then consider it as "no data" sceanario and further sent empty array */
      ? []
      : data;
  }

  /**
   * on toggle changed event
   * @param e toggle change event
   */
  toggleChanged(e: MatButtonToggleChange = null) {
    this.toggleValue = e?.value || this.toggleTypes[0];
    if (
      this.stacked &&
      this.shipmentChartData &&
      this.shipmentChartData[this.toggleValue]?.modesAvailable
    ) {
      this.legendList = this.shipmentChartData[this.toggleValue].modesAvailable;
      this.chartFilterForm.get('mode').setValue(this.legendList);
      this.chartFilterForm.markAsUntouched();
    }
    this.setChartDataAndOptions();
  }

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit() {
    this.modalTitle =
      this.chartTitle + (this.filterLabel ? ' - ' + this.filterLabel : '');
    this.learnMoreAriaLbl =
      this.contentPipe.transform('lbl_learn_more_prefix_aria') +
      this.modalTitle +
      this.contentPipe.transform('lbl_chart_learn_more_suffix_aria');
    this.shipmentCountLabel = this.contentPipe.transform(this.countLabel);
    this.shipmentChartData = this.checkIfNoData(this.shipmentChartData);
  }

  /**
   * ngAfterContentInit
   */
  ngAfterContentInit() {
    this.setChartDataAndOptions();
    this.toggleChanged();
    this.chartFilterForm
      .get('mode')
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((val) => {
        this.setChartDataAndOptions(true);
      });
  }

  /**
   * Getting value from chart component
   * @param state boolean
   */
  clickOnChart(data) {
    this.clickOnChartData.emit(data);
  }

  /**
   * Angular Lifecycle hook
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Default data label formatter for bar chart plugin
   * @param value value
   * @param ctx canvas reference
   */
  defaultDataLabelFormatter(value: any, ctx: any): string {
    return ctx.chart.$chartTotalPluginConfig.totalOfLabels[ctx.dataIndex];
  }
}
