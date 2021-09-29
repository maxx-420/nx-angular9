// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';

import { ICostData } from '../../../model/interfaces/ICostOvertime';
import { ChartUtility, CommonUtility } from '../../../utils';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { SymphonyDatePipe } from '../../../pipe/symphony-date.pipe';
import { LearnMoreTypes } from '../../../enum/learnMore.enum';
import { LEARN_MORE_DATE_FORMAT } from '../../../constants/global.constant';
import { Key, Value } from '../../../constants/labels.constant';

import {
  attrToFetchData,
  automationDataAttr,
  chartConfig,
  chartData,
  chartOptions,
  contentHtmlKeys,
  DropdownOptions,
  formControlNames,
  learnMoreTableTitles,
  styles,
} from './cost-overtime.config';

@Component({
  templateUrl: './cost-overtime.component.html',
  selector: 'lib-cost-overtime',
  styleUrls: ['./cost-overtime.component.scss'],
})
export class CostOvertimeComponent implements OnInit {
  @Input() costOvertimeData;
  @Input() timeFilterValue: any;
  /**
   * To set From-To Date in modal title on the basis of filter selected, Eg: Total Charge - From 2021-07-01 to 2021-07-27
   */
  @Input() filterLabel: string;
  @Output() clickOnChartData = new EventEmitter();
  customTooltipCallback: any = null;

  dropdownOptions = DropdownOptions;
  costOvertimeForm: FormGroup;
  selectBoxStyle = styles;
  chartOptions: ChartOptions = chartOptions;
  chartData: ChartData = chartData;
  chartConfig = chartConfig;
  dataAutomationAttr = automationDataAttr;
  contentHtmlKeys = contentHtmlKeys;
  contentHtmlKey: string;
  learnMoreTitle: string;
  learnMoreData: Array<any>;
  attrToFetchData = attrToFetchData;
  dropdownSelectedOption;
  modifiedDataPerDate: ICostData[] = [];
  LearnMoreTypes = LearnMoreTypes;
  learnMoreTableHeaderCount: string;
  learnMoreTableTitle: string;
  learnMoreTableTitles: { [key: string]: string } = learnMoreTableTitles;
  constructor(
    private formBuilder: FormBuilder,
    private readonly contentPipe: RenderLabelPipe,
    private readonly symphonyDatePipe: SymphonyDatePipe
  ) {}

  /**
   * On Init life cycle hook
   */
  ngOnInit() {
    this.modifiedDataPerDate = this.aggregateSameDates(
      this.costOvertimeData.data
    );
    this.costOvertimeForm = this.formBuilder.group({
      costBy: [this.dropdownOptions[0].value],
    });

    this.dropdownSelectedOption = this.dropdownOptions[0];
    this.setChartDataAndOptions();
  }

  /**
   * Aggregates the data which has the same date. For example:
   * If there are 2 objects with same dates, it will create a new array
   * with combined data for a single date
   */
  aggregateSameDates(costData: ICostData[]): ICostData[] {
    const modifiedDataPerDate: ICostData[] = [];
    costData.forEach((data) => {
      const foundAtIndex = modifiedDataPerDate.findIndex(
        (obj) => obj.date === data.date
      );
      if (foundAtIndex >= 0) {
        const existingData = modifiedDataPerDate[foundAtIndex];
        modifiedDataPerDate[foundAtIndex] = {
          date: existingData.date,
          averageCostPerShipment:
            +existingData?.averageCostPerShipment +
            +data?.averageCostPerShipment,
          totalcustomerCharge:
            +existingData?.totalcustomerCharge + +data?.totalcustomerCharge,
          averageCostPerUnit:
            +existingData?.averageCostPerUnit + +data?.averageCostPerUnit,
          averageCostPerMile:
            +existingData?.averageCostPerMile + +data?.averageCostPerMile,
          averageCostPerSKU:
            +existingData?.averageCostPerSKU + +data?.averageCostPerSKU,
          averageCostPerWeight:
            +existingData?.averageCostPerWeight + +data?.averageCostPerWeight,
          shipmentMode: [
            ...existingData?.shipmentMode,
            data?.shipmentMode && data,
          ],
        };
      } else {
        modifiedDataPerDate.push({
          ...data,
          shipmentMode: data?.shipmentMode ? [data] : [],
        });
      }
    });
    return modifiedDataPerDate;
  }
  /**
   * populates ChartData and linewidth options
   * @param shipmentType shipmentType
   */
  setChartDataAndOptions() {
    const chartDatasetData: Array<any> = [];
    const tempShipmentData: Array<any> = this.modifiedDataPerDate;
    let tempData;

    this.modifiedDataPerDate?.forEach((item) => {
      tempData = {
        t: item.date,
        y: item[this.costOvertimeForm.get(formControlNames.costBy).value],
      };
      chartDatasetData.push(tempData);
    });

    const maxCount = Math.max.apply(
      Math,
      tempShipmentData?.map(
        (o) => o[this.costOvertimeForm.get(formControlNames.costBy).value]
      )
    );

    this.populateChartLabels();
    this.populateChartData(chartDatasetData);
    this.populateChartOptions(maxCount);
    this.populateLearnMoreData(chartDatasetData);
  }

  /**
   * populate learn more data
   * @param chartDatasetData chart data
   */
  populateLearnMoreData(chartDatasetData: Array<any>) {
    const chartSelected = this.costOvertimeForm.get(formControlNames.costBy)
      .value;
    this.learnMoreTitle = this.dropdownOptions.find(
      (x) => x.value === chartSelected
    ).viewValue;

    this.contentHtmlKey = this.contentHtmlKeys[chartSelected];
    const learnMoreDataset = [];
    let count = 0;
    // Map chart data to learn more data model and apply some preprocessing like format date and convert cost to US format.
    chartDatasetData.forEach((item: { t: string; y: string }) => {
      count += parseFloat(item.y);
      const learnMoreItem = {
        date: this.symphonyDatePipe.transform(item.t, LEARN_MORE_DATE_FORMAT),
        cost: CommonUtility.getFormattedCostString(item.y),
      };
      learnMoreDataset.push(learnMoreItem);
    });
    this.learnMoreTableHeaderCount = CommonUtility.getFormattedCostString(
      count.toString()
    );
    const tokenToReplace: Array<{ key: string; value: string }> = [
      {
        [Key]: 'COUNT',
        [Value]: this.learnMoreTableHeaderCount,
      },
    ];
    this.learnMoreTableTitle = this.contentPipe.transform(
      this.learnMoreTableTitles[chartSelected],
      tokenToReplace
    );
    this.learnMoreData = learnMoreDataset;
  }

  /**
   * populate chart labels
   */
  populateChartLabels() {
    const chartLabels: Array<any> = [];

    this.modifiedDataPerDate?.forEach((item) => {
      chartLabels.push(item?.date);
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
    let dataset = this.chartData?.datasets[0];
    dataset = {
      ...dataset,
      data: chartDatasetData,
    };
    tempDataSets.push(dataset);
    this.chartData = {
      ...this.chartData,
      datasets: tempDataSets,
      toolTipData: {
        data: this.costOvertimeData,
        content: this.contentPipe,
        tooltipCallback: this.chartTooltipCallback,
      },
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
        callback: (value, index) =>
          ChartUtility.xAxisTicksFormatter(
            value,
            index,
            this.timeFilterValue,
            this.chartData,
            this.contentPipe
          ),
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
   * Detects dropdown value
   */
  dropdownSelectionChange() {
    this.dropdownSelectedOption = this.dropdownOptions.find(
      (obj) =>
        obj.value === this.costOvertimeForm.get(formControlNames.costBy).value
    );
    this.setChartDataAndOptions();
  }

  /**
   * call back to be used in chart js for developing tooltip
   * @param chartJSRef  chartjs ref
   * @param tooltipModel tooltip UI data
   */
  chartTooltipCallback = (chartJSRef, tooltipModel) => {
    const tooltipElem = this.createTooltipElement(chartJSRef, tooltipModel);
    chartJSRef._chart.canvas.getBoundingClientRect();
    if (tooltipElem) {
      tooltipElem.style.opacity = '1';
      tooltipElem.style.position = 'absolute';
      tooltipElem.style.left = tooltipModel.caretX + 'px';
      tooltipElem.style.top = tooltipModel.caretY + 'px';
      tooltipElem.style.fontFamily = tooltipModel._bodyFontFamily;
      tooltipElem.style.fontSize = tooltipModel.bodyFontSize + 'px';
      tooltipElem.style.fontStyle = tooltipModel._bodyFontStyle;
      tooltipElem.style.padding = `${tooltipModel.yPadding}px ${tooltipModel.xPadding}px`;
      tooltipElem.style.pointerEvents = 'none';
      tooltipElem.style.height = 'auto';
    }
  }

  /**
   * Creates tooltip element on first render
   * @param tooltipElem tooltipElem
   * @param chartJSRef chartJSRef
   * @param chartParent chartParent
   */
  createTooltipElement(chartJSRef, tooltipModel) {
    let tooltipElem = document.getElementById(
      chartJSRef._chart.canvas.id + 'tooltip'
    );
    const chartParent = document.getElementById(
      chartJSRef._chart.canvas.id + 'parent'
    );
    if (!tooltipElem) {
      tooltipElem = document.createElement('div');
      tooltipElem.id = chartJSRef._chart.canvas.id + 'tooltip';
      tooltipElem.classList.add('chart-tooltip');
      tooltipElem.classList.add('dark-theme-tooltip');
      tooltipElem.innerHTML = `<table data-automation="cost-over-time" aria-live="polite" style="width:100%; border-collapse: collapse"></table>`;
      chartParent?.appendChild(tooltipElem);
    }
    if (tooltipModel.opacity === 0) {
      tooltipElem.style.opacity = '0'; // Hide if no tooltip
      return;
    }
    tooltipElem.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
      tooltipElem.classList.add(tooltipModel.yAlign);
    } else {
      tooltipElem.classList.add('no-transform');
    }
    if (tooltipModel.body) {
      tooltipElem.querySelector('table').innerHTML = this.getTooltipContent(
        tooltipModel
      );
    }
    return tooltipElem;
  }

  /**
   * returns content to be shown inside tooltip table tag
   * @param tooltipModel tooltipModel
   */
  getTooltipContent = (tooltipModel) => {
    return `
      <thead
        style="color:rgba(255, 255, 255, 1);text-align: left;
        font-weight: 500;font-size: 12px;line-height: 21px;
        text-transform: capitalize;padding:6px;">
        <tr class="border">
          <th> ${tooltipModel.dataPoints[0].label} Cost (${
      this.costOvertimeData.currency
    })</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="title" style="text-transform: uppercase;color: white; font-weight: bold;
          font-size: 10px; opacity: 0.6; padding: 5px 0 0 10px;">
          ${this.contentPipe.transform(this.dropdownSelectedOption?.viewValue)}
          </td>
        </tr>
        <tr class="${
          this.modifiedDataPerDate[tooltipModel.dataPoints[0].index]
            ?.shipmentMode.length
            ? 'border'
            : ''
        }">
          <td class="cost" style="font-size: 30px; padding: 5px 0 0 10px;">
          ${CommonUtility.getFormattedCostString(
            tooltipModel.dataPoints[0].value
          )}

          </td>
        </tr>
        ${this.getShipmentModeTemplate(tooltipModel)}
      </tbody>`;
  }

  /**
   * returns template to be shown for shipment mode
   */
  getShipmentModeTemplate(tooltipModel) {
    return this.modifiedDataPerDate[tooltipModel.dataPoints[0].index]
      ?.shipmentMode.length
      ? `<tr>
          <td class="title" style="text-transform: uppercase;color: white; font-weight: bold;
              font-size: 10px; opacity: 0.6;">
            Modes
          </td>
        </tr>
        <tr style="display:flex; flex-wrap: wrap; max-width: 300px;">
          </td>
            ${this.modifiedDataPerDate[
              tooltipModel.dataPoints[0].index
            ]?.shipmentMode.reduce((acc, mode) => {
              acc = acc + this.getShipmentModeContent(mode);
              return acc;
            }, '')}
          </td>
        </tr>`
      : ``;
  }

  /**
   * returns content to be shown for shipment mode template
   */
  getShipmentModeContent(mode: any) {
    return `<td class="cost"
                style="display:flex; font-size: 12px; padding: 5px 0 0 10px; width: 150px">
              <span style="flex: 1">${mode?.shipmentMode + ':'}</span>
              <span style="flex: 1">
                ${CommonUtility.getFormattedCostString(
                  mode[this.dropdownSelectedOption.value]
                )}
              </span>
            </td>`;
  }
}
