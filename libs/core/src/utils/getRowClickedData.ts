// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * extracts the shipment number and navigates to a route defined for it
 */
import { Router } from '@angular/router';

import NavigationUtility from './navigationUtil';

const getRowClickedData = (
  rowData,
  prop,
  router: Router,
  state,
  prefixUrl = '',
  analyticsCallback?: any,
  queryPrams?: string
) => {
  const upsOrderNumber = rowData[prop];
  const shipmentNumber = upsOrderNumber.includes('#')
    ? upsOrderNumber.split('#')[1]
    : upsOrderNumber;
  if (prefixUrl) {
    if (analyticsCallback) {
      analyticsCallback(prefixUrl + shipmentNumber);
    }

    let url = `${prefixUrl}${shipmentNumber}`;
    if (queryPrams) {
      url += queryPrams;
    }
    NavigationUtility.navigate(
      router,
      router
        ? [url]
        : url,
      router ? false : true,
      state
    );
  } else {
    router.navigate([`${prefixUrl}${shipmentNumber}`], state);
  }
};

export default getRowClickedData;
