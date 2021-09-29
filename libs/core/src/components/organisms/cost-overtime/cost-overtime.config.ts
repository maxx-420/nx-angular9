// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { ChartData, ChartOptions } from 'chart.js';

import { COLORS_CONSTANTS } from '../../../constants';
export const DropdownOptions = [
  {
    value: 'totalcustomerCharge',
    viewValue: 'dpf_financialShpts_cstOvrTmeTotalChrge',
  },
  {
    value: 'averageCostPerShipment',
    viewValue: 'dpf_financialShpts_cstOvrTmeAvgCstByShpmnts',
  },
  {
    value: 'averageCostPerUnit',
    viewValue: 'dpf_financialShpts_cstOvrTmeAvgCstPrUnit',
  },
];

export const formControlNames = {
  costBy: 'costBy',
};
export const styles = { width: '100%', height: '100%' };

export const chartConfig = {
  chartId: 'ShipmentFinancialCostsOverTimeChart',
  chartType: 'line',
};

const tooltipFormat = 'DD-MMM-YYYY';
export const chartData: ChartData = {
  datasets: [
    {
      type: 'line',
      pointRadius: 3,
      fill: false,
      lineTension: 0,
      borderWidth: 1,
      borderColor: COLORS_CONSTANTS.chartBaseColor,
      backgroundColor: COLORS_CONSTANTS.chartBaseColor,
      pointBackgroundColor: COLORS_CONSTANTS.chartPointColor,
      pointBorderColor: COLORS_CONSTANTS.chartPointColor,
    },
  ],
};

export const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: true,
          drawTicks: false,
          drawBorder: true,
          offsetGridLines: true,
        },
        type: 'time',
        time: {
          tooltipFormat,
        },
        distribution: 'series',
        offset: true,
        ticks: {
          source: 'labels',
          maxRotation: 0,
          fontColor: 'rgba(0, 0, 0, 1)',
          fontSize: 10,
          lineHeight: 1.09,
          padding: 16,
          fontFamily: 'Roboto',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          drawTicks: false,
          drawBorder: true,
        },
        ticks: {
          beginAtZero: true,
          fontColor: 'rgba(97, 97, 97, 1)',
          fontSize: 10,
          lineHeight: 1.09,
          fontFamily: 'Roboto',
          padding: 10.5,
          userCallback: (label) => {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
            }
          },
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

export const automationDataAttr = {
  costOvertimeChart: 'costs-over-time-chart',
  costOvertimeChartHeader: 'costs-over-time-chart-header',
  costOvertimeChartDropdown: 'costs-over-time-chart-dropdown',
  costOvertimeChartDropdownTotalCharge:
    'costs-over-time-chart-dropdown-option-cost-overtime',
  costOvertimeChartDropdownCostPerShipment:
    'costs-over-time-chart-dropdown-option-cost-per-shipment',
  costOvertimeChartLearnMore: 'costs-over-time-chart-learn-more',
};

export const attrToFetchData = ['date', 'cost'];
export const contentHtmlKeys = {
  totalcustomerCharge: 'shpt_fin_cstOvrTme_totalChrge_lrnMr_cpy',
  averageCostPerShipment: 'shpt_fin_cstOvrTme_avgCstByShpmnts_lrnMr_cpy',
  averageCostPerUnit: 'shpt_fin_cstOvrTme_avgCstPerShpmntUnit_lrnMr_cpy',
};
export const learnMoreTableTitles = {
  totalcustomerCharge: 'shpt_fin_cstOvrTme_totalChrge_lrnMr_heading',
  averageCostPerShipment: 'shpt_fin_cstOvrTme_avgCstByShpmnts_lrnMr_heading',
  averageCostPerUnit: 'shpt_fin_cstOvrTme_avgCstByShpmnts_lrnMr_heading',
};
