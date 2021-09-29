// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Selection List component (Single/ Multi)
 */

import { FocusKeyManager } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { ListItemComponent } from '../../atoms/list-item/list-item.component';

const SCROLL_LIMIT = 20;

const WRAPPER_MAX_HEIGHT = 336;

@Component({
  selector: 'lib-single-selection-list',
  templateUrl: './single-selection-list.component.html',
  styleUrls: ['./single-selection-list.component.scss'],
})
export class SingleSelectionListComponent implements AfterViewInit {
  @ViewChild('scrollMe') myScrollContainer: ElementRef;
  @ViewChildren(ListItemComponent) items!: QueryList<ListItemComponent>;

  keyManager: FocusKeyManager<ListItemComponent>;
  limit = SCROLL_LIMIT;

  wrapperMaxHeight;

  @Input('list')
  get list() {
    return this._list;
  }
  set list(value) {
    if (value !== this._list) {
      this._list = value;
      this.limit = SCROLL_LIMIT;
      this.setFocusKeyManagerList();
    }
  }

  @Input('filterBy')
  get filterBy() {
    return this._filterBy;
  }
  set filterBy(value) {
    if (value !== this._filterBy) {
      this._filterBy = value;
      this.limit = SCROLL_LIMIT;
      this.setFocusKeyManagerList();
    }
  }

  @Output() selectedOption = new EventEmitter();

  private _list;
  private _filterBy;

  constructor() {}

  /**
   * ngAfterViewInit life cycle hook
   */
  ngAfterViewInit(): void {
    this.setFocusKeyManagerList();
  }

  /**
   * set scrollable lazy loading height
   */
  setMaxHeight() {
    this.wrapperMaxHeight =
      (this.items?.last?.element?.nativeElement?.offsetHeight || 0) *
        this.limit || WRAPPER_MAX_HEIGHT;
  }

  /**
   * set key manager
   */
  setFocusKeyManagerList() {
    this.keyManager = new FocusKeyManager(this.items);
    this.setMaxHeight();
  }

  /**
   * on scoll method for lazy load list
   */
  onScroll() {
    const element = this.myScrollContainer.nativeElement;
    // find if scroll position in wrapper is at (last-1) item
    const atBottom =
      element.scrollHeight -
        (this.items?.last?.element?.nativeElement?.offsetHeight || 0) -
        element.scrollTop <=
      element.clientHeight;
    if (atBottom) {
      this.limit =
        this.limit < this.list?.length ? this.limit + SCROLL_LIMIT : this.limit;

      this.setMaxHeight();
    }
  }

  /**
   * accessibility set new active item on arrowdown or arrowup
   * @param changeBy index value to change
   */
  setActiveItem(changeBy) {
    const activeItemIndex = this.keyManager.activeItemIndex;
    const newIndex = (activeItemIndex < 0 ? 0 : activeItemIndex) + changeBy;
    if (!(newIndex >= this.list?.length - 1 || newIndex < 0)) {
      if (changeBy > 0) {
        this.keyManager.setNextItemActive();
      } else {
        this.keyManager.setPreviousItemActive();
      }
    }
  }
}
