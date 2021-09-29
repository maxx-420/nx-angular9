// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// page-filter component

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ROUTER_CONSTANTS } from '../../../constants/router.constant';
import { DateRangeValidator } from '../../../utils/date-range.validator';
import {
  DEFAULT_SELECTED_DATE_RANGE,
  FILTER_CONFIGURATIONS,
} from '../../../global-config/config';
import DateUtility from '../../../utils/date';
import ViewportUtility from '../../../utils/viewport';
import { VIEWPORT_NAMES } from '../../../constants/viewport.constant';
import { SessionStorageUtility } from '../../../utils/sessionStorage';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { AnalyticsService } from '../../../service/analytics-wrapper/analytics.service';
import { SESSION_STORAGE_KEYS } from '../../../constants/storage.constant';

// prettier-ignore
const moment = (_moment as any).default ? (_moment as any).default : _moment;
const {
  startDate: defaultStartDate,
  endDate: defaultEndDate,
} = DateUtility.getDateRange(30);

@Component({
  selector: 'lib-page-filter',
  templateUrl: './page-filter.component.html',
  styleUrls: ['./page-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageFilterComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() controlFormGroup: FormGroup;
  @Input() routeSegment;
  @Input() isMobileViewport = false;

  showCustomRange = false;
  isMobile = ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile);
  inbound = ROUTER_CONSTANTS.inboundWIP;

  date = new Date();
  todayDate = this.date.toISOString();
  minRangeDate;
  dateFilterList = [...FILTER_CONFIGURATIONS.dateFilterOptions];
  selectBoxStyle = {
    width: '100%',
  };
  datePickerStyle = this.isMobile
    ? {
        width: '228px',
        'margin-left': '102px',
      }
    : {
        width: '120px',
        'margin-left': '102px',
      };
  showTodaysDate = false;
  dateFormat = 'YYYY-MM-DD';
  showInlineLabel = true;
  btnFullWidth = this.isMobile ? true : false;

  filterForm: FormGroup = this.fb.group({
    dateRange: [''],
    startDate: [''],
    endDate: [''],
  });
  @Output() setDates = new EventEmitter();
  @Output() dateChange = new EventEmitter();
  @Input() isChartFilter = false;
  @Input() isPageFilter = true;
  @Input() showNoDate = false;
  @Input() defaultRangeDays;
  @Input() maxDatedays = 90;
  @Input() maxRestrict = 59;
  @Input() allowFutureDates = false;
  maxRangeDate;
  @Input() classNameDateRange = '';
  @Input() title = '';
  dateRangeLabel: string;
  isApplyButtonTracked = false;
  ngUnsubscribe = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly contentPipe: RenderLabelPipe,
    private readonly analyticsService: AnalyticsService
  ) {}

  /**
   * ngOnDestroy lifecycle hook
   */
  ngOnDestroy(): void {
    // prevent memory leak when component destroyed
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * ngAfterViewInit lifecycle hook
   */
  ngAfterViewInit(): void {
    this.minRangeDate = new Date(DateUtility.getDateRange(this.maxDatedays).startDate).toISOString();
    if (this.allowFutureDates) {
      this.maxRangeDate = moment().add(this.maxDatedays, 'days').toISOString();
    }
    this.filterForm =
      this.controlFormGroup ||
      this.fb.group({
        dateRange: [''],
        startDate: [new Date(defaultStartDate).toISOString()],
        endDate: [new Date(defaultEndDate).toISOString()],
      });

    if (!this.showNoDate) {
      this.setRangeValidators();
    }

    if (this.isChartFilter) {
      this.dateFilterList = [...FILTER_CONFIGURATIONS.chartDateFilterOptions];
      this.selectBoxStyle['min-width'] = '100px';
    }

    if (this.showNoDate) {
      this.dateFilterList.unshift({
        viewValue: 'lbl_filter_noDateSelected',
        value: 0,
      });
    }
    this.initFilters();
    this.filterForm.updateValueAndValidity();
    this.changeDetector.detectChanges();
  }

  /**
   * set date range filters
   */
  setRangeValidators() {
    this.filterForm.get('startDate').clearValidators();
    this.filterForm.get('endDate').clearValidators();
    this.filterForm
      ?.get('startDate')
      .setValidators([
        Validators.required,
        DateRangeValidator.validateDateRange(
          this.filterForm?.get('endDate'),
          this.maxDatedays,
          'days'
        ),
      ]);
    this.filterForm
      ?.get('endDate')
      .setValidators([
        Validators.required,
        DateRangeValidator.validateDateRange(
          this.filterForm?.get('startDate'),
          this.maxRestrict,
          'days'
        ),
      ]);

    this.filterForm?.get('startDate').updateValueAndValidity();
    this.filterForm?.get('endDate').updateValueAndValidity();
  }

  /**
   * Initializes the filter form and emit on value change of filter
   */
  initFilters() {
    const defaultDateRangeSession = {
      dateRange:
        this.defaultRangeDays >= 0
          ? this.defaultRangeDays
          : DEFAULT_SELECTED_DATE_RANGE,
    };
    const dateRangeSession =
      this.isChartFilter || !this.isPageFilter
        ? defaultDateRangeSession
        : SessionStorageUtility.get(SESSION_STORAGE_KEYS.selectedDateRange) ??
          defaultDateRangeSession;

    if (dateRangeSession.dateRange === -1) {
      this.setCustomDateRange();
      this.showCustomRange = true;
    } else {
      const dateEmitObject = {startDate: '', endDate: '', numOfDays: 0};
      dateEmitObject.startDate = DateUtility.getDateRange(
        dateRangeSession.dateRange
      ).startDate;
      dateEmitObject.endDate = DateUtility.getDateRange(
        dateRangeSession.dateRange
      ).endDate;
      dateEmitObject.numOfDays = dateRangeSession.dateRange;
      this.filterForm.get('dateRange').setValue(dateRangeSession.dateRange);
      this.setDates.emit({
        ...dateEmitObject,
      });
    }

    this.filterForm
      .get('dateRange')
      .valueChanges.pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged((prevValue, newValue) => {
          if (prevValue !== newValue) {
            return false;
          }
          return true;
        })
      )
      .subscribe((value) => {
        this.dateChange.emit();
        if (value === 0) {
          this.showCustomRange = false;
          this.filterForm.get('startDate').setValue('');
          this.filterForm.get('endDate').setValue('');
          this.filterForm.get('startDate').clearValidators();
          this.filterForm.get('endDate').clearValidators();
          this.filterForm?.get('startDate').updateValueAndValidity();
          this.filterForm?.get('endDate').updateValueAndValidity();
          this.setDates.emit({
            startDate: undefined,
            endDate: undefined,
            numOfDays: value,
          });
        } else if (value === -1) {
          this.setRangeValidators();
          this.showCustomRange = true;
          this.setCustomDateRange(true);
          this.filterForm.markAsUntouched();
        } else {
          this.filterForm.get('startDate').clearValidators();
          this.filterForm.get('endDate').clearValidators();
          this.filterForm?.get('startDate').updateValueAndValidity();
          this.filterForm?.get('endDate').updateValueAndValidity();
          this.showCustomRange = false;
          if (!this.isChartFilter && this.isPageFilter) {
            SessionStorageUtility.set(SESSION_STORAGE_KEYS.selectedDateRange, {
              dateRange: value,
            });
          }
          this.filterForm
            .get('startDate')
            .setValue(DateUtility.getDateRange(value).startDate);
          this.filterForm
            .get('endDate')
            .setValue(DateUtility.getDateRange(value).endDate);
          this.setDates.emit({
            ...DateUtility.getDateRange(value),
            numOfDays: value,
          });
        }
      });
  }

  /**
   * set custom date range
   * if block is used to set custom date on filterForm from session storage and emit the dates
   * while else block is used to default set the filterForm when custom range is selected in dropdown
   * @param onChange onChange
   */
  setCustomDateRange(onChange = false) {
    const dateRangeSession = SessionStorageUtility.get(
      SESSION_STORAGE_KEYS.selectedDateRange
    ) ?? {
      dateRange: DEFAULT_SELECTED_DATE_RANGE,
    };
    const dateEmitObject = {startDate: '', endDate: '', numOfDays: 0};
    if (!onChange) {
      dateEmitObject.startDate = dateRangeSession.startDate;
      dateEmitObject.endDate = dateRangeSession.endDate;
      dateEmitObject.numOfDays =
        moment(dateRangeSession.endDate).diff(
          moment(dateRangeSession.startDate),
          'days'
        ) + 1;
      this.filterForm.setValue(dateRangeSession);
      this.setDates.emit({
        ...dateEmitObject,
      });
    } else {
      let newStartDate;
      let newEndDate;
      if (!this.isPageFilter && !this.isChartFilter) {
        newStartDate = DateUtility.getDateRange(this.maxDatedays).startDate;
        newEndDate = DateUtility.getDateRange(this.maxDatedays).endDate;
      }
      this.filterForm
        .get('startDate')
        .setValue(new Date(newStartDate || defaultStartDate).toISOString());
      this.filterForm
        .get('endDate')
        .setValue(new Date(newEndDate || defaultEndDate).toISOString());
    }
  }

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit(): void {
    this.dateRangeLabel =
      this.routeSegment === this.inbound
        ? this.contentPipe.transform('lbl_warehouse_creationDateByDateRange')
        : this.contentPipe.transform('lbl_warehouse_expectedShipByDateRange');
  }

  /**
   * apply click handler
   */
  onApplyClick() {
    const startDate = moment(this.filterForm.get('startDate').value).format(
      this.dateFormat
    );
    const endDate = moment(this.filterForm.get('endDate').value).format(
      this.dateFormat
    );
    if (!this.isChartFilter && this.isPageFilter) {
      SessionStorageUtility.set(SESSION_STORAGE_KEYS.selectedDateRange, {
        startDate,
        endDate,
        dateRange: -1,
      });
    }
    this.setDates.emit({
      startDate,
      endDate,
      numOfDays: moment(endDate).diff(moment(startDate), 'days') + 1,
    });
    if (!this.isApplyButtonTracked) {
      this.trackApplyButtonClick();
      this.isApplyButtonTracked = true;
    }
  }
  /**
   * track apply button clicks
   */
  trackApplyButtonClick() {
    this.analyticsService.createLinkClickTagObject(
      '#',
      'Custom Date Range',
      'Custom Date Range Selected',
      'Internal',
      {link_section: this.title}
    );
  }
}
