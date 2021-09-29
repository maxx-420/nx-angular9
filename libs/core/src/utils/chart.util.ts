// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Chart js Utility

import * as moment from 'moment';

export class ChartUtility {
  /**
   * format x axis ticks of chart based on filter range
   * @param value value
   * @param index index
   * @param values values
   */
  public static xAxisTicksFormatter(
    value,
    index,
    timeFilterValue,
    chartData,
    contentPipe
  ) {
    if (timeFilterValue <= 7) {
      return moment(chartData?.labels[index]).format('DD-MMM');
    } else if (timeFilterValue <= 14 && timeFilterValue > 7) {
      if (index === 0 || index === chartData?.labels.length - 1) {
        return moment(chartData?.labels[index]).format('DD-MMM');
      }
    } else if (timeFilterValue <= 30 && timeFilterValue > 14) {
      if (index % 7 === 0) {
        const numOfWeek = index / 7 + 1;
        return `${contentPipe?.transform(
          'lbl_time_chart_week_label'
        )} ${numOfWeek}`;
      }
    } else if (timeFilterValue <= 60 && timeFilterValue > 30) {
      // moment object of first asix tick
      const firstLabel = moment(chartData?.labels[0]);
      // moment object of last asix tick
      const lastLabel = moment(chartData?.labels[chartData?.labels.length - 1]);
      if (index === 0) {
        return firstLabel.format('MMM')?.toUpperCase();
      } else if (
        index === chartData?.labels.length - 1 &&
        firstLabel.month() !== lastLabel.month()
      ) {
        return lastLabel.format('MMM')?.toUpperCase();
      }
      // this determines wheather we need to show three month label or two
      else if (
        lastLabel.month() -
          moment(chartData?.labels[chartData?.labels.length - 1])
            .subtract(60, 'days')
            .month() ===
          2 &&
        lastLabel.month() - firstLabel.month() === 2 &&
        index === Math.floor(chartData?.labels.length / 2)
      ) {
        return moment(chartData?.labels[index]).format('MMM')?.toUpperCase();
      }
    } else {
      return value;
    }
  }
}
