// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import filterUtility from './filterUtils';
import { RenderLabelPipe } from '../pipe/render-label/render-label.pipe';

import { TestBed } from '@angular/core/testing';
import { CMSContentStoreService } from '../service/cms-content-store/cms-content-store.service';
import { DATE_FORMAT } from '../constants/global.constant';
import DateUtility from './date';
import * as moment from 'moment';
import { DEFAULT_DATE_FORMAT } from '../constants/global.constant';

describe('FilterUtility', () => {
  it('should formatValuesForChip for Last 7 days', () => {
    let dateRangeObj = {
      startDate: '2021-01-29',
      endDate: '2021-02-04',
      value: 7,
    };
    let contents = [
      {
        key: 'lbl_filter_last_7_days',
        value: 'Last 7 days',
      },
    ];
    let contentStoreService = TestBed.inject(CMSContentStoreService);
    contentStoreService.setContent(contents[0].key, contents[0].value);
    let contentPipe = new RenderLabelPipe(contentStoreService);
    spyOn(contentPipe, 'transform').and.returnValue(contents[0].value);
    const value = filterUtility.formatValuesForChip(dateRangeObj, contentPipe);
    expect(value).toBe('Last 7 days');
  });

  it('should formatValuesForChip for Last 24hrs', () => {
    let dateRangeObj = {
      startDate: '2021-02-03',
      endDate: '2021-02-04',
      value: 2,
    };
    let contents = [
      {
        key: 'lbl_filter_last_24_hours',
        value: 'Last 24 hrs',
      },
    ];
    let contentStoreService = TestBed.inject(CMSContentStoreService);
    contentStoreService.setContent(contents[0].key, contents[0].value);
    let contentPipe = new RenderLabelPipe(contentStoreService);
    spyOn(contentPipe, 'transform').and.returnValue(contents[0].value);
    const value = filterUtility.formatValuesForChip(dateRangeObj, contentPipe);
    expect(value).toBe('Last 24 hrs');
  });

  it('should call formatDate for custom date range', () => {
    let dateObj = {
      startDate: '2021-01-06',
      endDate: '2021-02-04',
      dateRange: -1,
    };
    let value = filterUtility.formatDate(dateObj, DATE_FORMAT, 'dateRange');
    let formattedDate = {
      startDate: '2021/01/06',
      endDate: '2021/02/04',
      value: -1,
    };
    expect(value).toEqual(formattedDate);
  });

  it('should call formatDate for dates', () => {
    let dateObj = {
      startDate: '2021-01-29',
      endDate: '2021-02-04',
    };
    spyOn(DateUtility, 'getDateRange').and.returnValue(dateObj);
    let value = filterUtility.formatDate(7, DATE_FORMAT, 'dateRange');
    let formattedDate = {
      startDate: '2021/01/29',
      endDate: '2021/02/04',
      value: 7,
    };
    expect(value).toEqual(formattedDate);
  });

  it('should call setCustomRangeInStorage', () => {
    let dateObj = {
      startDate: '2021/01/29',
      endDate: '2021/02/04',
      value: -1,
    };
    filterUtility.setCustomRangeInStorage(dateObj);
  });

  it('should return the filter object, of type filter model', () => {
    const obj = {
      label: 'lbl_shipments_filter_status',
      value: ['Rated', 'Booked'],
      startDate: null,
      endDtae: null,
    };

    const formattedObj = {
      key: 'status',
      label: 'lbl_shipments_filter_status',
      value: ['Rated', 'Booked'],
      startDate: null,
      endDate: null,
      filterType: 'milestone',
    };

    let contents = [
      {
        key: 'lbl_shipments_filter_status',
        value: 'Milestone',
      },
    ];
    let contentStoreService = TestBed.inject(CMSContentStoreService);
    contentStoreService.setContent(contents[0].key, contents[0].value);
    let contentPipe = new RenderLabelPipe(contentStoreService);
    spyOn(contentPipe, 'transform').and.returnValue(contents[0].value);

    const utilObj = filterUtility.createFilterObject(
      obj,
      'status',
      contentPipe,
      'milestone'
    );

    expect(formattedObj).toEqual(utilObj);
  });

  it('should return formatted date object', () => {
    const spy = spyOn(filterUtility, 'formatDate').and.returnValue({
      endDate: '2021-06-02',
      startDate: '2021-06-02',
      value: 7,
    });

    const obj = {
      value: 7,
      startDate: null,
      endDate: null,
    };

    const formattedDateObj = {
      value: 7,
      startDate: '2021-06-02',
      endDate: '2021-06-02',
    };

    expect(filterUtility.createDateObject(obj)).toEqual(formattedDateObj);
  });

  it('should format drilldown array', () => {
    const drilldownArray = [
      {
        key: 'shipmentCreation',
        value: {
          range: -60,
          type: 'relative',
        },
      },
      {
        key: 'status',
        value: ['Pending', 'Rated', 'Booked'],
      },
    ];
    const drilldownConfig = {
      dateFilters: ['shipmentCreation'],
      milestoneFilter: ['status'],
    };

    const formattedObj = {
      shipmentCreation: {
        ...DateUtility.getDateRange(60),
        filterType: 'dateRange',
        value: 60,
      },
      status: {
        endDate: null,
        filterType: 'milestone',
        key: 'status',
        label: 'lbl_shipments_filter_status',
        startDate: null,
        value: ['Pending', 'Rated', 'Booked'],
      },
    };

    let contents = [
      {
        key: 'lbl_shipments_filter_status',
        value: 'Milestone',
      },
    ];
    let contentStoreService = TestBed.inject(CMSContentStoreService);
    contentStoreService.setContent(contents[0].key, contents[0].value);
    let contentPipe = new RenderLabelPipe(contentStoreService);
    spyOn(contentPipe, 'transform').and.returnValue(contents[0].value);

    expect(
      filterUtility.formatDrilldownValue(
        drilldownArray,
        drilldownConfig,
        contentPipe
      )
    ).toEqual(formattedObj);
  });
  it('should return if filter is MTD or not', () => {
    let value = filterUtility.checkMTDFilterValue('MTD');
    expect(value).toEqual(true);
  });
  it('should return date range for mtd filter values', () => {
    let value = filterUtility.getMTDFilterDates('MTD', 'start');
    expect(value).toEqual(
      moment(new Date())
        .subtract(0, 'months')
        .startOf('month')
        .format(DEFAULT_DATE_FORMAT)
    );
  });
  it('should return date range for mtd filter values', () => {
    let value = filterUtility.getMTDFilterDates('MTD', 'end');
    expect(value).toEqual(moment(new Date()).format(DEFAULT_DATE_FORMAT));
  });
  it('should return last date pf previous month for mtd-1 filter values', () => {
    let value = filterUtility.getMTDFilterDates('MTD-1', 'end');
    expect(value).toEqual(
      moment(new Date())
        .subtract(1, 'months')
        .endOf('month')
        .format(DEFAULT_DATE_FORMAT)
    );
  });
  it('should return first date of previous month for mtd-1 filter values', () => {
    let value = filterUtility.getMTDFilterDates('MTD-1', 'start');
    expect(value).toEqual(
      moment(new Date())
        .subtract(1, 'months')
        .startOf('month')
        .format(DEFAULT_DATE_FORMAT)
    );
  });
  it('should return last date of the month prior to previous month for mtd-2 filter values', () => {
    const lastDayOfMonth = moment(new Date())
      .subtract(2, 'months')
      .endOf('month')
      .format(DEFAULT_DATE_FORMAT);
    let value = filterUtility.getMTDFilterDates('MTD-2', 'end');
    expect(value).toEqual(lastDayOfMonth);
  });
  it('should return first date of the month prior to previous month for mtd-2 filter values', () => {
    const firstDayOfMonth = moment(new Date())
      .subtract(2, 'months')
      .startOf('month')
      .format(DEFAULT_DATE_FORMAT);
    let value = filterUtility.getMTDFilterDates('MTD-2', 'start');
    expect(value).toEqual(firstDayOfMonth);
  });
});
