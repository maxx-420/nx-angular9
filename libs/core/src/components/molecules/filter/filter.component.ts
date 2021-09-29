// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as _moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DateRangeValidator } from '../../../utils/date-range.validator';
import { VIEWPORT_NAMES } from '../../../constants/viewport.constant';
import { FilterUtility, ViewportUtility } from '../../../utils';
import { PlatformService } from '../../../service/platform-service/platform.service';
import {
  CUSTOM_RANGE_OPTION_VALUE,
  DEFAULT_DATE_FORMAT,
  FILTER_TYPES,
} from '../../../constants/global.constant';
import CommonUtility from '../../../utils/commonUtil';
import { MULTI_SELECT_ALL } from '../../../constants';

import { dataAutomationAttribute } from './filter.component.config';

// prettier-ignore
const moment = (_moment as any).default ? (_moment as any).default : _moment;

@Component({
  selector: 'lib-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnChanges, OnDestroy {
  get filtersArray() {
    return this.filtersForm.get('filtersArray') as FormArray;
  }
  @Input() filtersConfiguration: any[] = [];
  @Input() selectedFilterItems: any = null;
  @Input() showFilterToggleButton = true;
  @Input() openFilterPanel = false;
  @Input() componentFilterId = '';
  @Input() showMultiSelectCount = false;
  @Input() pageAndWidgetLevelCombo = false;
  @Input() showDeliveryStatus = false;
  /**
   * Boolean value to Decide whether button should be disabled or not
   */
  @Input() disabled = false;
  @Output() filterApplied = new EventEmitter();
  @Output() filterButtonClicked = new EventEmitter();

  selectBoxStyle = { width: '100%' };
  dataAutomationAttribute = dataAutomationAttribute;
  showFilterSlideOut = false;
  isBannerVisible = false;
  isFilterApplied = false;
  isMobile = false;
  firstTimeFocus = false;
  filtersForm: FormGroup = this.fb.group({
    filtersArray: this.fb.array([]),
  });
  multiSelectAll = MULTI_SELECT_ALL;
  filterType = FILTER_TYPES;
  prevFocusElement: Element;
  private readonly ngUnsubscribe = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly _renderer: Renderer2,
    private readonly platformService: PlatformService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly zone: NgZone
  ) {
    this.isMobile = ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile);
  }

  /**
   *  ngOnInit lifecycle hook
   */
  ngOnInit(): void {
    this.platformService.orientationChange$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((viewport) =>
        setTimeout(() => {
          this.isMobile = viewport === VIEWPORT_NAMES.mobile;
        })
      );
  }

  /**
   *  ngOnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.openFilterPanel?.previousValue !== undefined &&
      !this.showFilterSlideOut
    ) {
      this.toggleFilterSlideout();
    }
    if (
      !CommonUtility.deepEqual(
        changes.filtersConfiguration?.previousValue,
        changes.filtersConfiguration?.currentValue
      )
    ) {
      this.setFilters();
    }
    this.applySelectedFilters();
    this._cdr.detectChanges();
  }

  /**
   * set filters value
   */
  setFilters(isCloseClicked = false) {
    let hasPreAppliedValue = false;
    this.filtersArray.clear();
    const getFilterValue = (element) => {
      if (this.selectedFilterItems?.[element.key]?.value) {
        return this.selectedFilterItems?.[element.key]?.value;
      }
      return element.defaultValue && !isCloseClicked
        ? element.defaultValue
        : null;
    };
    const getStartDate = (element) => {
      if (this.selectedFilterItems?.[element.key]?.startDate) {
        return moment(
          this.selectedFilterItems?.[element.key]?.startDate
        ).toISOString();
      }
      return element.defaultStartDate && !isCloseClicked
        ? moment(element.defaultStartDate).toISOString()
        : null;
    };
    const getEndDate = (element) => {
      if (this.selectedFilterItems?.[element.key]?.endDate) {
        moment(this.selectedFilterItems?.[element.key]?.endDate).toISOString();
      }

      return element.defaultEndDate && !isCloseClicked
        ? moment(element.defaultEndDate).toISOString()
        : null;
    };
    const getDeliveryStatus = (element) => {
      if (element.hasDeliveryStatus && this.showDeliveryStatus) {
        return this.selectedFilterItems?.[element.key]?.deliveryStatus
          ? {
              deliveryStatus: this.selectedFilterItems?.[element.key]
                ?.deliveryStatus,
            }
          : { deliveryStatus: null };
      }
      return {};
    };
    this.filtersConfiguration.forEach((element, i) => {
      this.filtersArray.push(
        this.fb.group({
          filterValue: [getFilterValue(element)],
          startDate: [getStartDate(element)],
          endDate: [getEndDate(element)],
          ...getDeliveryStatus(element),
        })
      );
      if (element.filterType === FILTER_TYPES.DATE_RANGE) {
        this.filtersArray.controls[i].setValidators(
          DateRangeValidator.oneOfDateSelected(element.defaultValue)
        );
      } else {
        this.filtersArray.controls[i].setValidators(null);
      }
      this.filtersArray.controls[i].updateValueAndValidity();
      hasPreAppliedValue =
        element.defaultValue !== null ||
        this.selectedFilterItems?.[element.key]?.value !== null;
    });
    this.isFilterApplied = hasPreAppliedValue;
  }

  /**
   * To display or hide the filter slideout
   */
  toggleFilterSlideout(isCloseClicked = false) {
    if (isCloseClicked) {
      // here will focus back to previous step
      if (this.prevFocusElement) {
        this.focusFilterComponent(this.prevFocusElement);
      }
      this.setFilters(isCloseClicked);
    }
    this.updateStyling();
    if (this.isMobile) {
      if (!this.showFilterSlideOut) {
        this._renderer.addClass(document.body, 'removeScroll');
      } else {
        this._renderer.removeClass(document.body, 'removeScroll');
      }
    }
    if (!this.showFilterSlideOut) {
      this.prevFocusElement = document.activeElement;
      this.focusFilterComponent('lib-filter .closeBtn');
    }
    this.showFilterSlideOut = !this.showFilterSlideOut;
  }

  /**
   * Shows focus
   * @param selector selects DOM elements
   */
  focusFilterComponent(selector) {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        try {
          const element = this._renderer.selectRootElement(selector, true);
          element?.focus();
        } catch (error) {}
      }, 100);
    });
  }

  /**
   * To modify some styling in the outer containers like gld-container, container-fluid
   */
  updateStyling() {
    if (
      document
        .querySelector('.main-container')
        ?.classList?.contains('header-banner-visible')
    ) {
      this.isBannerVisible = true;
    } else {
      this.isBannerVisible = false;
    }
  }

  /**
   * To reset one or all filters
   */
  resetFilters(event: any, index: number = null) {
    event.stopPropagation();
    setTimeout(() => {
      if (index !== null) {
        // if index of filter is provided, then that filter's value will be resetted to default value or null
        if (this.filtersConfiguration[index].defaultValue !== null) {
          this.filtersArray.controls[index].setValue({
            filterValue: null,
            startDate: this.filtersConfiguration[index]?.defaultStartDate
              ? moment(
                  this.filtersConfiguration[index]?.defaultStartDate
                ).toISOString()
              : null,
            endDate: this.filtersConfiguration[index]?.defaultEndDate
              ? moment(
                  this.filtersConfiguration[index]?.defaultEndDate
                ).toISOString()
              : null,
          });
        } else {
          this.filtersArray.controls[index].reset();
        }
      } else {
        // else if no index is provided, then all the filter's values will be resetted to default values or null
        this.filtersConfiguration.forEach((element, i) => {
          if (element.defaultValue !== null) {
            this.filtersArray.controls[i].setValue({
              filterValue: element.defaultValue,
              startDate: element.defaultStartDate
                ? moment(element.defaultStartDate).toISOString()
                : null,
              endDate: element.defaultEndDate
                ? moment(element.defaultEndDate).toISOString()
                : null,
            });
          } else {
            this.filtersArray.controls[i].reset();
          }
        });
      }
    });
  }

  /**
   * To apply filters
   */
  onApplyClick() {
    const FILTER_UTILS = {
      getStartDate: (elem) => {
        if (elem.startDate !== null || elem.endDate !== null) {
          return elem.startDate
            ? moment(elem.startDate).format(DEFAULT_DATE_FORMAT)
            : moment(elem.endDate).format(DEFAULT_DATE_FORMAT);
        }
        return FilterUtility.checkMTDFilterValue(elem.filterValue)
          ? FilterUtility.getMTDFilterDates(elem.filterValue, 'start')
          : null;
      },
      getEndDate: (elem) => {
        if (elem.startDate !== null || elem.endDate !== null) {
          return elem.endDate
            ? moment(elem.endDate).format(DEFAULT_DATE_FORMAT)
            : moment(elem.startDate).format(DEFAULT_DATE_FORMAT);
        }
        return FilterUtility.checkMTDFilterValue(elem.filterValue)
          ? FilterUtility.getMTDFilterDates(elem.filterValue, 'end')
          : null;
      },
    };
    this.filterApplied.emit({
      componentFilterId: this.componentFilterId,
      value: this.filtersArray.value
        .map((elem, i) => ({
          ...elem,
          index: i,
        }))
        .filter(
          (elem) =>
            (elem.filterValue !== null &&
              !CommonUtility.deepEqual(elem.filterValue, [])) ||
            (this.filtersConfiguration[elem.index].filterType !==
              FILTER_TYPES.DATE_RANGE &&
              this.filtersConfiguration[elem.index].defaultValue !== null)
        )
        .map((elem) => ({
          key: this.filtersConfiguration[elem.index].key,
          label: this.filtersConfiguration[elem.index].label,
          value:
            (this.filtersConfiguration[elem.index].filterType ===
              FILTER_TYPES.DATE_RANGE &&
              elem.filterValue === CUSTOM_RANGE_OPTION_VALUE &&
              elem.startDate === null &&
              elem.endDate === null &&
              !this.filtersConfiguration[elem.index].clearSelection) ||
            !elem.filterValue ||
            elem.filterValue.length === 0
              ? this.filtersConfiguration[elem.index].defaultValue
              : elem.filterValue,
          startDate: FILTER_UTILS.getStartDate(elem),
          endDate: FILTER_UTILS.getEndDate(elem),
          filterType: this.filtersConfiguration[elem.index].filterType,
          ...(elem.deliveryStatus
            ? { deliveryStatus: elem.deliveryStatus }
            : {}),
        })),
    });
    this.filtersArray.controls.forEach((elem, i) => {
      elem.patchValue(
        {
          filterValue:
            (this.filtersConfiguration[i].filterType ===
              FILTER_TYPES.DATE_RANGE &&
              elem.value.filterValue === CUSTOM_RANGE_OPTION_VALUE &&
              elem.value.startDate === null &&
              elem.value.endDate === null &&
              !this.filtersConfiguration[i].clearSelection) ||
            !elem.value.filterValue ||
            elem.value.filterValue.length === 0
              ? this.filtersConfiguration[i].defaultValue
              : elem.value.filterValue,
          startDate: (() => {
            if (elem.value.startDate !== null || elem.value.endDate !== null) {
              return elem.value.startDate
                ? elem.value.startDate
                : elem.value.endDate;
            }
            return null;
          })(),
          endDate: (() => {
            if (elem.value.startDate !== null || elem.value.endDate !== null) {
              return elem.value.endDate
                ? elem.value.endDate
                : elem.value.startDate;
            }
            return null;
          })(),
          ...(elem.value.deliveryStatus
            ? { deliveryStatus: elem.value.deliveryStatus }
            : {}),
        },
        { emitEvent: false }
      );
    });
    this.toggleFilterSlideout();
  }

  /**
   * To apply incoming selected filter values to filter component
   */
  applySelectedFilters() {
    if (this.filtersArray.controls.length > 0) {
      this.filtersConfiguration.forEach((item, i) => {
        this.filtersArray.controls[i].patchValue({
          filterValue: (() => {
            if (this.selectedFilterItems?.[item.key]) {
              return this.selectedFilterItems?.[item.key]?.value;
            }

            return item.clearSelection ? null : item.defaultValue;
          })(),
          startDate: (() => {
            if (this.selectedFilterItems?.[item.key]) {
              return this.selectedFilterItems?.[item.key]?.startDate
                ? moment(
                    this.selectedFilterItems?.[item.key]?.startDate
                  ).toISOString()
                : null;
            }
            return item.defaultStartDate;
          })(),
          endDate: (() => {
            if (this.selectedFilterItems?.[item.key]) {
              return this.selectedFilterItems?.[item.key]?.endDate
                ? moment(
                    this.selectedFilterItems?.[item.key]?.endDate
                  ).toISOString()
                : null;
            }
            return item.defaultEndDate;
          })(),
          ...(item.hasDeliveryStatus && this.showDeliveryStatus
            ? {
                deliveryStatus: this.selectedFilterItems?.[item.key]
                  ?.deliveryStatus,
              }
            : {}),
        });
      });
    }
  }

  /**
   * lifecycle hook
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
