// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { ROUTE_STATES } from '../constants';
import { CUSTOM_EVENTS } from '../constants/custom-events-constant';
import {CustomEventDispatcher} from './customEventDispatcher';

describe('customEventDispatcher', () => {
  it('should test dispatchInternalNavigation', () => {
    const data = {
      detail: {
        url: ROUTE_STATES.noaccess,
        extras: {state: {showLeftNav: true}},
      },
    };
    const spy = spyOn(window, 'dispatchEvent');
    CustomEventDispatcher.dispatchInternalNavigation(ROUTE_STATES.noaccess, {showLeftNav: true} );
    const dummyEvent = new CustomEvent(CUSTOM_EVENTS.internalApp.routeChange, data);
    expect(spy).toHaveBeenCalledWith(dummyEvent);
  });

  it('should test dispatchLocationChange', () => {
    const data = {
      detail: {
        baseHref: ''
      },
    };
    const spy = spyOn(window, 'dispatchEvent');
    CustomEventDispatcher.dispatchLocationChange();
    const dummyEvent = new CustomEvent(CUSTOM_EVENTS.global.locationChange, data);
    expect(spy).toHaveBeenCalledWith(dummyEvent);
  });
});
