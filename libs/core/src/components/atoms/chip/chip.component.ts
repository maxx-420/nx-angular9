// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ADDRESS_TYPE } from '../../../constants/global.constant';

/*
 * chip component with variation
 **/
@Component({
  selector: 'lib-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
/*
 * chip component with variation
 **/
export class ChipComponent {
  @Input() public alwaysEditable = false;
  @Input() dataAutomationAttr = '';
  @Output() itemRemoved = new EventEmitter();
  @Output() itemEdited = new EventEmitter();
  // for origin and destination filters, need to remove unloc code before showing in chip
  private _filterItem;
  @Input()
  set filterItem(value) {
    this._filterItem = value;
  }
  get filterItem() {
    const item = { ...this._filterItem };
    if (
      Object.keys(ADDRESS_TYPE).includes(this._filterItem?.filterKey) &&
      this._filterItem.filterValue?.split(', ').length === 3
    ) {
      item.filterValue = item.filterValue.slice(
        0,
        item.filterValue.lastIndexOf(',')
      );
    }
    return item;
  }

  /**
   * removeSelectedItem method
   */
  removeSelectedItem(filterItem) {
    this.itemRemoved.emit(filterItem);
  }

  /**
   * editSelectedItem method
   */
  editSelectedItem() {
    this.itemEdited.emit();
  }
}
