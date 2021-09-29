// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Shared tagging service
import { Injectable } from '@angular/core';

import { TaggingService } from '../tagging-service/tagging.service';
import { ROUTER_CONSTANTS } from '../../constants/router.constant';
import {
  DEFAULT_LINK_SECTION_VALUE,
  EVENT_FLAG_VALUES,
  PAGE_ID_PREFIX,
  PAGE_NAME_PREFIX,
  SEARCH_RESULTS_LOADED,
  UPS_PAGE_DESCRIPTION_PREFIX,
} from '../../constants/global.constant';
import { SessionStorageUtility } from '../../utils/sessionStorage';
import CommonUtility from '../../utils/commonUtil';
import { AccessControlUtility } from '../../utils/access-control.util';
import { ACCOUNT_TYPE_CONSTANTS } from '../../constants/account-types.constant';
import {
  EVENT_DESC,
  GENERIC_EVENT_COUNTER,
} from '../../constants/analytics.constant';
import { SESSION_STORAGE_KEYS } from '../../constants/storage.constant';
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  urlTerms: string[] = [];
  constructor(private readonly taggingService: TaggingService) {}
  /**
   * gets CurrentUrl
   */
  getCurrentUrl() {
    return CommonUtility.sanitizeUrl(window.location.href);
  }
  /**
   * gets link page name
   */
  getLinkPageName(extras: any = {}) {
    let url = this.getCurrentUrl();
    if (url.indexOf('?') > 0) {
      url = url.substring(0, url.indexOf('?'));
    }
    if (url.includes(ROUTER_CONSTANTS.search)) {
      return PAGE_NAME_PREFIX + ROUTER_CONSTANTS.search;
    } else if (url.includes(ROUTER_CONSTANTS.account)) {
      return PAGE_NAME_PREFIX + ROUTER_CONSTANTS.account;
    } else if (url.includes(ROUTER_CONSTANTS.contact)) {
      return PAGE_NAME_PREFIX + ROUTER_CONSTANTS.contact;
    } else if (
      url.includes(ROUTER_CONSTANTS.warehouse) &&
      extras &&
      extras.warehouse_id
    ) {
      return `${PAGE_NAME_PREFIX}${ROUTER_CONSTANTS.gldPlatform}:${ROUTER_CONSTANTS.warehouse}:${extras.warehouse_id}`;
    } else {
      let linkPageName = PAGE_NAME_PREFIX;
      if (url.charAt(url.length - 1) === '/') {
        url = url.substring(0, url.length - 1);
      }
      url = url
        .substring(url.indexOf(ROUTER_CONSTANTS.gldPlatform))
        .split('/')
        .join(':');
      linkPageName += url;
      return linkPageName;
    }
  }
  /**
   * gets page description
   */
  getPageDescription(descSuffix = null) {
    let pageDesc = UPS_PAGE_DESCRIPTION_PREFIX;
    const pageSection = this.getPageSection();
    pageDesc += pageSection;
    if (
      pageSection?.toLowerCase() !== ROUTER_CONSTANTS.home &&
      pageSection?.toLowerCase() !== ROUTER_CONSTANTS.search &&
      pageSection?.toLowerCase() !== ROUTER_CONSTANTS.account
    ) {
      pageDesc += !descSuffix ? ' L' + this.urlTerms.length : ' ' + descSuffix;
    }
    return pageDesc;
  }

  /**
   * sets all the keys in session storage
   */
  setKeysInSessionStorage() {
    this.setEventDescForPageLoadTag();
    this.setProductLinesForPageLoadTag();
    this.setServiceLinesForPageLoadTag();
    this.setAccountType();
  }

  /**
   * gets page section
   */
  getPageSection() {
    let url = this.getCurrentUrl();
    let urlSplitterTerm = ROUTER_CONSTANTS.gldPlatform;
    if (
      url.includes(ROUTER_CONSTANTS.search) ||
      url.includes(ROUTER_CONSTANTS.account)
    ) {
      urlSplitterTerm = ROUTER_CONSTANTS.digitalPlatform;
    }
    url = url.substring(url.indexOf(urlSplitterTerm));
    this.urlTerms = url.split('/');
    const page = this.urlTerms[1];
    return page.replace(page.charAt(0), page.charAt(0)?.toUpperCase());
  }
  /**
   * gets account type
   */
  setAccountType(): void {
    let accountType = '';
    let accountList: string[] = AccessControlUtility.getAccountTypesList();
    accountList = accountList.map(
      (account) => ACCOUNT_TYPE_CONSTANTS.SHORTHAND_TO_FULL_NAME[account]
    );
    accountType = accountList.join(' | ');
    SessionStorageUtility.set(
      SESSION_STORAGE_KEYS.accountTypeForPageLoad,
      accountType
    );
  }

  /**
   * sets event_desc for page load tag
   */
  setEventDescForPageLoadTag(): void {
    let pageLoadEventDesc = '';
    if (AccessControlUtility.getAllSelectedCompanyDetails()?.length > 1) {
      pageLoadEventDesc += EVENT_DESC.multiple;
      pageLoadEventDesc += AccessControlUtility.getAllSelectedCompanyDetails()
        ?.length;
    } else {
      pageLoadEventDesc += EVENT_DESC.single;
    }
    SessionStorageUtility.set(
      SESSION_STORAGE_KEYS.pageLoadEventDesc,
      pageLoadEventDesc
    );
  }

  /**
   * sets product_lines for page load tag
   */
  setProductLinesForPageLoadTag(): void {
    let productLines = '';
    const productLinesArray: string[] = AccessControlUtility.getAllCompanyProductLineAccess();
    productLines = productLinesArray.join(' | ');
    SessionStorageUtility.set(
      SESSION_STORAGE_KEYS.productLineForPageLoad,
      productLines
    );
  }

  /**
   * sets service_lines for page load tag
   */
  setServiceLinesForPageLoadTag(): void {
    let serviceLines = '';
    const serviceLinesArray: string[] = AccessControlUtility.getAllCompanyServiceLineAccess();
    serviceLines = serviceLinesArray.join(' | ');
    SessionStorageUtility.set(
      SESSION_STORAGE_KEYS.serviceLineForPageLoad,
      serviceLines
    );
  }

  /**
   * creates page load tagging object
   */
  createPageLoadTagObject(pageId: string, object: any = {}) {
    const pageLoadEventDesc: string = SessionStorageUtility.get(
      SESSION_STORAGE_KEYS.pageLoadEventDesc
    );
    const productLines: string = SessionStorageUtility.get(
      SESSION_STORAGE_KEYS.productLineForPageLoad
    );
    const serviceLines: string = SessionStorageUtility.get(
      SESSION_STORAGE_KEYS.serviceLineForPageLoad
    );
    const accountTypes: string = SessionStorageUtility.get(
      SESSION_STORAGE_KEYS.accountTypeForPageLoad
    );
    const tagObj = {
      page_id: PAGE_ID_PREFIX + pageId,
      page_name: this.getLinkPageName(object),
      page_description: this.getPageDescription(),
      clean_URL: this.getCurrentUrl(),
      page_section: this.getPageSection(),
      URL: this.getCurrentUrl(),
      app_user_type: this.getAppUserType(),
      encrypted_company_id: this.getEncryptedCompanyId(),
      myups_login_state:
        SessionStorageUtility.getUserProfile == null ? 'guest' : 'logged in',
      account_type: accountTypes,
      event_desc: pageLoadEventDesc,
      event_flag: GENERIC_EVENT_COUNTER,
      product_lines: productLines,
      service_lines: serviceLines,
    };
    Object.assign(tagObj, object);
    this.taggingService.tagOnPageLoad(tagObj);
  }

  /**
   * creates tagging object for any general link click
   */
  createLinkClickTagObject(
    destinationUrl,
    linkName,
    eventDesc,
    linkType,
    extras: any = {}
  ) {
    const tagObj = {
      destination_url: destinationUrl,
      link_name:
        extras && extras.link_section
          ? `${linkName} | ${extras.link_section}`
          : `${linkName} | ${DEFAULT_LINK_SECTION_VALUE}`,
      link_page_name: this.getLinkPageName(extras),
      event_desc: eventDesc,
      link_type: linkType,
      encrypted_company_id: this.getEncryptedCompanyId(),
      event_flag:
        extras && extras.event_flag
          ? extras.event_flag
          : EVENT_FLAG_VALUES.generic_event_counter,
    };
    Object.assign(tagObj, extras);
    this.taggingService.tagOnGenericLinkClick(tagObj);
  }
  /**
   * creates tagging object for any modal Open/CLose
   */
  createModalOpenCloseTagObject(
    linkName,
    eventDesc,
    linkType,
    extras: any = {}
  ) {
    const tagObj = {
      link_name:
        extras && extras.link_section
          ? `${linkName} | ${extras.link_section}`
          : `${linkName} | ${DEFAULT_LINK_SECTION_VALUE}`,
      link_page_name: this.getLinkPageName(extras),
      event_desc: eventDesc,
      link_type: linkType,
      encrypted_company_id: this.getEncryptedCompanyId(),
      event_flag:
        extras && extras.event_flag
          ? extras.event_flag
          : EVENT_FLAG_VALUES.generic_event_counter,
    };
    Object.assign(tagObj, extras);
    this.taggingService.tagOnGenericLinkClick(tagObj);
  }
  /**
   * tag fires on search results loaded
   */
  createSearchResultsLoadTagObject(
    isNewPage: boolean,
    pageId: string,
    extras: any = {}
  ) {
    const tagObj = {
      page_id: PAGE_ID_PREFIX + pageId,
      page_name: this.getLinkPageName(extras),
      event_flag: EVENT_FLAG_VALUES.internal_site_search,
      event_desc: SEARCH_RESULTS_LOADED,
      link_page_name: this.getLinkPageName(extras),
      encrypted_company_id: this.getEncryptedCompanyId(),
      link_name: ROUTER_CONSTANTS.search.replace(
        ROUTER_CONSTANTS.search.charAt(0),
        ROUTER_CONSTANTS.search.charAt(0)?.toUpperCase()
      ),
    };
    Object.assign(tagObj, extras);
    isNewPage
      ? this.taggingService.tagOnPageLoad(tagObj)
      : this.taggingService.tagOnGenericLinkClick(tagObj);
  }

  /**
   * creates tagging object for any form
   */
  createFormTagObject(
    formName,
    linkName,
    eventDesc,
    linkType,
    extras: any = {}
  ) {
    const tagObj = {
      form_name: formName,
      link_name: linkName,
      link_page_name: this.getLinkPageName(extras),
      event_desc: eventDesc,
      link_type: linkType,
      encrypted_company_id: this.getEncryptedCompanyId(),
      event_flag:
        extras && extras.event_flag
          ? extras.event_flag
          : EVENT_FLAG_VALUES.generic_event_counter,
    };
    Object.assign(tagObj, extras);
    this.taggingService.tagOnGenericLinkClick(tagObj);
  }

  /**
   * returns user type value
   */
  getAppUserType() {
    const userProfile = SessionStorageUtility.getUserProfile();
    return userProfile?.userDetails?.userType;
  }

  /**
   * returns user type value
   */
  getEncryptedCompanyId() {
    // TODO:: requires update as per new contract in future (multiple value acceptance)
    return AccessControlUtility.getFirstSelectedCompanyDetails()?.eId;
  }
}
