// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Navigation util
import { MsalService } from '@azure/msal-angular';

import { LASSO_URLS } from './../global-config/config';
import { environments, MSAL_CONFIG } from './../msal/msal-config';
import { ROUTER_CONSTANTS } from './../constants/router.constant';
import { CustomEventDispatcher } from './customEventDispatcher';
import { USER_AUTH_TYPE } from './../constants/account-types.constant';
import CommonUtility from './commonUtil';
import { UserAgentUtility } from './user-agent.util';

const NavigationUtility = {
  /**
   * method to navigate into the same app and cross apps
   * @param router router object
   * @path url route path
   * @param isCrossAppNavigation it will be true in case of cross navigation
   * @param state any state object that needs to be passed
   * @param replaceUrl When true, navigates without pushing a new state into history.
   * @param passDataInHistory when true, allows state to be added to navigation extras
   */
  navigate(
    router,
    url,
    isCrossAppNavigation,
    state = {},
    replaceUrl = false,
    passDataInHistory = false
  ) {
    if (!isCrossAppNavigation) {
      // If it is required to pass an object during navigation, send passDataInHistory as true, TempFix
      if (passDataInHistory) {
        router?.navigate(url, { state: { ...state }, replaceUrl });
      } else {
        if (url[0].includes('?')) {
          router?.navigateByUrl(url[0], { ...state, replaceUrl });
        } else {
          router?.navigate(url, { ...state, replaceUrl });
        }
      }
    } else {
      if (UserAgentUtility.isIE()) {
        // TBD: UPSGLD-9109 IE | Getting "No Access Page" on hitting application url
        setTimeout(() => {
          this.crossAppRouteChanged(url, state);
        });
      } else {
        this.crossAppRouteChanged(url, state);
      }
    }
  },
  /**
   * crossApp navigation
   */
  crossAppRouteChanged(url, state) {
    window.dispatchEvent(
      new CustomEvent(`crossapp:routechanged`, {
        detail: {
          url,
          extras: {
            state,
          },
        },
      })
    );
  },
  /**
   * Checks if shipment Details page
   * @param url: URL on user has navigated
   */
  checkIfShipmentDetailsPage(url) {
    return url.indexOf(ROUTER_CONSTANTS.details) !== -1;
  },

  /**
   * Scroll to top on navigation change
   *
   * @param currentAppName: Application name where from this method has been called.
   * @param url: URL on user has navigated
   */
  scrollToTop(currentAppName, url) {
    if (url && currentAppName) {
      // Check for digital platform routes
      if (currentAppName === ROUTER_CONSTANTS.digitalPlatform) {
        if (
          url.indexOf(ROUTER_CONSTANTS.search) !== -1 ||
          url.indexOf(ROUTER_CONSTANTS.itemDetails) !== -1 ||
          url.indexOf(ROUTER_CONSTANTS.admin) !== -1 ||
          url.indexOf(ROUTER_CONSTANTS.account) !== -1
        ) {
          window.scrollTo(0, 0);
        }
      }
      // Check for digital platform routes
      else if (
        currentAppName === ROUTER_CONSTANTS.gldPlatform &&
        url.indexOf(ROUTER_CONSTANTS.home) !== -1
      ) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 0);
      }
    }
  },

  redirectToLASSOLogout() {
    const currentUrl = CommonUtility.getWindowLocationProperty();
    const uriToEncode = currentUrl.href.includes(ROUTER_CONSTANTS.noaccess)
      ? `${currentUrl.protocol}//${currentUrl.host}/${ROUTER_CONSTANTS.digitalPlatform}`
      : currentUrl.href;
    this.setWindowLocation(
      this.sanitizeUrl(
        `${LASSO_URLS.logout}?loc=en_US&returnto=${encodeURIComponent(
          uriToEncode
        )}`
      )
    );
  },

  redirectToLASSOLogin(returnToUrl = null) {
    if (returnToUrl) {
      this.setWindowLocation(
        this.sanitizeUrl(
          `${LASSO_URLS.login}?loc=en_US&returnto=${encodeURIComponent(
            returnToUrl
          )}`
        )
      );
    } else {
      // if user lands on noaccess page and then logs in, redirect user to dashboard
      const currentUrl = CommonUtility.getWindowLocationProperty();
      const uriToEncode = currentUrl.href.includes(ROUTER_CONSTANTS.noaccess)
        ? `${currentUrl.protocol}//${currentUrl.host}/${ROUTER_CONSTANTS.digitalPlatform}`
        : currentUrl.href;
      this.setWindowLocation(
        this.sanitizeUrl(
          `${LASSO_URLS.login}?loc=en_US&returnto=${encodeURIComponent(
            uriToEncode
          )}`
        )
      );
    }
  },

  // redirects the user to ucp application
  redirectToUCP() {
    this.setWindowLocation(
      this.sanitizeUrl(
        `${location.protocol}//${location.host}/${ROUTER_CONSTANTS.digitalPlatform}/${ROUTER_CONSTANTS.ucp}`
      )
    );
  },

  navigateToShipmentId(router, shipmentId, queryParams?) {
    router
      .navigate([`/${ROUTER_CONSTANTS.details}/${shipmentId}`], {
        state: this.activeRouteExtras?.state,
        queryParams,
        replaceUrl: true,
      })
      .then(() => {
        CustomEventDispatcher.dispatchLocationChange();
      });
  },

  /**
   * @description redirect to login landing page
   * https://stackoverflow.com/questions/58122530/how-to-get-parameter-from-navigatebyurl
   * https://github.com/angular/angular/issues/18798
   */
  redirectToLogin() {
    const env = environments.get(
      CommonUtility.getWindowLocationProperty('hostname').split('.')[0]
    );
    if (MSAL_CONFIG[env].landingPageFeatureFlag) {
      // get query params
      const url = `/${ROUTER_CONSTANTS.login}?returnto=${encodeURIComponent(
        this.getLoginReturnTo()
      )}`;
      // on invalid session modal, when user hits login, url changes to 404. So using crossapp navigation for correct navigation.
      this.navigate(null, url, true);
    } else {
      this.redirectToLASSOLogin();
    }
  },

  /**
   * set returnto query param in login url
   */
  getLoginReturnTo() {
    const params = this.getQueryParams();

    if (params && params.returnto) {
      return params.returnto;
    }
    const currentUrl = CommonUtility.getWindowLocationProperty();
    return currentUrl.href.includes(ROUTER_CONSTANTS.noaccess) ||
      currentUrl.href.includes(ROUTER_CONSTANTS.login)
      ? `${currentUrl.protocol}//${currentUrl.host}/${ROUTER_CONSTANTS.digitalPlatform}`
      : currentUrl.href;
  },

  /**
   * logout
   */
  logout(msalService: MsalService, authType: string) {
    // clear lasso user data in local and session storage
    CommonUtility.clearUserProfile(true);
    // check if user is b2c customer, or if authType is null by any chance, check if msalInstance has any logged in account
    if (
      authType === USER_AUTH_TYPE.B2CCustomer ||
      msalService?.instance.getAllAccounts().length
    ) {
      msalService.logoutRedirect({
        postLogoutRedirectUri: window.location.href,
      });
    } else {
      this.redirectToLASSOLogout();
    }
  },

  /**
   * @description returns query params in the current url
   * @returns query params
   */
  getQueryParams() {
    let queryParams: { [key: string]: string } = {};
    let _queryParamsInURL: any = window.location.search.replace('?', '');

    if (_queryParamsInURL) {
      _queryParamsInURL = _queryParamsInURL.split('&');

      for (const queryParam of _queryParamsInURL) {
        const queryParamToAdd = {};
        const queryParamKeyValuePair = queryParam.split('=', 2);
        queryParamToAdd[queryParamKeyValuePair[0]] = decodeURIComponent(
          queryParamKeyValuePair[1]
        );
        queryParams = { ...queryParams, ...queryParamToAdd };
      }
    }

    return !queryParams ? null : queryParams;
  },

  /**
   * Sanitize url to prevent open redirects
   */
  sanitizeUrl(url: string) {
    const urlSplit = url.split('?');
    if (
      (urlSplit.length === 1 && urlSplit[0].includes('.ups.com')) ||
      (urlSplit.length === 2 &&
        urlSplit[0].includes('.ups.com') &&
        urlSplit[1]
          .split('&')
          .find((param) => param.split('=')[0] === 'returnto')
          .split('=')[1]
          .includes('.ups.com'))
    ) {
      return url;
    }
    return null;
  },

  /**
   * Check if pathname is of symphony or not
   */
  isNotSymphonyUrl(pathName: string) {
    return (
      !pathName.includes(
        `${ROUTER_CONSTANTS.digitalPlatform}/${ROUTER_CONSTANTS.gldPlatform}`
      ) && pathName.split('/').join('') !== ROUTER_CONSTANTS.digitalPlatform
    );
  },

  /**
   * setting up the window location href to the passed url
   * @param url url to be set
   */
  setWindowLocation(url: string) {
    location.href = url;
  },
};

export default NavigationUtility;
