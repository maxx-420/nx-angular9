// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import CommonUtility from '../../../utils/commonUtil';
import { FILTER_CHIPS_TO_SHOW } from '../../../constants/global.constant';
import { VIEWPORT_NAMES } from '../../../constants/viewport.constant';
import { ConfigData } from '../../../global-config/config';
import { PlatformService } from '../../../service/platform-service/platform.service';

import { default as ViewportUtility } from './../../../utils/viewport';
import {
  dataAutomationAttribute,
  WarehouseFilter,
} from './filter-chip.component.config';

/*
 * filter-chip component with variation
 **/
@Component({
  selector: 'lib-filter-chip',
  templateUrl: './filter-chip.component.html',
  styleUrls: ['./filter-chip.component.scss'],
})
/*
 * filter-chip component with variation
 **/
export class FilterChipComponent implements OnChanges, OnDestroy {
  @Input() public selectedFilters = [];
  @Input() public defaultFilters;
  @Input() heading = 'lbl_filters';
  @Input() showHeading = true;
  @Input() containerClass = '';
  @Input() dataAutomationAttr = '';
  @Input() showFilterKeyInAutomationAttr = '';
  @Input() componentFilterId = '';
  @Input() alwaysEditable = false;
  @Input() showClear = true;
  @Output() changedFilters = new EventEmitter();
  @Output() editFilter = new EventEmitter();

  dataAutomationAttribute = dataAutomationAttribute;
  debouncer = new Subject<any[]>();
  defaultFiltersKeys = [];
  defaultFilter;
  isClearVisible = false;
  ngUnsubscribe = new Subject();
  isGFFUser = false;
  filterChipsToShow;
  hideChips = false;
  isDesktop = ViewportUtility.checkViewport(VIEWPORT_NAMES.desktop);

  constructor(platformService: PlatformService) {
    platformService.orientationChange$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((viewport) => {
        if (this.selectedFilters.find((elem) => elem.key === WarehouseFilter)) {
          this.filterChipsToShow =
            viewport === VIEWPORT_NAMES.desktop
              ? FILTER_CHIPS_TO_SHOW.desktop
              : FILTER_CHIPS_TO_SHOW.mobile;
        }
      });
    this.debouncer
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(ConfigData.debounceTime)
      )
      .subscribe((chip) =>
        this.changedFilters.emit({
          componentFilterId: this.componentFilterId,
          value: chip,
        })
      );
  }

  /**
   * ngOnChanges life cycle hook
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      !CommonUtility.deepEqual(
        changes.selectedFilters.currentValue,
        changes.selectedFilters.previousValue
      )
    ) {
      this.defaultFiltersKeys = Object.keys(this.defaultFilters || {});

      // TBD: Can below feature be made common across all pages?
      if (!this.selectedFilters.find((elem) => elem.key === WarehouseFilter)) {
        this.filterChipsToShow = this.selectedFilters.length;
      } else {
        this.hideChips = true;
        this.filterChipsToShow = this.isDesktop
          ? FILTER_CHIPS_TO_SHOW.desktop
          : FILTER_CHIPS_TO_SHOW.mobile;
      }
      // Clear is not to be shown when only the default filter chip is present.
      this.checkIfClearVisible();
    }
  }

  /**
   * isDefaultFilter method used in template to check if filter is default,
   */
  isDefaultFilter(key: any, value: any) {
    return !!this.defaultFiltersKeys.find(
      (defaultKey) =>
        defaultKey === key && this.defaultFilters[key].value === value
    );
  }

  /**
   * isClearVisible method used in template to hide or show, the clear all link after the filter chips,
   */
  checkIfClearVisible() {
    this.isClearVisible = this.selectedFilters.some(
      (element) => !this.isDefaultFilter(element.key, element.value)
    );
  }

  /**
   * getRemovedItem method
   */
  getRemovedItem(removedItem) {
    const removedItemKeyIndex = this.selectedFilters.findIndex(
      (elem) => elem.key === removedItem.filterKey
    );

    // This is the current value of removed filter derived from parent.
    let currentValue = this.selectedFilters[removedItemKeyIndex].value;

    if (Array.isArray(currentValue)) {
      currentValue = currentValue.filter(
        (elem) => elem !== removedItem.filterValue
      );
      this.selectedFilters[removedItemKeyIndex].value = currentValue;
      // when value array is empty ,remove the filter object from selectedFilters
      if (currentValue.length === 0) {
        this.selectedFilters.splice(removedItemKeyIndex, 1);
      }
    } else {
      this.selectedFilters.splice(removedItemKeyIndex, 1);
    }

    const selectedFilterKeys = this.selectedFilters.map((filter) => filter.key);
    this.defaultFiltersKeys.forEach((elem) => {
      if (!selectedFilterKeys.includes(elem)) {
        this.selectedFilters.push({
          ...this.defaultFilters?.[elem],
        });
      }
    });
    this.checkIfClearVisible();
    this.debouncer.next(this.selectedFilters);
  }

  /**
   * clearAllFilters method
   */
  clearAllFilters() {
    if (this.selectedFilters.length > 0) {
      this.selectedFilters = [];
      this.defaultFiltersKeys.forEach((elem) => {
        this.selectedFilters.push({
          ...this.defaultFilters?.[elem],
        });
      });
      this.debouncer.next(this.selectedFilters);
      this.isClearVisible = false;
    }
  }

  /**
   * editSelectedItem
   */
  editSelectedItem() {
    this.editFilter.emit(this.componentFilterId);
  }

  /**
   * returns if input is array type
   */
  isArray(value) {
    return Array.isArray(value);
  }

  /**
   * lifecycle hook
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
