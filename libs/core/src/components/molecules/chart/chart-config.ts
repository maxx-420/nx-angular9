// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Chart component default config
 */

import { ChartOptions } from 'chart.js';

export const defaultOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false,
    text: '',
    fontSize: 10,
  },
  tooltips: {
    enabled: false,
    bodyFontSize: 10,
    backgroundColor: 'rgba(255, 99, 132 0.8)',
    displayColors: false,
    titleFontColor: 'rgba(38, 102, 191, 1)',
    titleFontFamily: 'Roboto',
    bodyFontFamily: 'Roboto',
    footerFontFamily: 'Roboto',
  },
  legend: {
    position: 'top',
    display: true,
    align: 'end',
  },
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        stacked: true,
      },
    ],
  },
};
export const chartTypeLine = 'line';
export const chartTypeBar = 'bar';
export const chartTypeRoundedBar = 'roundedBar';
export const chartTypeDonut = 'doughnut';
/**
 * calculate total of all the values(multiple values when stacked bar graph)
 * present on the x-axis or y-axis (depends on the mode for the tooltip) for that label.
 * this function will be called for each label and for each bar in graph to check if we are
 * at the end of the bar(in height) or not and provide sum for the same.
 */
export const chartTotalPluginConfig = {
  id: 'chartTotalPluginConfig',

  beforeUpdate: (chart) => {
    const totalOfLabels = [];
    /* utmost index will be used to check that
     * if we are at the top of the bar (stacks last index), and will display sum at top of the bar
     */
    let utmostIndex = 0;
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      if (chart.isDatasetVisible(datasetIndex)) {
        utmostIndex = datasetIndex;
        dataset.data.forEach((value, index) => {
          if (value) {
            totalOfLabels[index] =
              parseInt(totalOfLabels[index] || 0, 10) +
              Math.round(value * 100) / 100;
          }
        });
      }
    });
    // this will return the current index of stack(in simple bar it is always 0 means one single bar) and sum array to display on graph
    chart.$chartTotalPluginConfig = {
      totalOfLabels,
      utmostIndex,
    };
  },
};

/**
 *
 * @param title row title cell
 * @returns a table row
 */
export const getCustomTooltipTableRow = (title) =>
  '<tr><th style="color:rgba(97, 97, 97, 1);text-align: left;padding-top:6px">' +
  title?.split(',').join(' ') +
  '</th></tr>' +
  '<div style="width:178px;margin-left:-9px;border: 1px solid rgba(238, 238, 238, 1);margin-top:6px" />';
