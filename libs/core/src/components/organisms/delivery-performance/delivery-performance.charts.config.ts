// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

export const chartDataDonut: any = {
  labels: ['On Time', 'Late'],
  datasets: [
    {
      label: 'points',
      data: [],
      backgroundColor: ['#064844', '#B92F23'],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 0,
    },
  ],
};

export const chartOptionsDonut: any = {
  responsive: true,
  maintainAspectRatio: false,
  cutoutPercentage: 80,
  layout: {
    padding: {
      top: 30,
      bottom: 20,
      left: 55,
      right: 85,
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
    outlabels: {
      backgroundColor: null,
      color: ['#064844', '#B92F23'],
      text: '%l (%p)',
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
            weight: 'normal',
            spacing: 1,
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

export const chartOptionsBar = {
  scales: {
    xAxes: [
      {
        stacked: true,
        gridLines: {
          display: true,
          drawTicks: false,
        },
        scaleLabel: {
          display: true,
          labelString: 'Modes',
          fontColor: 'rgba(0, 0, 0, 1)',
          fontSize: 10,
          lineHeight: 1.2,
          fontFamily: 'Roboto',
        },
        ticks: {
          display: true,
          fontColor: 'rgba(0, 0, 0, 1)',
          fontSize: 10,
          lineHeight: 1.2,
          padding: 16,
          fontFamily: 'Roboto',
          maxRotation: 0,
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        gridLines: {
          drawTicks: false,
        },
        scaleLabel: {
          display: true,
          labelString: 'Total Shipments',
          fontColor: 'rgba(0, 0, 0, 1)',
          fontSize: 10,
          lineHeight: 1.2,
          fontFamily: 'Roboto',
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

export const StackedChartColors = ['#39837D', '#B92F23'];
