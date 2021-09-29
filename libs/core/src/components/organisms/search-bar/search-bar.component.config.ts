// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { SEARCH_BY_INVENTORY_NO } from '../../../constants/global.constant';

/**
 * config file for search bar
 */
export const minCharForSearchOptions = [
  'itemNumber',
  'itemDescription',
  'Designator',
  'LPN',
  'VSN',
  'VCL',
  SEARCH_BY_INVENTORY_NO,
];

export const fieldNameAttribute = {
  searchTerm: 'dashboardSearch',
};
