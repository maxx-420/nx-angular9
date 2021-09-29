// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// common utility

import * as _moment from 'moment';
import { DecimalPipe } from '@angular/common';
import { NgZone, Renderer2 } from '@angular/core';

import {
  FILTER_CONFIGURATIONS,
  GOOGLE_MAP_CONFIG,
} from '../global-config/config';
import { API_ERROR_DESC_MAPPING } from '../constants/api-analytics-error-desc.constant';
import {
  DECIMAL_NUMBER_DEFAULT_FORMAT,
  DEFAULT_DATE_FORMAT,
  MilestoneStatus,
  US_LOCALE,
} from '../constants';

import { UserAgentUtility } from './user-agent.util';
import { SessionStorageUtility } from './sessionStorage';
import LocalStorageUtility from './localStorage';
import { default as loadMapsScript } from './loadMapsScript';
import { ROUTER_CONSTANTS } from './../constants';

// prettier-ignore
const moment = (_moment as any).default ? (_moment as any).default : _moment;

const CommonUtility = {
  compareMilestonesBasedOnOrder(a, b) {
    if (a.order < b.order) {
      return -1;
    } else if (a.order > b.order) {
      return 1;
    } else {
      return 0;
    }
  },

  /**
   * return top n values in the list based on count
   */
  getTopValuesBasedOnCount(
    serviceLevelSummary: Array<any>,
    topValueCount,
    countKey = 'count',
    order = 'asc'
  ) {
    serviceLevelSummary.sort((a, b) => b[countKey] - a[countKey]);
    serviceLevelSummary = serviceLevelSummary.slice(0, topValueCount);
    if (order === 'asc') {
      serviceLevelSummary.reverse();
    }
    return serviceLevelSummary;
  },

  /**
   * Fetches value of the key (nested keys joined with .) from the given ovject
   * @param data : Object from which the subset is to be fetched.
   * @param propertyPath : Nested keys, joined with . (single key can be passed directly)
   */
  getPropValueFromObj(data, propertyPath) {
    return data && propertyPath
      ? propertyPath.split('.').reduce((res, prop) => res[prop], data)
      : null;
  },

  /**
   * Checks host is of production or not
   */
  isProdEnv() {
    return this.getWindowLocationProperty('hostname') === 'scsapps.ups.com';
  },

  /**
   * Checks host is of upsdev/local or not
   */
  isDevEnv(): boolean {
    const hostname: string = this.getWindowLocationProperty('hostname');
    return hostname === 'scsappsdev.ups.com' || hostname === 'localhost';
  },

  /**
   * Detect changes on in case of IE
   */
  detectChanges(cdr) {
    // To refresh the view in IE
    if (cdr && UserAgentUtility.isIE()) {
      cdr.detectChanges();
    }
  },

  /**
   * Sanitizes url by removing last '/'
   */
  sanitizeUrl(url) {
    return url.endsWith('/') ? url.slice(0, -1) : url;
  },

  /**
   * returns filter label
   */
  getFilterLabel(value) {
    return FILTER_CONFIGURATIONS.dateFilterOptions.filter(
      (item) => item.value.toString() === value.toString()
    )[0].viewValue;
  },

  /**
   * returns Analytics Event desc for api failure
   */
  getApiAnalyticsErrorDesc(url: string) {
    for (const obj of API_ERROR_DESC_MAPPING) {
      if (
        obj.endPoint === url ||
        (obj.endPointRegex && url.match(obj.endPointRegex))
      ) {
        return obj.errorMessage;
      }
    }
    return null;
  },

  /**
   * check if milestone id has space in between words if yes then omits and returns without it.
   */
  removeSpace(milestones: any): any {
    if (typeof milestones === 'string') {
      if (milestones.indexOf(' ') !== -1) {
        milestones = milestones.split(' ').join('');
      }
    } else {
      milestones.forEach(
        (milestone) => (milestone.id = milestone.id.split(' ').join(''))
      );
    }
    return milestones;
  },

  /**
   * It accepts a number and returns a comma seperated string after every 3 digits
   * @param num number
   */
  numberWithCommas(num: number): string {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
  },

  /**
   *  returns scroll height for specific element requested
   */
  checkScrollHeight(instance): any {
    const element = { x: 0, y: 0 };
    let scrollY = window.scrollY;
    if (UserAgentUtility.isIE()) {
      scrollY = document.documentElement.scrollTop
        ? document.documentElement.scrollTop
        : 0;
    }
    element.y = scrollY + instance.getBoundingClientRect().top;
    element.x = instance.getBoundingClientRect().left;
    return element;
  },

  /**
   * rename object key
   * @param obj Object
   * @param oldKeyName old key name
   * @param newKeyName new key name
   */
  renameObjectKeys(obj, oldKeyName, newKeyName) {
    delete Object.assign(obj, { [newKeyName]: obj[oldKeyName] })[oldKeyName];
  },

  /**
   *  scroll to position method
   */
  scrollToWindow(instance): any {
    if (UserAgentUtility.isIE()) {
      window.scrollTo(instance.x, instance.y);
    } else {
      window.scroll({
        top: instance.y,
        left: instance.x,
        behavior: 'smooth',
      });
    }
  },

  /**
   * Clears data stored in Session and Local storage
   */
  clearUserProfile(clearAll = false): any {
    SessionStorageUtility.clearUserProfile(clearAll);
    LocalStorageUtility.clearUserProfile();
  },

  unicodeToChar(text) {
    if (text && typeof text === 'string') {
      return text.replace(/\\u[\dA-F]{4}/gi, (match) =>
        String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
      );
    }

    return text;
  },

  /**
   * Deep comparison and check if equal
   */
  deepEqual(oldObj: any, newObj: any) {
    return JSON.stringify(oldObj) === JSON.stringify(newObj);
  },

  /**
   * Deep cloning an object
   */
  deepClone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * load maps scripts
   */
  async loadMapScript() {
    return loadMapsScript(
      SessionStorageUtility.getConfigKeys(GOOGLE_MAP_CONFIG.googleMapsUrl) +
        SessionStorageUtility.getConfigKeys(GOOGLE_MAP_CONFIG.googleMapsApiKey)
    ).then((res: any) => {
      return res.loaded;
    });
  },

  /**
   * Check if banner is visible
   */
  isBannerVisible() {
    return document
      .querySelector('.main-container')
      ?.classList?.contains('header-banner-visible');
  },

  /**
   * method to get window location child property
   */
  getWindowLocationProperty(key?: string): any {
    if (window && window.location) {
      if (key) {
        return window.location[key];
      } else {
        return window.location;
      }
    }
    return null;
  },

  /**
   * Checks if every value in an object is truthy
   */
  checkIfValuesInObjectAreTrue(obj) {
    return Object.keys(obj).every((i) => (obj[i] ? true : false));
  },

  /**
   * method to get modal title date from selectedCountFilters
   */
  getModalTitleDateRange(selectedCountFilters) {
    const startDate = moment(selectedCountFilters.startDate).format(
      DEFAULT_DATE_FORMAT
    );
    const endDate = moment(selectedCountFilters.endDate).format(
      DEFAULT_DATE_FORMAT
    );
    return ` - From ${startDate} to ${endDate}`;
  },

  /**
   * Returns the module name like account, admin, inbound, outbound
   * @param pathname : window.location.pathname
   */
  getModuleFromLocationPath(pathname) {
    let moduleName = '';

    // pathname empty return empty string
    if (!pathname) {
      return moduleName;
    } else {
      const pathParts = pathname.split('/');

      // To findout Modules like inbound, outbound, shipments
      // /scs/symphony/<MODULE_APP_NAME>, in this path module exists on 4th postion
      if (pathname.indexOf(ROUTER_CONSTANTS.gldPlatform) !== -1) {
        moduleName = pathParts[3];
      }
      // To findout Modules like account, admin, etc
      // /scs/<MODULE_APP_NAME>, in this path module exists on 3rd postion
      else {
        moduleName = pathParts[2];
      }

      return moduleName;
    }
  },
  /**
   * method to find difference percentage of average cost. Formulae: ((A-B)/B)*100
   * @param value1 first value - A
   * @param value2 second value -B
   */
  calculatePercentage(value1: string, value2: string): string {
    let percentStr: string = null;
    const numValue1: number = Number(value1);
    const numValue2: number = Number(value2);
    if (
      value1 &&
      value2 &&
      !isNaN(numValue1) &&
      !isNaN(numValue2) &&
      numValue2 !== 0
    ) {
      const percent: number = ((numValue1 - numValue2) / numValue2) * 100;
      percentStr = percent.toString();
    }
    return percentStr;
  },
  /**
   * method to find difference percentage of average cost and format string as percentage value. Formulae: ((A-B)/B)*100
   * @param value1 first value - A
   * @param value2 second value -B
   * @param digitsInfo number pipe digitsInfo. Default = '1.0-0'
   */
  getDifferentialPercentageFormattedString(
    value1: string,
    value2: string,
    digitsInfo: string = '1.0-0'
  ): string {
    const numberPipe = new DecimalPipe('en-US');
    let percentStr: string = this.calculatePercentage(value1, value2);
    if (percentStr) {
      const percent = numberPipe.transform(percentStr, digitsInfo);
      let prefix = '';
      if (Number(percent) > 0) {
        prefix = '+';
      }
      percentStr = prefix + percent + '%';
    }
    return percentStr;
  },

  /**
   * method to convert a number to US Formatted number.
   * @param value1 first value - A
   * @param digitsInfo number pipe digitsInfo. Default = '1.2-2'
   * @param locale locale. Default = 'en-US'
   */
  getFormattedCostString(
    value: string,
    digitsInfo = DECIMAL_NUMBER_DEFAULT_FORMAT,
    locale = US_LOCALE
  ): string {
    const numberPipe = new DecimalPipe(locale);
    return numberPipe.transform(value, digitsInfo);
  },

  /**
   * method to convert a comma separated number to number.
   * @param value comma separated number
   * @param separator separator. Default: ','
   */
  removeComma(value: string, separator: string = ','): string {
    return value?.replace(new RegExp(separator, 'g'), '');
  },

  /**
   * Returns getBlueBarDate for  inbound, outbound
   * @param shipmentSchedule : shipmentScheduleData
   */
  getBlueBarDate(shipmentSchedule) {
    const dateObj = {
      deliveredDate: '',
      deliveryETA: '',
    };

    if (shipmentSchedule?.actualDeliveryDateTime) {
      dateObj.deliveredDate = shipmentSchedule.actualDeliveryDateTime;
    } else if (shipmentSchedule?.shipmentEstimatedDateTime) {
      dateObj.deliveryETA = shipmentSchedule.shipmentEstimatedDateTime;
    }
    return dateObj;
  },

  /**
   * get Milestone Label, if name is not present
   */
  getMilestoneLabel(milestoneId: string): string {
    const keys = Object.keys(MilestoneStatus);
    for (const milestone of keys) {
      const updatedMilestoneId = this.removeSpace(milestoneId).toLowerCase();
      if (milestone.toLowerCase() === updatedMilestoneId) {
        return MilestoneStatus[milestone];
      }
    }
    return milestoneId;
  },

  /**
   * modified list to the format in which lib-select component
   * accepts the input
   */
  modifyListToLibSelectInputFormat(listing: string[]): any {
    const modifiedListing = [];
    listing?.map((ele) => {
      modifiedListing.push({
        value: ele,
        viewValue: ele,
      });
    });
    return modifiedListing;
  },
  /**
   * To modify some styling because of header banner in the outer containers like gld-container, container-fluid
   */
  updateStylingForHeaderBanner(): boolean {
    let isBannerVisible = false;
    if (
      document
        .querySelector('.main-container')
        ?.classList?.contains('header-banner-visible')
    ) {
      isBannerVisible = true;
    }
    return isBannerVisible;
  },

  /**
   * To shift focus on a particular component after overlay is opened/closed
   * @param zone: NgZone
   * @param renderer: Renderer2
   * @param selector: component to be focused
   */
  focusComponent(
    zone: NgZone,
    renderer: Renderer2,
    selector: Element | string
  ): void {
    zone.runOutsideAngular((): void => {
      setTimeout((): void => {
        try {
          renderer.selectRootElement(selector, true)?.focus();
        } catch (error) {}
      }, 100);
    });
  },

  /**
   * Add removeScroll class if panel is closed and remove removeScroll class if panel is opened
   * @param renderer: Renderer2
   * @param isPanelOpen: flag if panel is open or not
   */
  addRemoveScrollClassFromPanel(
    renderer: Renderer2,
    isPanelOpen: boolean
  ): void {
    if (!isPanelOpen) {
      renderer.addClass(document.body, 'removeScroll');
    } else {
      renderer.removeClass(document.body, 'removeScroll');
    }
  },

  /**
   * check if any widget is visible
   * @param val selector panel config array
   */
  checkIfAnyWidgetIsVisible(val: any[]): boolean {
    return val.some((item: any) => item.isDisplay);
  },
};
export default CommonUtility;
