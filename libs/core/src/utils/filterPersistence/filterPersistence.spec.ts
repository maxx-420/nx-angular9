// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { default as SessionStorageUtility } from '../sessionStorage';

import FilterPersistenceUtility from './filterPersistence.util';
import { IPersistentFilterSchema } from './persistentFilterObject.interface';

const createdOn: IPersistentFilterSchema = {
  value: {
    startDate: '2021-02-03',
    endDate: '2021-02-04',
  },
  apiKey: 'createdDate',
  label: 'lbl_shipments_filter_createdOn',
  key: 'createdOn',
  selectedOption: 60,
  filterType: 'daterange',
};

const bookedOn: IPersistentFilterSchema = {
  value: {
    startDate: '2021-02-03',
    endDate: '2021-02-04',
  },
  apiKey: 'createdDate',
  label: 'lbl_shipments_filter_bookedOn',
  key: 'bookedOn',
  selectedOption: 60,
  filterType: 'daterange',
};

const pickupDate: IPersistentFilterSchema = {
  value: {
    startDate: '2021-02-03',
    endDate: '2021-02-04',
  },
  apiKey: 'pickupDate',
  label: 'lbl_shipments_filter_pickupDate',
  key: 'pickupDate',
  selectedOption: 60,
  filterType: 'daterange',
};

describe('FilterPersistentUtility', () => {
  it('should setFilter createdOn in global', () => {
    FilterPersistenceUtility.setPersistentFilter(
      'inbound',
      'inbound_summary',
      'createdOn',
      createdOn
    );

    expect(
      FilterPersistenceUtility.getPersistentFilter(
        'inbound',
        'inbound_summary',
        'createdOn'
      )
    ).toEqual(createdOn);
  });

  it('should setFilter bookedOn in specific page', () => {
    FilterPersistenceUtility.setPersistentFilter(
      'shipments',
      'shipments_mov_summary',
      'bookedOn',
      bookedOn
    );

    expect(
      FilterPersistenceUtility.getPersistentFilter(
        'shipments',
        'shipments_mov_summary',
        'bookedOn'
      )
    ).toEqual(bookedOn);

    FilterPersistenceUtility.setPersistentFilter(
      'shipments',
      'shipments_mov_summary',
      'pickupDate',
      pickupDate
    );

    expect(
      FilterPersistenceUtility.getPersistentFilter(
        'shipments',
        'shipments_mov_summary',
        'pickupDate'
      )
    ).toEqual(pickupDate);

    const aggregatedFilters = {
      shipments_mov_summary: {
        bookedOn: bookedOn,
        pickupDate: pickupDate,
      },
    };

    expect(FilterPersistenceUtility.getPersistentFilter('shipments')).toEqual(
      aggregatedFilters
    );
  });

  it('should setFilter with empty module, page, filterKey', () => {
    expect(
      FilterPersistenceUtility.setPersistentFilter('', 'l2', 'bookedOn', {})
    ).toEqual(false);

    expect(
      FilterPersistenceUtility.setPersistentFilter(
        'shipments',
        '',
        'bookedOn',
        {}
      )
    ).toEqual(false);
  });

  it('should return true/false depening on if page key exists in session', () => {
    FilterPersistenceUtility.setPersistentFilter(
      'shipments',
      'shipments_mov_summary',
      'bookedOn',
      bookedOn
    );
    expect(
      FilterPersistenceUtility.doesPageFilterExist(
        'shipments',
        'shipments_mov_summary'
      )
    ).toEqual(true);
    expect(
      FilterPersistenceUtility.doesPageFilterExist('shipments', 'l222')
    ).toEqual(false);
  });

  it('should setFilter createdOn in global for page', () => {
    FilterPersistenceUtility.setPersistentFilter(
      'shipments',
      'shipments_mov_summary',
      null,
      bookedOn
    );

    expect(
      FilterPersistenceUtility.getPersistentFilter(
        'shipments',
        'shipments_mov_summary'
      )
    ).toEqual(bookedOn);
  });

  it('should return filters as null when no filters', () => {
    spyOn(SessionStorageUtility, 'get').and.returnValue(null);

    const filters = FilterPersistenceUtility.getPersistentFilter(
      'shipments',
      'shipments_mov_summary',
      'bookedOn'
    );
    expect(filters).toEqual(null);
  });

  it('should return Module level filters', () => {
    const defaultfilter = {
      shipments: {
        shipments_mov_summary: {
          deliveryPerformance_createdOn: {
            dateRange: 14,
          },
          mySupplyChain_createdOn: {
            dateRange: 14,
          },
        },
      },
    };
    spyOn(SessionStorageUtility, 'get').and.returnValue(defaultfilter);
    const filters = FilterPersistenceUtility.getPersistentFilter('shipments');
    expect(filters).toEqual(defaultfilter.shipments);
  });

  it('should return Page level filters', () => {
    const defaultfilter = {
      shipments: {
        shipments_mov_summary: {
          deliveryPerformance_createdOn: {
            dateRange: 14,
          },
          mySupplyChain_createdOn: {
            dateRange: 14,
          },
        },
      },
    };
    spyOn(SessionStorageUtility, 'get').and.returnValue(defaultfilter);
    const filters = FilterPersistenceUtility.getPersistentFilter(
      'shipments',
      'shipments_mov_summary'
    );
    expect(filters).toEqual(defaultfilter.shipments.shipments_mov_summary);
  });

  it('should return filter specific filters', () => {
    const defaultfilter = {
      shipments: {
        shipments_mov_summary: {
          deliveryPerformance_createdOn: {
            dateRange: 14,
          },
          mySupplyChain_createdOn: {
            dateRange: 14,
          },
        },
      },
    };
    spyOn(SessionStorageUtility, 'get').and.returnValue(defaultfilter);
    const filters = FilterPersistenceUtility.getPersistentFilter(
      'shipments',
      'shipments_mov_summary',
      'mySupplyChain_createdOn'
    );
    expect(filters).toEqual(
      defaultfilter.shipments.shipments_mov_summary.mySupplyChain_createdOn
    );
  });
});
