// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
    selector: 'donut-chart-legends',
    templateUrl: './donut-chart-legends.component.html',
    styleUrls: ['./donut-chart-legends.component.scss'],
})
export class DonutChartLegendsComponent implements OnChanges {

    @Input() showDonutChartDrilldown: boolean;
    @Input() chartData: ChartData;
    @Input() drillDownTitle;
    @Input() bgColor: any;
    @Input() hideDrillDownButtonLabel = '';
    @Input() component: any;
    @Output() removeDonutChartDrilldown = new EventEmitter();

    /**
     * ngOnChanges lifecycle method
     */
    ngOnChanges() {
    this.component =  {
        ...this.component,
        chartData : this.chartData,
        drillDownTitle: this.drillDownTitle,
        bgColor: this.bgColor
        };
    }
}
