// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// date utility
import * as _moment from 'moment';

import formatDate from './formatDate';
import getStartDate from './getStartDate';

// prettier-ignore
const moment = (_moment as any).default ? (_moment as any).default : _moment;

/**
 * Set hard limits to date range in calendar widget when Start Date is selected.
 * @param date string
 * @param allowFutureDates boolean
 * @param filterConfiguration any
 * @param dateLimit any
 */
function setLimitForStartDate(
  date: string,
  allowFutureDates: boolean,
  filterConfiguration: any,
  dateLimit: any
) {
  if (
    Math.abs(
      moment(date).diff(
        moment(
          allowFutureDates
            ? moment()
                .add(filterConfiguration.minDateRange, 'days')
                .toISOString()
            : moment().toISOString()
        ),
        'days'
      )
    ) >= filterConfiguration.maxDateRangeDiff
  ) {
    /**
     * If start date is selected and diff between start date and today is less than 60 days, then use 60 days limit.
     * For ex: Suppose today's date is 2nd Feb, so 90 days limit is 5th Nov.
     * If start date is set as 1st Dec, then 60 days limit is at 29th Jan which is before 2nd Feb so 60 days limit becomes max
     */
    dateLimit.max = moment(date)
      .add(filterConfiguration.maxDateRangeDiff, 'days')
      .toISOString();
  } else {
    /**
     * If start date is selected and diff between start date and today is more than 60 days,then use today.
     * For ex: Suppose today's date is 2nd Feb, so 90 days limit is 5th Nov.
     * If start date is set as 21st Dec, then 60 days limit is at 18th Feb which is after 2nd Feb so today becomes max
     */
    if (allowFutureDates) {
      dateLimit.max = moment()
        .add(filterConfiguration.minDateRange, 'days')
        .toISOString();
    } else if ('excludeOffset' in filterConfiguration) {
      dateLimit.max = moment()
        .subtract(filterConfiguration.excludeOffset, 'days')
        .toISOString();
    } else {
      dateLimit.max = moment().toISOString();
    }
  }
}

/**
 * Set hard limits to date range in calendar widget when End Date is selected.
 * @param date string
 * @param allowPastDates boolean
 * @param filterConfiguration any
 * @param dateLimit any
 */
function setLimitForEndDate(
  date: string,
  allowPastDates: boolean,
  filterConfiguration: any,
  dateLimit: any
) {
  if (
    Math.abs(
      moment(date).diff(
        moment(
          allowPastDates
            ? moment()
                .subtract(filterConfiguration.minDateRange, 'days')
                .toISOString()
            : moment().toISOString()
        ),
        'days'
      )
    ) >= filterConfiguration.maxDateRangeDiff
  ) {
    /**
     * If end date is selected and diff between end date and 90 days limit is more than 60 days, then use 60 days limit.
     * For ex: Suppose today's date is 2nd Feb, so 90 days limit is 5th Nov.
     * If End date is set as 25th Jan, then 60 days limit is at 27th Nov which is after 5th Nov so 60 days limit becomes min
     */
    dateLimit.min = moment(date)
      .subtract(filterConfiguration.maxDateRangeDiff, 'days')
      .toISOString();
  } else {
    /**
     * If end date is selected and diff between end date and 90 days limit is less than 60 days, then use 90 days limit.
     * For ex: Suppose today's date is 2nd Feb, so 90 days limit is 5th Nov.
     * If End date is set as 1st Jan, then 60 days limit is at 3rd Nov which is before 5th Nov so 90 days limit becomes min
     */
    dateLimit.min = moment(
      allowPastDates
        ? moment()
            .subtract(filterConfiguration.minDateRange, 'days')
            .toISOString()
        : moment().toISOString()
    ).toISOString();
  }
}

const DateUtility = {
  /**
   * Gives date range on passing number of days and offset. It will leave offset no. of days from today and return date range
   * spanning numberOfDays in past or future.<
   * Eg. If we want to exclude today and get 7 days date range in past pass offset = 1 and numberOfDays = 7
   * If we want to exclude today and get 7 days date range in future pass offset = 1 and numberOfDays = -7
   * @param numberOfDays Greater than 0 for past | Less than 0 for future.
   * @param offset Absoulte value of number of days from today from which range should be calculated
   */
  getDateRange(numberOfDays: number, offset = 0) {
    let numberToDateFormat;
    // If checks if past date range required, else checks for future date range
    if (numberOfDays >= 0) {
      numberToDateFormat = {
        // TODO : formatDate and getStartDate needs to be moved in this file
        startDate: formatDate(
          getStartDate(numberOfDays - 1 + Math.abs(offset))
        ),
        endDate: formatDate(getStartDate(Math.abs(offset))),
      };
    } else {
      numberToDateFormat = {
        startDate: formatDate(getStartDate(-1 * Math.abs(offset))),
        endDate: formatDate(getStartDate(numberOfDays + 1 - Math.abs(offset))),
      };
    }
    return numberToDateFormat;
  },

  /**
   * Set hard limits to date range in calendar widget
   * @param date string
   * @param isStartDate boolean
   * @param filterConfiguration any
   * @param dateLimit any
   * @param allowFutureDates boolean
   */
  setDateRangeHardLimit(
    date: string,
    isStartDate: boolean,
    filterConfiguration: any,
    dateLimit: any,
    allowFutureDates: boolean,
    allowPastDates: boolean
  ) {
    if (date !== null) {
      if (!isStartDate) {
        // If date is End Date
        setLimitForEndDate(
          date,
          allowPastDates,
          filterConfiguration,
          dateLimit
        );
      } else {
        // If date is Start Date
        setLimitForStartDate(
          date,
          allowFutureDates,
          filterConfiguration,
          dateLimit
        );
      }
    }
  },
};

export default DateUtility;
