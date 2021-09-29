// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// SubNav Utility

import { AnalyticsService } from '../service/analytics-wrapper/analytics.service';

import { ROUTER_CONSTANTS } from './../constants/router.constant';
import NavigationUtility from './navigationUtil';

const GLOBAL_HEADER = 'Global Header';
const INTERNAL = 'Internal';

const SubNavUtility = {
  /**
   * myAccountClick method
   */
  myAccountClick(analyticsService) {
    const accountUrl = `${ROUTER_CONSTANTS.account}`;
    this.trackMyAccountClick(accountUrl, 'My Account', analyticsService);
    NavigationUtility.navigate(null, accountUrl, true);
  },

  /**
   * contact us link clicked method
   */
  contactUsClick(analyticsService) {
    const contactUrl = `${ROUTER_CONSTANTS.contact}`;
    this.trackMyAccountClick(contactUrl, 'Contact Us', analyticsService);
    NavigationUtility.navigate(null, contactUrl, true);
  },

  /**
   * logOutAction method
   */
  logOutClick(analyticsService) {
    this.trackSignOutClick(
      '/api/scsaccount/v1.0/account/Logout',
      analyticsService
    );
  },

  /**
   * track fires on My account header click
   */
  trackMyAccountClick(
    url: string,
    linkDescription: string,
    analyticsService?: AnalyticsService
  ) {
    analyticsService.createLinkClickTagObject(
      url,
      linkDescription,
      `${linkDescription} | ${GLOBAL_HEADER}`,
      `${INTERNAL}`,
      { link_section: GLOBAL_HEADER }
    );
  },
  /**
   * track fires on Sign out header click
   */
  trackSignOutClick(url: string, analyticsService?: AnalyticsService) {
    analyticsService.createLinkClickTagObject(
      url,
      'Log Out',
      `Log Out | ${GLOBAL_HEADER}`,
      `${INTERNAL}`,
      { link_section: GLOBAL_HEADER }
    );
  },

  /**
   * Click handler for admin sub menu
   * @param analyticsService: analytice service object
   */
  adminClick(analyticsService) {
    const adminUrl = `${ROUTER_CONSTANTS.admin}`;
    this.trackAdminClick(adminUrl, analyticsService);
    NavigationUtility.navigate(null, adminUrl, true);
  },

  /**
   * track fires on My account header click
   */
  trackAdminClick(url: string, analyticsService?: AnalyticsService) {
    analyticsService.createLinkClickTagObject(
      url,
      'Admin',
      `Admin | ${GLOBAL_HEADER}`,
      `${INTERNAL}`,
      { link_section: GLOBAL_HEADER }
    );
  },
};

export default SubNavUtility;
