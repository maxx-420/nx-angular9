// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Doughnutchart component config
 */

import { ChartData, ChartOptions } from 'chart.js';

import { VIEWPORT_NAMES } from '../../../constants/viewport.constant';

import { default as ViewportUtility } from './../../../utils/viewport';

export const chartType = 'doughnut';
export const Config = {
  debounceTime: 50,
};
export const chartData: ChartData = {
  datasets: [
    {
      data: [],
      backgroundColor: [
        '#39837D',
        '#B92F23',
        '#d285c5',
        '#ffa0c3',
        '#ff9a99',
        '#ffa55d',
        '#ffc100',
        '#d6ce35',
        '#b2d45e',
        '#97d783',
        '#97d723',
        '#97d743',
        '#97d753',
        '#97d333',
        '#97d773',
        '#97d783',
        '#97d183',
        '#97d583',
        '#97d383',
        '#97d783',
      ],
      hoverBackgroundColor: ['#39837D', '#B92F23'],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 0,
    },
  ],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [],
};

const isMobile = ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile);

export const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutoutPercentage: 80,
  zoomOutPercentage: isMobile ? 15 : 55,
  layout: {
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  legend: {
    display: false,
    position: 'bottom',
    labels: {
      usePointStyle: true,
      fontSize: 10,
    },
  },
  tooltips: {
    enabled: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
  },
  plugins: {
    datalabels: {
      display: false,
    },
    outlabels: {
      display: (context) => {
        // context.percent value is being calculated by chart, in case this value is between 0 and 0.99 we will not show the label.
        // We are not showing decimals in label as per requirement of story UPSGLD-5487
        return context.percent * 100 >= 1; // to not show label when % < 1
      },
      text: '%l %p',
      color: 'grey',
      stretch: 10,
      textAlign: 'center',
      lineColor: 'black',
      lineWidth: 1,
      backgroundColor: null,
      borderColor: null,
      padding: {
        right: 10,
        left: 10,
        top: 10,
        bottom: 10,
      },
      font: {
        resizable: true,
        minSize: 10,
        maxSize: 12,
        lineHeight: 1,
        weight: 'bold',
      },
    },
    doughnutlabel: {
      display: true,
      labels: [
        {
          text: '',
          font: {},
          color: '#080808',
        },
        {
          text: 'TOTAL COUNTS',
          font: {
            size: 9,
            weight: 'bold',
          },
          color: '#757575',
        },
      ],
    },
  },
};
