// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'wip-chart-legends',
    templateUrl: './wip-chart-legends.component.html',
    styleUrls: ['./wip-chart-legends.component.scss'],
})
export class WipChartLegendsComponent {

    @Input() chartFilterForm: FormGroup;
    @Input() showCustomLegends: boolean;
    @Input() legendList: string[];
    @Input() customStyle: any;
    @Input() dataAutomationAttribute = '';
    automationAttrRegex = new RegExp(/ /g);
}
