// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// core tagging service
/* tslint:disable */
import { Injectable } from '@angular/core';
import { UtagData } from '../../model/utagdata.model';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class TaggingService {
  constructor() {
    window.additionalTagProperties = window.additionalTagProperties
      ? window.additionalTagProperties
      : {};
  }

  /**
   * sets AdditionalTagProperties
   */
  setAdditionalTagProperties(additionalTagProperties) {
    window.additionalTagProperties = additionalTagProperties;
  }

  /**
   * tag fires on page load
   * resets all the prepopulated fields of UtagData object
   */
  tagOnPageLoad(utag) {
    for (const key in window.additionalTagProperties) {
      if (window.additionalTagProperties.hasOwnProperty(key)) {
        delete window['utag_data'][key];
      }
    }
    this.viewUtagData(utag);
  }

  /**
   * tag fires on generic link click
   * resets all the prepopulated fields of UtagData object
   */
  tagOnGenericLinkClick(utag) {
    for (const key in window.additionalTagProperties) {
      if (window.additionalTagProperties.hasOwnProperty(key)) {
        delete window['utag_data'][key];
      }
    }
    this.linkUtagData(utag);
  }

  /**
   * assigns the value of UtagData object to window's utag_data
   */
  linkUtagData(utag: object) {
    const utag_data = new UtagData().deserialize(utag);
    if (window['utag_data']) {
      Object.assign(window['utag_data'], utag_data);
    } else {
      window['utag_data'] = utag_data;
    }
    if (window['utag']) {
      window['utag'].link(window['utag_data']);
      this.setAdditionalTagProperties(utag);
    }
  }

  /**
   * assigns the value of UtagData object to window's utag_data
   */
  viewUtagData(utag: object) {
    const utag_data = new UtagData().deserialize(utag);
    if (window['utag_data']) {
      Object.assign(window['utag_data'], utag_data);
    } else {
      window['utag_data'] = utag_data;
    }
    if (window['utag']) {
      window['utag'].view(window['utag_data']);
      this.setAdditionalTagProperties(utag);
    }
  }
}
