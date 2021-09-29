// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { CUSTOM_EVENTS } from '../constants/custom-events-constant';

import { ICustomEventData } from './interfaces/customEventsData.interface';
export class CustomEventDispatcher {
  /**
   * NO LONGER USED
   * This method was previously used to dispatch the internalapp:routechanged event
   * within outbound/inbound/shipment apps to handle the styling(For L3 detail page) and to update
   * the header text. Currently that is being handled by the location change event.
   * @path url route path
   * @path state any state object that needs to be passed
   */
  public static dispatchInternalNavigation(url, state = {}) {
    window.dispatchEvent(
      new CustomEvent<ICustomEventData>(CUSTOM_EVENTS.internalApp.routeChange, {
        detail: {
          url,
          extras: {
            state,
          },
        },
      })
    );
  }

  /**
   * Dispatch location change event
   * @param baseHref target url for location change
   */
  public static dispatchLocationChange(baseHref?) {
    window.dispatchEvent(
      new CustomEvent<ICustomEventData>(CUSTOM_EVENTS.global.locationChange, {
        detail: {
          baseHref,
        },
      })
    );
  }
}
