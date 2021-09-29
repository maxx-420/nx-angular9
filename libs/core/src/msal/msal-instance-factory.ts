// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import {
  BrowserCacheLocation,
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';

import { CommonUtility, UserAgentUtility } from '../utils';

import { environments, MSAL_CONFIG } from './msal-config';

/**
 * Here we pass the configuration parameters to create an MSAL instance.
 * For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
 */

export function MSALInstanceFactory(): IPublicClientApplication {
  const env: string = environments.get(
    CommonUtility.getWindowLocationProperty('hostname').split('.')[0]
  );
  return new PublicClientApplication({
    auth: {
      clientId: MSAL_CONFIG[env].clientId,
      authority: MSAL_CONFIG[env].authorityUrl,
      redirectUri: MSAL_CONFIG[env].redirectUri,
      knownAuthorities: MSAL_CONFIG[env].authorityDomain,
      navigateToLoginRequestUrl: false,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: UserAgentUtility.isIE(), // set to true for IE 11
    },
  });
}
