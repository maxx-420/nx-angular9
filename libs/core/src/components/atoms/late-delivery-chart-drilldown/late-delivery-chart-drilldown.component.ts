// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { Component, Input, OnChanges } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'lib-late-delivery-chart-drilldown',
  templateUrl: './late-delivery-chart-drilldown.component.html',
  styleUrls: ['./late-delivery-chart-drilldown.component.scss'],
})
export class LateDeliveryChartDrillDownComponent implements OnChanges {
  @Input() chartData: ChartData;
  @Input() label;
  @Input() bgColor;

  exceptionReasonsList;

  /**
   * Lifecycle hook
   */
  ngOnChanges() {
    this.getTableData();
  }

  /**
   * prepares the exception reason table
   */
  private getTableData() {
    const result = this.chartData.dataArr.filter(
      (item) => item.name?.toLowerCase() === this.label[0]?.toLowerCase()
    );

    let totalCount = 0;
    this.chartData.dataArr.forEach((element) => {
      totalCount += element.count;
    });
    this.exceptionReasonsList = {
      count: result[0]?.count,
      name: result[0]?.name,
      countPercentage:
        totalCount > 0
          ? Math.floor((result[0]?.count / totalCount) * 10000) / 100
          : 0.0,
      exceptionReasons:
        result[0]?.count > 0
          ? result[0].exceptionReasons.map((element) => ({
              ...element,
              percentCount:
                Math.floor((element.count / result[0]?.count) * 10000) / 100,
            }))
          : 0.0,
    };
  }
}
