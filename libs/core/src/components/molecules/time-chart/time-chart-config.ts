// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * TimeChart component config
 */

import { ChartData, ChartOptions } from 'chart.js';

export const chartType = 'line';
const chartBaseColor = '#A1BBE0';
const chartPointColor = '#2666BF';
export const chartData: ChartData = {
  datasets: [
    {
      type: 'line',
      pointRadius: 3,
      fill: false,
      lineTension: 0,
      borderWidth: 1,
      borderColor: chartBaseColor,
      backgroundColor: chartBaseColor,
      pointBackgroundColor: chartPointColor,
      pointBorderColor: chartPointColor,
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
          tooltipFormat: 'DD-MMM-YYYY',
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
