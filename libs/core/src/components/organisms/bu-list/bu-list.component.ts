// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Bu list component

import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-bu-list',
  templateUrl: './bu-list.component.html',
  styleUrls: ['./bu-list.component.scss'],
})
export class BuListComponent {
  @Input() buList = [];
  @Input() preHeadTxt = '';
  @Input() heading = '';
  @Input() descriptionText = '';

}
