// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import * as _moment from 'moment';

import {
  CUSTOM_RANGE_OPTION_VALUE,
  DATE_FORMAT,
  DEFAULT_DATE_FORMAT,
  FILTER_TYPES,
  MONTH_TO_DATE_OPTION_VALUE,
} from '../constants/global.constant';
import { SESSION_STORAGE_KEYS } from '../constants/storage.constant';
import { SessionStorageUtility } from '../utils/sessionStorage';
import DateUtility from '../utils/date';

import {
  DrilldownDateObject,
  DrilldownStringObject,
} from './interfaces/filtersObject.interface';

// prettier-ignore
const moment = (_moment as any).default ? (_moment as any).default : _moment;

const FilterUtility = {
  /**
   * Formate daterange for filterchip
   * @param chipDate date obj
   * @param contentPipe contentpipe
   */
  formatValuesForChip(dateRangeObj, contentPipe) {
    if (FilterUtility.checkMTDFilterValue(dateRangeObj.value)) {
      return contentPipe.transform(`lbl_filter_${dateRangeObj.value}`);
    } else if (dateRangeObj.value !== -1) {
      if (dateRangeObj.value === 2) {
        return contentPipe.transform(`lbl_filter_last_24_hours`);
      }
      return contentPipe.transform(
        `lbl_filter_last_${dateRangeObj.value}_days`
      );
    }
    return `${moment(dateRangeObj.startDate).format(DATE_FORMAT)} — ${moment(
      dateRangeObj.endDate
    ).format(DATE_FORMAT)}`;
  },

  formatValuesForChipForFutureDates(dateRangeObj, contentPipe) {
    if (dateRangeObj.value !== -1) {
      if (dateRangeObj.value === -2) {
        return contentPipe.transform(`lbl_filter_next_24_hours`);
      }
      return contentPipe.transform(
        `lbl_filter_next_${-1 * dateRangeObj.value}_days`
      );
    }
    return `${moment(dateRangeObj.startDate).format(DATE_FORMAT)} — ${moment(
      dateRangeObj.endDate
    ).format(DATE_FORMAT)}`;
  },

  /**
   * Set custom range in session storage
   */
  setCustomRangeInStorage(selectedFilters) {
    SessionStorageUtility.set(SESSION_STORAGE_KEYS.selectedDateRange, {
      startDate: moment(selectedFilters.startDate).format(DEFAULT_DATE_FORMAT),
      endDate: moment(selectedFilters.endDate).format(DEFAULT_DATE_FORMAT),
      dateRange: selectedFilters.value,
    });
  },

  /**
   * formateDate
   * filteredDataObj, dateFormateType , property(dateRange, value)
   */
  formatDate(filteredDataObj, dateFormateType, property?: string) {
    let formattedDateObject: any;
    if (
      filteredDataObj[property] === CUSTOM_RANGE_OPTION_VALUE ||
      FilterUtility.checkMTDFilterValue(filteredDataObj[property])
    ) {
      formattedDateObject = {
        startDate: moment(filteredDataObj.startDate).format(dateFormateType),
        endDate: moment(filteredDataObj.endDate).format(dateFormateType),
        value: filteredDataObj[property],
      };
    } else {
      formattedDateObject = {
        startDate: moment(
          DateUtility.getDateRange(filteredDataObj).startDate
        ).format(dateFormateType),
        endDate: moment(
          DateUtility.getDateRange(filteredDataObj).endDate
        ).format(dateFormateType),
        value: filteredDataObj,
      };
    }
    return formattedDateObject;
  },

  getFilterLabel(filterStartDate, filterEndDate) {
    return `From ${filterStartDate} to ${filterEndDate}`;
  },

  /**
   * This function creates an object of filter model type
   * @param filterObj (any) Object with filter fields
   * @param filterKey (string) The unique key of the filter
   * @param contentPipe (RenderLabelPipe) used to format value to chip display value
   * @param filterType (string) Type of filter as defined by FILTER_TYPES constant
   */
  createFilterObject(filterObj, filterKey, contentPipe, filterType) {
    return {
      key: filterKey,
      label:
        filterType === FILTER_TYPES.MULTI_CHECKBOX
          ? null
          : `lbl_shipments_filter_${filterKey}`,
      value:
        filterType === FILTER_TYPES.DATE_RANGE
          ? FilterUtility.formatValuesForChip(filterObj, contentPipe)
          : filterObj.value,
      startDate: filterObj.startDate ?? null,
      endDate: filterObj.endDate ?? null,
      filterType,
      ...(filterObj.deliveryStatus
        ? { deliveryStatus: filterObj.deliveryStatus }
        : {}),
    };
  },

  /**
   * This method checks if value of date type filterObj is a custom value or of type 'Last x days' etc.
   * it converts these values to start and end date in YYYY-MM-DD format
   * @param filterObj (any) Object with filter fields
   */
  createDateObject(filterObj) {
    let formattedFilter: any;
    if (
      filterObj.value === CUSTOM_RANGE_OPTION_VALUE ||
      FilterUtility.checkMTDFilterValue(filterObj?.value)
    ) {
      formattedFilter = {
        ...filterObj,
        ...FilterUtility.formatDate(filterObj, DEFAULT_DATE_FORMAT, 'value'),
      };
    } else {
      formattedFilter = {
        ...filterObj,
        ...FilterUtility.formatDate(filterObj.value, DEFAULT_DATE_FORMAT),
      };
    }
    return formattedFilter;
  },

  /**
   * check if it is MTD filter value or not.
   * @param filterValue filter value
   */
  checkMTDFilterValue(filterValue) {
    return (
      typeof filterValue === 'string' &&
      filterValue?.includes(MONTH_TO_DATE_OPTION_VALUE)
    );
  },

  /**
   * returns date in case of MTD filters.
   * MTD - From First Day of the month to Browser's Current Date
   * Previous Month  - This shall be Day 1 of the previous month to the last day of the previous month.
   * 2 months ago  - This shall be day 1 of the month prior to previous month to the last day of month prior to the previous month.
   * @param filterValue filter valuye
   * @param dateType either start or end
   */
  getMTDFilterDates(filterValue, dateType) {
    let startDate;
    let endDate;
    if (filterValue === 'MTD') {
      startDate = moment(new Date())
        .subtract(0, 'months')
        .startOf('month')
        .format(DEFAULT_DATE_FORMAT);
      endDate = moment(new Date()).format(DEFAULT_DATE_FORMAT);
    } else {
      const subtractValue = Number(filterValue.split('-')[1]);
      startDate = moment(new Date())
        .subtract(subtractValue, 'months')
        .startOf('month')
        .format(DEFAULT_DATE_FORMAT);
      endDate = moment(new Date())
        .subtract(subtractValue, 'months')
        .endOf('month')
        .format(DEFAULT_DATE_FORMAT);
    }
    return dateType === 'end' ? endDate : startDate;
  },

  /**
   * Converts drillown filters array taken from state to the interface used by filter panel
   * @param drilldownArray ([drilldownObjects]) Array of drillown objects from 1st component to 2nd component
   * @param drilldownConfig Config containing keys, to determine how each drilldown object is to be formatted,
   *                        (Currently only date, milestone and, string)
   * @param contentPipe (RenderLabelPipe) used to format value to chip display value
   */
  formatDrilldownValue(
    drilldownArray: (DrilldownDateObject | DrilldownStringObject | any)[],
    drilldownConfig,
    contentPipe
  ) {
    let formattedFilters: any = {};
    drilldownArray.forEach((drilldownObj) => {
      let formattedObj;
      if (
        drilldownConfig.dateFilters &&
        drilldownConfig.dateFilters.indexOf(drilldownObj.key) !== -1
      ) {
        formattedObj = FilterUtility.dateDrilldown(
          drilldownObj as DrilldownDateObject
        );
      } else if (
        drilldownConfig.milestoneFilter &&
        drilldownConfig.milestoneFilter.indexOf(drilldownObj.key) !== -1
      ) {
        formattedObj = FilterUtility.createFilterObject(
          drilldownObj,
          drilldownObj.key,
          contentPipe,
          FILTER_TYPES.MILESTONE
        );
      } else if (
        drilldownConfig.stringFilters &&
        drilldownConfig.stringFilters.indexOf(drilldownObj.key) !== -1
      ) {
        formattedObj = {
          value: drilldownObj.value,
          startDate: null,
          endDate: null,
        };
      } else if (
        drilldownConfig.MTDFilters &&
        drilldownConfig.MTDFilters.indexOf(drilldownObj.key) !== -1
      ) {
        formattedObj = {
          key: drilldownObj.key,
          startDate: drilldownObj.value.startDate,
          endDate: drilldownObj.value.endDate,
          value: drilldownObj.value.range,
        };
      } else {
        formattedObj = {
          value: drilldownObj.value,
        };
      }
      formattedFilters = {
        ...formattedFilters,
        [drilldownObj.key]: formattedObj,
      };
    });

    return formattedFilters;
  },

  /**
   * The 1 st component sends to 2nd component date drilldowns with types as 'relative' or 'custom', the formatting of date fiilters hanled
   * on these params
   * @param filterObj the date drilldown object
   */
  dateDrilldown(filterObj: DrilldownDateObject) {
    let formattedObj;
    let dateObj;

    if (filterObj.value?.type === 'relative') {
      dateObj = DateUtility.getDateRange(-1 * filterObj.value.range);
      formattedObj = {
        filterType: FILTER_TYPES.DATE_RANGE,
        value:
          filterObj.value.range > 0
            ? CUSTOM_RANGE_OPTION_VALUE
            : filterObj.value.range * -1,
        startDate: dateObj.startDate,
        endDate: dateObj.endDate,
      };
    } else {
      formattedObj = {
        filterType: FILTER_TYPES.DATE_RANGE,
        value: CUSTOM_RANGE_OPTION_VALUE,
        startDate: filterObj.value?.startDate,
        endDate: filterObj.value?.endDate,
      };
    }
    return formattedObj;
  },
};

export default FilterUtility;
