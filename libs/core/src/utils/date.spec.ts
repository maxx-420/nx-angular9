// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import DateUtility from './date';
import formatDate from './formatDate';
import * as _moment from 'moment';
import { DATE_FORMAT } from '../constants';

const moment = _moment;

describe('date', () => {
  it('getDateRange', () => {
    const dt5 = new Date();
    dt5.setDate(dt5.getDate() - 4);
    const dtp5 = new Date();
    dtp5.setDate(dtp5.getDate() + 4);

    const dt1 = new Date();

    expect(DateUtility.getDateRange(5)).toEqual({
      startDate: formatDate(dt5),
      endDate: formatDate(new Date()),
    });
    expect(DateUtility.getDateRange(1)).toEqual({
      startDate: formatDate(dt1),
      endDate: formatDate(new Date()),
    });
    expect(DateUtility.getDateRange(-5)).toEqual({
      startDate: formatDate(new Date()),
      endDate: formatDate(dtp5),
    });
  });

  it('setDateRangeHardLimit', () => {
    const selectedFilterValue = {
      min: null,
      max: null,
    };
    const filterConfiguration = {
      minDateRange: 90,
      maxDateRangeDiff: 59,
    };
    DateUtility.setDateRangeHardLimit(
      moment().toISOString(),
      false,
      filterConfiguration,
      selectedFilterValue,
      false,
      true
    );
    expect(moment(selectedFilterValue.min).format(DATE_FORMAT)).toEqual(
      moment().subtract(59, 'days').format(DATE_FORMAT)
    );
  });

  it('getDateRange with offset', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const fourDaysAgo = new Date(today);
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
    const fourDaysAfter = new Date(today);
    fourDaysAfter.setDate(fourDaysAfter.getDate() + 4);

    // Test date range of 4 days in past excluding today
    expect(DateUtility.getDateRange(4, 1)).toEqual({
      startDate: formatDate(fourDaysAgo),
      endDate: formatDate(yesterday),
    });
    // Test date range of 4 days in future excluding today
    expect(DateUtility.getDateRange(-4, 1)).toEqual({
      startDate: formatDate(tomorrow),
      endDate: formatDate(fourDaysAfter),
    });
  });
});
