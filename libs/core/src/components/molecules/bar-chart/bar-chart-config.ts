// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * BarChart component config
 */

import { ChartData, ChartOptions } from 'chart.js';

export const COLOR_ACCENT_BLUE = 'rgba(38, 102, 191, 1)';

export const chartType = 'roundedBar';
export const chartId = 'verticalStackedBarChart';
export const chartData: ChartData = {
  datasets: [
    {
      barThickness: 10,
      backgroundColor: COLOR_ACCENT_BLUE,
    },
  ],
};
// chartTotalPluginConfig used here is in chartjs config and will calculate sum for that label
export const chartOptions: ChartOptions = {
  plugins: {
    datalabels: {
      color: 'black',
      font: {
        weight: 'bold',
        size: 10,
      },
      // returns the sum for that label of the graph.
      formatter: (value, ctx) => {
        const total =
          ctx.chart.$chartTotalPluginConfig.totalOfLabels[ctx.dataIndex];
        return total;
      },
      align: 'top',
      anchor: 'end',
      // checking if it is the last index of the bar and then show sum here ( the last index)
      display(ctx) {
        return (
          ctx.datasetIndex === ctx.chart.$chartTotalPluginConfig.utmostIndex
        );
      },
    },
  },
  maintainAspectRatio: false,
  responsive: true,
  title: {
    display: false,
    text: 'Chart',
    fontSize: 10,
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
          lineHeight: 1.2,
          padding: 16,
          fontFamily: 'Roboto',
          maxRotation: 0,
          autoSkip: false,
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
          lineHeight: 1.2,
          fontFamily: 'Roboto',
          padding: 10.5,
          suggestedMin: 0,
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
};
