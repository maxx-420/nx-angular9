// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Selection List component (Multi)
 */

import { FocusKeyManager } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

const SCROLL_LIMIT = 20;

const WRAPPER_MAX_HEIGHT = 190;
@Component({
  selector: 'lib-multi-selection-list',
  templateUrl: './multi-selection-list.component.html',
  styleUrls: ['./multi-selection-list.component.scss'],
  /**
   * we have to tell angular when we want to access the ng value accessor
   * by adding it to the providers array.
   * useExisting--> Use the existing instance of class instead of re initializing it.
   * forwardRef --> Allows to refer to references which are not yet defined.
   * multi: true --> Allows to use multiple providers with same token id
   */
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectionListComponent),
      multi: true,
    },
  ],
})
export class MultiSelectionListComponent
  implements ControlValueAccessor, AfterViewInit {
  @Input()
  set accountsList(list) {
    this._accountsList = [...list];
    this.limit = SCROLL_LIMIT;
    this.setFocusKeyManagerList();
  }
  get accountsList() {
    return this._accountsList;
  }
  @ViewChildren(MatCheckbox) items!: QueryList<MatCheckbox>;
  keyManager: FocusKeyManager<MatCheckbox>;

  @ViewChild('scrollMe') myScrollContainer: ElementRef;

  @ViewChild('textarea') textarea;

  @Input() showSelectAll = true;
  // filteredList;

  @Input() filterBy;
  // @Input('filterBy')
  // get filterBy() {
  //   return this._filterBy;
  // }
  // set filterBy(value) {
  //   if (value !== this._filterBy) {
  //     this._filterBy = value;
  //     this.filteredList = [];
  //     this.filterList();
  //   }
  // }
  @Input() showBackButton = true;
  @Input() listHeaderTitle = '';
  @Output() backClicked = new EventEmitter();

  wrapperMaxHeight;
  limit;

  touched = false;
  disabled = false;

  isAllSelected = false;

  dataAutomationAttribute = {
    selectedCompany: 'selected-company-name-label',
  };

  // private _filterBy;
  private _accountsList;

  constructor() {}

  // fuction to call when value is changed
  onChange = (value) => {};
  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};

  /**
   * ngAfterViewInit life cycle hook
   */
  ngAfterViewInit() {
    setTimeout(() => {
      // fix for ExpressionChangedAfterItHasBeenCheckedError issue
      // https://blog.angular-university.io/angular-debugging/#initialimplementationofthesolution
      this.getCheckedItemList();
      this.checkAllSelected();
      this.setMaxHeight();
    });
  }

  /**
   * filter list on filterby value change
   */
  // filterList() {
  //   this.filteredList = (this.accountsList || []).filter(val => {
  //     return (val?.name as string)
  //     ?.toLowerCase()
  //     .indexOf(this.filterBy?.toLowerCase()) > -1
  //   });
  //   this.getCheckedItemList();
  // }

  /**
   * set form value to checkboxes
   * @param fn function
   */
  writeValue(value: any) {
    const val: Array<any> = value && !Array.isArray(value) ? [value] : value;
    const isFound = this.accountsList.find((item) => {
      return (val ?? []).some((i) => +i === +item.id);
    });
    this.accountsList = this.accountsList.map((item) => {
      const isSelected = (val ?? []).some((i) => +i === +item.id);
      return {
        ...item,
        isSelected: isFound ? isSelected : true,
      };
    });
    this.checkAllSelected();
  }

  /**
   * Register a function which will inform the parent formGroup on value change
   * @param fn function
   */
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  /**
   * Register a function which will update the formGroup
   * @param fn function
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  /**
   * Called when select all is clicked
   * @param isAllSelected state
   */
  selectAllClicked() {
    this.accountsList = [...this.accountsList].map((item) => {
      return {
        ...item,
        isSelected: this.isAllSelected,
      };
    });
    this.getCheckedItemList();
  }

  /**
   * on scoll method for lazy load list
   */
  onScroll() {
    const element = this.myScrollContainer.nativeElement;
    // find if scroll position in wrapper is at (last-1) item
    const atBottom =
      element.scrollHeight -
        (this.items?.last?._elementRef?.nativeElement?.parentElement
          ?.offsetHeight || 0) -
        element.scrollTop <=
      element.clientHeight;
    if (atBottom) {
      this.limit =
        this.limit < this.accountsList?.length
          ? this.limit + SCROLL_LIMIT
          : this.limit;

      this.setMaxHeight();
    }
  }

  /**
   * set key manager
   */
  setFocusKeyManagerList() {
    this.keyManager = new FocusKeyManager(this.items);
    this.setMaxHeight();
  }

  /**
   * set scrollable lazy loading height
   */
  setMaxHeight() {
    this.wrapperMaxHeight =
      (this.items?.last._elementRef?.nativeElement?.parentElement
        ?.offsetHeight || 0) * this.limit || WRAPPER_MAX_HEIGHT;
  }

  /**
   * Called When item is clicked
   */
  checkAllSelected() {
    this.isAllSelected = this.accountsList.every(
      (item) => item.isSelected === true
    );
    this.getCheckedItemList();
  }

  /**
   * checked items list set to form value
   */
  getCheckedItemList() {
    const checkedItems = this.accountsList
      ?.filter((item) => item.isSelected)
      .map((item) => item.id);
    this.onChange(checkedItems?.length ? checkedItems : undefined);
  }

  /**
   * set disabled state
   * @param disabled disabled
   */
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  /**
   * accessibility set new active item on arrowdown or arrowup
   * @param changeBy index value to change
   */
  setActiveItem(changeBy) {
    const activeItemIndex = this.keyManager.activeItemIndex;
    const newIndex = (activeItemIndex < 0 ? 0 : activeItemIndex) + changeBy;
    if (!(newIndex >= this.accountsList?.length - 1 || newIndex < 0)) {
      if (changeBy > 0) {
        this.keyManager.setNextItemActive();
      } else {
        this.keyManager.setPreviousItemActive();
      }
    }
  }
}
