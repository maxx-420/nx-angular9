// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { default as CommonUtility } from '../../utils/commonUtil';
import { default as InclusionUtility } from '../../utils/inclusion/inclusion-util';

import { default as ViewportUtility } from './../../utils/viewport';

@Injectable({
  providedIn: 'platform',
})
export class PlatformService {
  orientationChange$ = new EventEmitter<string>();
  public isBannerVisible$ = new BehaviorSubject<boolean>(false);
  public getProfileInfo$: BehaviorSubject<any> = new BehaviorSubject(null);
  public componentInclusions$: BehaviorSubject<any> = new BehaviorSubject(null);
  public getConfigurationData$: BehaviorSubject<any> = new BehaviorSubject(
    null
  );
  public totalShipmentList$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    if ('onorientationchange' in window) {
      this.addOrientationChangeListener();
    }
  }

  /**
   * on account toggle this function is called with userProfile object
   */
  setProfileInfo(value) {
    this.getProfileInfo$.next(value);
  }

  /**
   * On orientation change return viewport
   * @param event : browser event object
   */
  addOrientationChangeListener() {
    window.addEventListener('orientationchange', (event: any) => {
      // (!event.origin.endsWith('.ups.com') ||

      // /.ups.com$/.test(event.origin) ||

      // event.origin === 'https://scsappsqa.ups.com' ||
      // event.origin === 'https://scsappsdev.ups.com' ||
      // event.origin === 'https://scsappsuat.ups.com'
      if (
        event?.origin &&
        CommonUtility.isProdEnv() &&
        (!/.ups.com$/.test(event.origin) ||
          !(
            event.origin === 'https://scsappsqa.ups.com' ||
            event.origin === 'https://scsappsdev.ups.com' ||
            event.origin === 'https://scsappsuat.ups.com'
          ))
      ) {
        return;
      }
      setTimeout(() => {
        this.orientationChange$.emit(ViewportUtility.getCurrentViewport());
      });
    });
  }

  /**
   * function to set bannervisible or not
   */
  setBannerVisible(value) {
    this.isBannerVisible$.next(value);
  }

  /**
   * Function to set Configuration API response data
   * @param value Service Name List values object
   */
  setConfigurationData(value) {
    this.getConfigurationData$.next(value);
  }

  /**
   * on getting new inclusions let other know about it
   */
  notifyInclusionUpdates() {
    this.componentInclusions$.next(InclusionUtility.getInclusions());
  }

  /**
   * method to set shipment list from L2
   * @param lists - shipment lists from l2 which on click navigates to l3
   */
  setShipmentList(lists: any): void {
    this.totalShipmentList$.next(lists);
  }

  /**
   * method to clear already stored shipment list.
   */
  clearShipmentList(): void {
    this.totalShipmentList$.next(null);
  }
}
