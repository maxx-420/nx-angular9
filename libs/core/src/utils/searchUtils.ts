// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// search utils

import { AccessControlUtility } from './access-control.util';
import { searchByOptions } from './../global-config/search-inclusion.config';

const SearchUtility = {
  /**
   * Shows clear search term control if reuired.
   */
  checkForClearControl(SearchForm, searchTermFieldName) {
    let showClearControl;
    if (SearchForm.get(searchTermFieldName).value) {
      showClearControl = true;
    } else {
      showClearControl = false;
    }
    return showClearControl;
  },

  /**
   * Return styling to be applied on the search button
   */
  getSearchBtnStyle() {
    return {
      width: '52px',
      'padding-top': '11px',
      'padding-bottom': '11px',
      'padding-right': '10px',
      'padding-left': '10px',
      'min-width': '30px',
    };
  },

  /**
   * Return the search options list based on product line
   */
  setHeadersSearchOptions(searchOptions = searchByOptions) {
    let headerSearchOptionList = [];
    headerSearchOptionList = AccessControlUtility.getCurrentFieldMapping(
      searchOptions
    );
    return headerSearchOptionList;
  },
};

export default SearchUtility;
