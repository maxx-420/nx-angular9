/* 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY */

import { Component, Input } from '@angular/core';

import { DATE_FORMAT_WITH_HOURS } from './../../../constants/global.constant';

@Component({
  selector: 'lib-blue-ribbon',
  templateUrl: './blue-ribbon.component.html',
  styleUrls: ['./blue-ribbon.component.scss'],
})
export class BlueRibbonComponent {
  @Input() deliveredDate = '';
  @Input() deliveryETA = '';
  @Input() milestoneStatus = '';

  DATE_FORMAT_WITH_HOURS = DATE_FORMAT_WITH_HOURS;
}
