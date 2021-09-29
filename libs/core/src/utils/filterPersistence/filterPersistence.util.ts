// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { default as SessionStorageUtility } from '../sessionStorage';
import {
  MODULE_NAMES,
  PAGE_KEYS,
} from '../../constants/global.constant';

import {
  GLOBAL_FILTER_KEYS,
  GLOBAL_MODULE_KEY,
  SCS_FILTERS_KEY,
} from './filterPersistence.config';

const FilterPersistenceUtility = {
  /**
   * Sets filters in session storage
   * @param module : module name like inbound/outbound, etc.
   * @param page : page identifier like l1/l2, etc.
   * @param filterKey : filter key like pickupDate
   * @param filterValue : filter value with a proper schema
   */
  setPersistentFilter(module, page, filterKey, filterValue) {
    let existingFilters = SessionStorageUtility.get(SCS_FILTERS_KEY) ?? {};
    // incorrect data, do nothing
    /* istanbul ignore else */
    if (
      !MODULE_NAMES[module] ||
      !PAGE_KEYS[page] ||
      !filterValue
    ) {
      return false;
    }

    // created on will be stored in global always
    if (GLOBAL_FILTER_KEYS.indexOf(filterKey) !== -1) {
      existingFilters[GLOBAL_MODULE_KEY] = {
        ...existingFilters[GLOBAL_MODULE_KEY],
        [filterKey]: filterValue,
      };
      SessionStorageUtility.set(SCS_FILTERS_KEY, existingFilters);
      return existingFilters;
    }

    if (filterKey) {
      existingFilters = {
        ...existingFilters,
        [module]: {
          ...existingFilters?.[module],
          [page]: {
            ...existingFilters?.[module]?.[page],
            [filterKey]: {
              ...existingFilters?.[module]?.[page]?.[filterKey],
              ...filterValue,
            },
          },
        },
      };
    } else {
      existingFilters = {
        ...existingFilters,
        [module]: {
          ...existingFilters?.[module],
          [page]: filterValue,
        },
      };
    }

    SessionStorageUtility.set(SCS_FILTERS_KEY, existingFilters);

    return existingFilters;
  },

  /**
   * @param module : module name like inbound/outbound, etc.
   * @param page : page identifier like l1/l2, etc.
   * @param filterKey : filter key like pickupDate
   */
  getPersistentFilter(module, page = null, filterKey = null) {
    const existingFilters = SessionStorageUtility.get(SCS_FILTERS_KEY);
    if (!existingFilters) {
      return null;
    }
    const globalFilters = existingFilters[GLOBAL_MODULE_KEY] ?? {};

    // createdOn will always be served from global filters node.
    /* istanbul ignore else */
    if (GLOBAL_FILTER_KEYS.indexOf(filterKey) !== -1) {
      return {
        ...globalFilters[filterKey],
      };
    }

    /* istanbul ignore else */
    if (module) {
      if (page) {
        if (filterKey) {
          // return filter key specific
          return existingFilters[module]?.[page]?.[filterKey];
        }
        // return all filters of page
        else {
          // Merge global and Page level filters
          return {
            ...existingFilters[module]?.[page],
            ...globalFilters,
          };
        }
      } else {
        // Merge global and Page level filters
        Object.keys(existingFilters[module] ?? {}).forEach((pageKey) => {
          existingFilters[module][pageKey] = {
            ...existingFilters[module][pageKey],
            ...existingFilters.global,
          };
        });
        // return all filter of module
        return existingFilters[module];
      }
    }

    return null;
  },

  /**
   * This function checks if session contains filters for given page
   * @param module : module name like inbound/outbound, etc.
   * @param page : page identifier like l1/l2, etc.
   */
  doesPageFilterExist(module, page) {
    const existingFilters = SessionStorageUtility.get(SCS_FILTERS_KEY);
    if (existingFilters?.[module]?.[page]) {
      return true;
    }
    return false;
  },
};

export default FilterPersistenceUtility;
