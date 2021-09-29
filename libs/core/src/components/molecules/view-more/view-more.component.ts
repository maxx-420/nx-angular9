// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { Component, Input } from '@angular/core';

import {
  VIEW_MORE,
  VIEW_MORE_VARIATIONS,
} from '../../../constants/global.constant';

@Component({
  selector: 'lib-view-more',
  templateUrl: './view-more.component.html',
})
export class ViewMoreComponent {
  @Input() variation;
  @Input() columnData;
  @Input() colName;
  @Input() offset = 1;
  @Input() dataAutoAttr: string;
  modalColumns = VIEW_MORE.modalColumns;
  popoverColumns = VIEW_MORE.popoverColumns;
  popoverMaxItems = VIEW_MORE.popoverMaxItems;
  referencesType = VIEW_MORE.referencesType;
  referencesLimit = VIEW_MORE.referencesLimit;
  temperature = VIEW_MORE.temperature;
  contactTooltip = VIEW_MORE.contactTooltip;
  viewMoreVariations = VIEW_MORE_VARIATIONS;
}
