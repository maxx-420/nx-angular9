// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
//

import { Inject, Injectable, StaticProvider } from '@angular/core';
import {
  APP_BASE_HREF,
  LocationChangeEvent,
  LocationStrategy,
  PathLocationStrategy,
  PlatformLocation,
} from '@angular/common';

import { CustomEventDispatcher } from '../../utils';

@Injectable()
export class DigitalAppLocationStrategy extends PathLocationStrategy {
  /**
   * overide onPopState method
   * @param fn function
   */

  pushState(state: any, title: string, url: string, queryParams: string) {
    super.pushState(state, title, url, queryParams);
    const basePath = super.getBaseHref();
    CustomEventDispatcher.dispatchLocationChange(basePath);
  }

  /**
   * onPopState
   */
  onPopState(fn: (event: LocationChangeEvent) => void): void {
    const onPopStateListener = (event: LocationChangeEvent) => {
      const basePath = super.getBaseHref();
      // event have array of path and we only need 0 index of it
      if ((event as any).target.location.pathname.indexOf(basePath) === 0) {
        CustomEventDispatcher.dispatchLocationChange(basePath);
        fn(event);
      }
    };
    super.onPopState(onPopStateListener);
  }
}

/**
 * The `PlatformLocation` class is an "injectee" of the `PathLocationStrategy`,
 * which creates `Subject` internally for listening on `popstate` events. We want
 * to provide this class in the most top injector that's used during bootstrapping.
 */
export function getCoreLocationStrategyProviders(): StaticProvider[] {
  return [
    {
      provide: DigitalAppLocationStrategy,
      useClass: DigitalAppLocationStrategy,
      deps: [[PlatformLocation], [new Inject(APP_BASE_HREF)]],
    },
    {
      provide: LocationStrategy,
      useExisting: DigitalAppLocationStrategy,
    },
  ];
}
