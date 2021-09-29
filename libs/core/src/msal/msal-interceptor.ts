// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationResult } from '@azure/msal-browser';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

import { API_HEADER_KEYS } from '../constants/global.constant';
import { CommonUtility } from '../utils';

import { environments, MSAL_CONFIG } from './msal-config';

@Injectable()
export class MsalInterceptor implements HttpInterceptor {
  constructor(private msalService: MsalService) {}

  /**
   * Interceptor for HTTP requests
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isScriptJSON = req.headers.get('isScriptJSON') === 'true';
    const isContentJSON = req.headers.get('isContentJSON') === 'true';
    const env = environments.get(
      CommonUtility.getWindowLocationProperty('hostname').split('.')[0]
    );
    if (
      !MSAL_CONFIG[env].landingPageFeatureFlag ||
      isScriptJSON ||
      isContentJSON
    ) {
      return next.handle(req);
    }
    const activeAccounts = this.msalService?.instance.getAllAccounts();
    // If no accounts, then dont add token
    if (!activeAccounts || activeAccounts.length === 0) {
      return next.handle(req);
    }

    // Active account becomes inactive after refresh, so cant depend on getActiveAccount().
    // getAllAccounts returns the account even after refresh. So setting account as first element of getAllAccounts()
    const account = activeAccounts[0];
    return this.msalService
      .acquireTokenSilent({ scopes: MSAL_CONFIG[env].resourceScopes, account })
      .pipe(
        switchMap((result: AuthenticationResult) => {
          const headers = req.headers.set(
            API_HEADER_KEYS.Authorization,
            `Bearer ${result.accessToken}`
          );
          const requestClone = req.clone({ headers });
          return next.handle(requestClone);
        })
      );
  }
}
