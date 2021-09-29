// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import BatchUtility from './batchUtil';
import { FILTER_CONFIGURATIONS } from '../global-config/config';

describe('batchUtil', () => {
  it('getOptionsLabels when reason code is provided', () => {
    const item = {
      reasonCode: 'expired',
      count: 7,
    };
    const contentPipe = {
      transform(item: string) {
        if (item === 'dpf_batchStatus_released') {
          return 'Released';
        } else if (item === 'dpf_batchStatus_expired') return 'Expired';
      },
    };
    const optionLabel = BatchUtility.getOptionsLabels(item, contentPipe);
    expect(optionLabel).toBe('Expired (7)');
  });

  it('getOptionsLabels when reason code is not provided', () => {
    const item = {
      reasonCode: undefined,
      count: 8,
    };
    const contentPipe = {
      transform(item: string) {
        if (item === 'dpf_batchStatus_released') {
          return 'Released';
        } else if (item === 'dpf_batchStatus_expired') return 'Expired';
      },
    };
    const optionLabel = BatchUtility.getOptionsLabels(item, contentPipe);
    expect(optionLabel).toBe('Released (8)');
  });

  it('getBatchStatusForPayload()', () => {
    const obj1 = ['Expired', 'Quarantine', 'Others', 'Released'];
    expect(BatchUtility.getBatchStatusForPayload(obj1)).toEqual([
      'Held',
      'Released',
    ]);
    const obj2 = ['Expired', 'Others'];
    expect(BatchUtility.getBatchStatusForPayload(obj2)).toEqual(['Held']);

    const obj3 = ['Released'];
    expect(BatchUtility.getBatchStatusForPayload(obj3)).toEqual(['Released']);

    const obj4 = [];
    expect(BatchUtility.getBatchStatusForPayload(obj4)).toEqual([]);
  });

  it('unwrapBatchStatus ()', () => {
    const selectedFilterItem = {
      filterType: 'status',
      key: 'batchStatus',
      label: 'dpf_filter_batchStatus',
      value: ['Expired', 'Recalled'],
    };

    const key = 'batchStatus';

    const filterConfiguration = [
      {
        allowFutureDates: false,
        clearSelection: false,
        defaultValue: [],
        filterType: 'status',
        isDataLoaded: true,
        key: 'batchStatus',
        label: 'dpf_filter_batchStatus',
        options: [
          { label: 'Released', value: 'Released (4)' },
          { value: 'Expired', label: 'Held - Expired (20)' },
          { value: 'Recalled', label: 'Held - Recalled (11)' },
          { value: 'Quarantine', label: 'Held - Quarantined (25)' },
          { value: 'Quality', label: 'Held - Quality (5)' },
          { value: 'Others', label: 'Held - Others (30)' },
        ],
      },
    ];

    expect(
      BatchUtility.unwrapBatchStatus(
        selectedFilterItem,
        key,
        filterConfiguration
      )
    ).toEqual(['Held - Expired (20)', 'Held - Recalled (11)']);
  });

  it('Get expirationDate options ()', () => {
    expect(FILTER_CONFIGURATIONS.dateFilterOptions.length).toEqual(6);
    expect(BatchUtility.getExpirationDateOptions()?.length).toEqual(4);
  });

  it('find index', () => {
    const obj1 = [
      { key: 'Released (4)', value: 'Released' },
      { key: 'Expired', label: 'Held - Expired (20)' },
      { key: 'Recalled', label: 'Held - Recalled (11)' },
      { key: 'Quarantine', label: 'Held - Quarantined (25)' },
      { key: 'Quality', label: 'Held - Quality (5)' },
      { key: 'Others', label: 'Held - Others (30)' },
    ];
    expect(BatchUtility.findIndex(obj1, 'Quality')).toEqual(4);
  });

  it('get date object with unwrapped value', () => {
    const filter = {
      endDate: '2021-09-08',
      filterType: 'dateRange',
      key: 'expirationDate',
      label: 'dpf_filter_expirationDate',
      startDate: '2021-09-02',
      value: 'Last 7 days',
    };
    expect(BatchUtility.getDateObject(filter).value).toEqual(7);
  });

  it('get date object with value -1 for custom dates', () => {
    const filter = {
      endDate: '2021-09-08',
      filterType: 'dateRange',
      key: 'expirationDate',
      label: 'dpf_filter_expirationDate',
      startDate: '2021-09-01',
      value: '2021/09/01 — 2021/09/08',
    };
    expect(BatchUtility.getDateObject(filter).value).toEqual(-1);
  });

  it('get reasonCode without count', () => {
    const filter1 = {
      endDate: null,
      filterType: 'status',
      key: 'batchStatus',
      label: 'dpf_filter_batchStatus',
      startDate: null,
      value: ['Released (4)', 'Held - Quarantined (25)', 'Held - Quality (5)'],
    };
    expect(BatchUtility.getReasonCodesAfterRemovingCount(filter1)).toEqual([
      'Released',
      'Quarantine',
      'Quality',
    ]);
  });

  it('set chip value based on filterType', () => {
    const selectedFilters = {
      batchStatus: {
        filterType: 'status',
        key: 'batchStatus',
        value: [
          'Released (4)',
          'Held - Quarantined (25)',
          'Held - Quality (5)',
        ],
      },
      expirationDate: {
        endDate: '2021-09-08',
        filterType: 'dateRange',
        key: 'expirationDate',
        startDate: '2021-09-01',
        value: -1,
      },
      warehouse: {
        filterType: 'multi-select-dropdown',
        key: 'warehouse',
        value: ['ALL', 'WMCI1', 'WRNO1'],
      },
    };

    const defaultFilter = {
      batchStatus: {
        filterType: 'status',
        key: 'batchStatus',
        value: 'ALL',
      },
      warehouse: {
        filterType: 'multi-select-dropdown',
        key: 'warehouse',
        value: 'ALL',
      },
    };

    const filterKey = {
      BatchStatus: 'batchStatus',
      ExpirationDate: 'expirationDate',
      Warehouse: 'warehouse',
    };

    const defaultFilterKey = ['warehouse', 'batchStatus'];

    const filterConfiguration = [
      {
        defaultValue: ['ALL', 'WMCI1', 'WRNO1'],
        filterType: 'multi-select-dropdown',
        key: 'warehouse',
        options: ['WMCI1', 'WRNO1'],
      },
      {
        defaultValue: ['ALL'],
        filterType: 'status',
        key: 'batchStatus',
        options: [
          { value: 'Released', label: 'Released (4)' },
          { value: 'Expired', label: 'Held - Expired (20)' },
          { value: 'Recalled', label: 'Held - Recalled (11)' },
          { value: 'Quarantine', label: 'Held - Quarantined (25)' },
          { value: 'Quality', label: 'Held - Quality (5)' },
          { value: 'Others', label: 'Held - Others (30)' },
        ],
        totalCount: 95,
      },
      {
        filterType: 'dateRange',
        key: 'expirationDate',
        maxDateRangeDiff: 59,
        minDateRange: 90,
        options: [
          { value: 7, label: 'lbl_filter_last_7_days', isCmsLabel: true },
          { value: 30, label: 'lbl_filter_last_30_days', isCmsLabel: true },
          { value: 60, label: 'lbl_filter_last_60_days', isCmsLabel: true },
          { value: -1, label: 'lbl_filter_custom_range', isCmsLabel: true },
        ],
      },
    ];

    const contentPipe = {
      transform(item: string) {
        return item;
      },
    };

    const response = [
      {
        filterType: 'multi-select-dropdown',
        key: 'warehouse',
        value: 'ALL',
      },
      {
        filterType: 'status',
        key: 'batchStatus',
        value: [
          'Released (4)',
          'Held - Quarantined (25)',
          'Held - Quality (5)',
        ],
      },
      {
        endDate: '2021-09-08',
        filterType: 'dateRange',
        key: 'expirationDate',
        startDate: '2021-09-01',
        value: '2021/09/01 — 2021/09/08',
      },
    ];

    const chipValues = BatchUtility.setFilterChipValue(
      selectedFilters,
      filterConfiguration,
      defaultFilter,
      filterKey,
      defaultFilterKey,
      contentPipe
    );
    expect(chipValues[0].value).toEqual('ALL');
    expect(chipValues[1].value).toEqual([
      'Released (4)',
      'Held - Quarantined (25)',
      'Held - Quality (5)',
    ]);
    expect(chipValues[2].value).toEqual('2021/09/01 — 2021/09/08');
  });
});
