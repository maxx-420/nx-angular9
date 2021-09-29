// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Map Utility

import { GOOGLE_MAP_CONFIG } from '../global-config';

import { SessionStorageUtility } from './sessionStorage';
import ShipmentUtility from './shipmentUtils';
import { default as ViewportUtility } from './viewport';

const MapUtility = {
  /**
   * get the lat long
   */

  getFormattedGeocode(addresses, serviceInstance) {
    if (addresses) {
      const formattedOriginAddress = ShipmentUtility.getStringAddressForGoogleMap(
        addresses.origin
      );
      const formattedDestinationAddress = ShipmentUtility.getStringAddressForGoogleMap(
        addresses.destination
      );
      const originSubs = serviceInstance.getGeocode(
        formattedOriginAddress,
        SessionStorageUtility.getConfigKeys(GOOGLE_MAP_CONFIG.geoCodeUrl),
        SessionStorageUtility.getConfigKeys(GOOGLE_MAP_CONFIG.googleMapsApiKey)
      );
      const destinationSubs = serviceInstance.getGeocode(
        formattedDestinationAddress,
        SessionStorageUtility.getConfigKeys(GOOGLE_MAP_CONFIG.geoCodeUrl),
        SessionStorageUtility.getConfigKeys(GOOGLE_MAP_CONFIG.googleMapsApiKey)
      );
      return {
        originSubs,
        destinationSubs,
      };
    }
  },

  /**
   * builds request for geocode
   * @param address address over which to query for coordinates
   */
  buildGeocodeUrl(address: string, baseUrl: string, key: string) {
    return `${baseUrl}${address}&key=${key}`;
  },

  /**
   * returns map minimum zoom level as per device width
   */
  getMapMinZoomLevel() {
    let minZoom: number;

    if (ViewportUtility.isLargeDesktopDevice()) {
      minZoom = 3;
    } else if (ViewportUtility.isDesktopDevice()) {
      minZoom = 2;
    } else {
      minZoom = 1;
    }

    return minZoom;
  },
};

export default MapUtility;
