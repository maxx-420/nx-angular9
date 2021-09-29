// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import * as _moment from 'moment';
import { FormGroup } from '@angular/forms';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { Subject } from 'rxjs';

import {
  CUSTOM_RANGE_OPTION_VALUE,
  DATE_FORMAT,
} from '../../../constants/global.constant';
import DateUtility from '../../../utils/date';
import CommonUtility from '../../../utils/commonUtil';
import { FilterUtility } from '../../../utils';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';

import { ALLOW_PAST_DATES, EXCLUDE_OFFSET } from './date-filter.config';

const APP_DATE_FORMAT: MatDateFormats = {
  ...MAT_MOMENT_DATE_FORMATS,
  display: {
    ...MAT_MOMENT_DATE_FORMATS.display,
    dateInput: DATE_FORMAT,
  },
};

// prettier-ignore
const moment = (_moment as any).default ? (_moment as any).default : _moment;

@Component({
  selector: 'lib-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMAT }],
})
export class DateFilterComponent implements OnInit, OnDestroy {
  @Input() filterConfiguration: any;
  @Input() filterForm: FormGroup;
  @Output() resetFilter = new EventEmitter();
  showCustomRange = false;
  isSelected = false;
  showClearButton = false;
  allowFutureDates = false;
  allowPastDates = true;
  todayDate;
  viewValue: string = null;
  defaultLimits: any = { min: null, max: null };
  dateLimits: any = { min: null, max: null };
  ngUnsubscribe = new Subject();
  isGFFUser = false;

  constructor(private readonly contentPipe: RenderLabelPipe) {}

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit() {
    if (EXCLUDE_OFFSET in this.filterConfiguration) {
      this.todayDate = moment()
        .subtract(this.filterConfiguration.excludeOffset, 'days')
        .toISOString();
    } else {
      this.todayDate = moment().toISOString();
    }
    this.allowFutureDates = this.filterConfiguration.allowFutureDates;
    if (ALLOW_PAST_DATES in this.filterConfiguration) {
      this.allowPastDates = this.filterConfiguration.allowPastDates;
    }

    this.defaultLimits.min = moment()
      .subtract(this.filterConfiguration.minDateRange, 'days')
      .toISOString();
    this.defaultLimits.max = moment()
      .add(this.filterConfiguration.minDateRange, 'days')
      .toISOString();
    this.updateSelection();
    this.filterForm.valueChanges // Runs when new selection is done or new form data comes from parent component
      .pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged((prevFormData, newFormData) => {
          if (!CommonUtility.deepEqual(prevFormData, newFormData)) {
            return false;
          }
          return true;
        })
      )
      .subscribe((val) => {
        this.updateSelection();
      });
  }

  /**
   * To update view value, toggle selected class and clear button
   */
  updateSelection() {
    this.updateSelectedValue();
    this.toggleSelectedClass();
    this.toggleClearButton();
    this.toggleCustomDateRange();
  }

  /**
   * To display selected value
   */
  updateSelectedValue() {
    const filterValue = this.filterForm.get('filterValue').value;
    const startDate = this.filterForm.get('startDate').value;
    const endDate = this.filterForm.get('endDate').value;
    if (filterValue) {
      // if filterValue is not null
      if (
        filterValue !== CUSTOM_RANGE_OPTION_VALUE ||
        FilterUtility.checkMTDFilterValue(filterValue)
      ) {
        // if filterValue is not -1 then show 'Last X days'
        this.viewValue = this.contentPipe.transform(
          this.filterConfiguration.options.find((x) => x.value === filterValue)
            .label
        );
      } else if (
        startDate === null &&
        endDate === null &&
        !this.filterConfiguration.clearSelection
      ) {
        // else if filterValue is -1, startDate and endDate is null and filter has default value, show default value
        this.viewValue = this.contentPipe.transform(
          this.filterConfiguration.options.find(
            (x) => x.value === this.filterConfiguration.defaultValue
          ).label
        );
      } else if (
        startDate === null &&
        endDate === null &&
        this.filterConfiguration.clearSelection
      ) {
        // else if filterValue is -1, startDate and endDate is null and filter doesnt have default value, show 'todays date - todays date'
        this.viewValue = `${this.formatDate(this.todayDate)}-${this.formatDate(
          this.todayDate
        )}`;
      } else {
        // else if filterValue is -1, startDate or endDate is not null, show 'StartDate - EndDate'
        this.viewValue =
          (startDate ? this.formatDate(startDate) : this.formatDate(endDate)) +
          ' — ' +
          (endDate ? this.formatDate(endDate) : this.formatDate(startDate));
      }
    } else {
      this.viewValue = this.contentPipe.transform('lbl_none_selected');
    }
  }

  /**
   * To show/hide selected class
   */
  toggleSelectedClass() {
    this.isSelected =
      // if any option is selected.
      this.filterForm.get('filterValue').value !== null;
  }

  /**
   * To show/hide clear button beside selected value
   */
  toggleClearButton() {
    this.showClearButton =
      // if any option is selected
      this.filterConfiguration.clearSelection &&
      this.filterForm.get('filterValue').value !== null;
  }

  /**
   * To show/hide custom date range
   */
  toggleCustomDateRange() {
    this.showCustomRange =
      this.filterForm.get('filterValue').value === CUSTOM_RANGE_OPTION_VALUE;
    if (!this.showCustomRange) {
      this.filterForm.patchValue({
        startDate: null,
        endDate: null,
      });
    } else {
      this.setLimits(true);
      this.setLimits(false);
    }
  }

  /**
   * To display date in YYYY/MM/DD format
   */
  formatDate(date: string) {
    return date ? moment(date).format(DATE_FORMAT) : null;
  }

  /**
   * On selecting custom date range. Called when custom date is selected
   */
  setLimits(isStartDate: boolean) {
    this.filterForm.get('startDate').clearValidators(); // Clearing the min max validators added by
    this.filterForm.get('endDate').clearValidators(); // datepicker since it has issues
    this.filterForm.updateValueAndValidity();
    this.setDefaultDateRange();
    if (isStartDate) {
      // If start date is set then set max limit for end date
      DateUtility.setDateRangeHardLimit(
        moment(this.filterForm.get('startDate').value).toISOString(),
        isStartDate,
        this.filterConfiguration,
        this.dateLimits,
        this.allowFutureDates,
        this.allowPastDates
      );
    } else {
      // If end date is set then set min limit for start date
      DateUtility.setDateRangeHardLimit(
        moment(this.filterForm.get('endDate').value).format(DATE_FORMAT),
        isStartDate,
        this.filterConfiguration,
        this.dateLimits,
        this.allowFutureDates,
        this.allowPastDates
      );
    }
  }

  /**
   *  This checks if custom range radio button is clicked and
   *  no value selected in any date picker, if yes then set values
   *  as todays date in start and end date
   */
  setDefaultDateRange() {
    if (!this.filterForm.value.startDate && !this.filterForm.value.endDate) {
      this.filterForm.patchValue({
        startDate: this.todayDate,
        endDate: this.todayDate,
      });
    }
  }

  /**
   * ngOnDestroy lifecycle hook
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
