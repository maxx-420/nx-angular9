// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// common http interceptor

import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HTTP_STATUS_CODES } from '../../constants';
import { RenderLabelPipe } from '../../pipe/render-label/render-label.pipe';
import { SessionService } from '../../service/session-service/session.service';
import { AnalyticsService } from '../../service/analytics-wrapper/analytics.service';
import { CommonUtility, SessionStorageUtility } from '../../utils/';

import NavigationUtility from './../../utils/navigationUtil';
import {
  API_HEADER_KEYS,
  HTTP_GET_METHOD,
  ROUTE_STATES,
} from './../../constants/global.constant';
import LocalStorageUtility from './../../utils/localStorage';
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private readonly _contentPipe: RenderLabelPipe,
    private readonly sessionModalService: SessionService,
    private readonly analyticsService: AnalyticsService
  ) {}
  /**
   * Interceptor for HTTP requests
   * @param HttpRequest request The request object
   * @param HttpHandler next The http handler object
   * @returns Desired HttpEvent observable
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isScriptJSON = request.headers.get('isScriptJSON') === 'true';

    let req;

    if (isScriptJSON) {
      req = request.clone({
        url: request.url,
      });
    } else {
      req = request.clone({
        url: request.url,
        setHeaders: this.setHeaders(request),
      });
    }
    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            // console.log("Global Erro Handling", event.body.validationResult);
            // if (event.status === 200) {
            // if (event.body.isValid === false) {
            // show api error modal - normal modal with static error message
            // } else {
            // form validation scenario - read validationResult object in error response
            // }
            // } else if (event.status === 401) {
            // auth error - redirect to login page
            // }

            // Store X-SCS-XSRF-TOKEN in local storage received in Response Headers
            /* istanbul ignore else */
            if (
              event.headers &&
              event.headers.get(API_HEADER_KEYS.X_XSRF_TOKEN)
            ) {
              LocalStorageUtility.set(
                API_HEADER_KEYS.X_XSRF_TOKEN,
                event.headers.get(API_HEADER_KEYS.X_XSRF_TOKEN)
              );
            }
          }
        },
        (error) => {
          const err = {
            message: this._contentPipe.transform('unknown_error'),
            status: error.status,
            description: error.message,
          };

          if (error instanceof HttpErrorResponse) {
            if (error.status === HTTP_STATUS_CODES.INTEGRATION_API_FAILURE) {
              err.message = this._contentPipe.transform(
                'integration_api_failure'
              );
            } else if (
              error.status === HTTP_STATUS_CODES.INTERNAL_API_FAILURE
            ) {
              err.message = this._contentPipe.transform('internal_api_failure');
            } else if (
              error.status === HTTP_STATUS_CODES.INPUT_VALIDATION_FAILURE
            ) {
              err.message = this._contentPipe.transform(
                'request_input_validation_failure'
              );
            } else if (error.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
              window.dispatchEvent(
                new CustomEvent(`crossapp:routechanged`, {
                  detail: {
                    url: ROUTE_STATES.noaccess,
                  },
                })
              );
            } else if (error.status === HTTP_STATUS_CODES.UNAUTHENTICATED) {
              this.sessionModalService.openInvalidSessionModal();
            } else if (error.status === HTTP_STATUS_CODES.CONFLICT) {
              NavigationUtility.redirectToLogin();
            }
            const url = new URL(CommonUtility.sanitizeUrl(error.url));
            const errorEventDesc = CommonUtility.getApiAnalyticsErrorDesc(
              url.pathname
            );
            if (
              url.pathname.startsWith('/api') &&
              request.method === HTTP_GET_METHOD &&
              errorEventDesc
            ) {
              // Track only api failures
              this.analyticsService.createLinkClickTagObject(
                '#',
                'Load Error',
                errorEventDesc,
                'Internal'
              );
            }
          }

          // TODO: process error
        }
      ),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  /**
   * setHeaders
   * @param request request
   */
  setHeaders(request: HttpRequest<unknown>) {
    const headers = request.headers.keys().reduce((res, val) => {
      res[val] = request.headers.get(val);
      return res;
    }, {});
    let xsrfToken = '';
    const allCookies = document.cookie;
    const allCookiesSplit = allCookies.split(';');
    // tslint:disable-next-line: variable-name
    const xsrf_cookie = allCookiesSplit.find((ele) => {
      return ele.indexOf('SCS-XSRF-TOKEN') >= 0;
    });
    /* istanbul ignore else */
    if (xsrf_cookie) {
      xsrfToken = xsrf_cookie.split('=')[1];
    } else {
      const storedXsrfToken = LocalStorageUtility.get(
        API_HEADER_KEYS.X_XSRF_TOKEN
      );
      if (storedXsrfToken && storedXsrfToken != null) {
        xsrfToken = storedXsrfToken;
      }
    }
    // NOTE: when content API ready, these headers are required
    // if (request.url == apiEndpoints.api.postfix.getContentLabels) {
    // headers['X-Content-Type-Options'] = "nosniff";
    // headers['X-Frame-Options'] = "Deny";
    // headers['X-XSS-Protection'] = "1; mode=block";
    // }

    /* istanbul ignore else */
    if (request.url.indexOf('googleapis') === -1) {
      /* istanbul ignore else */
      if (xsrfToken) {
        headers[API_HEADER_KEYS.X_XSRF_TOKEN] = xsrfToken;
      }

      const eUserId = SessionStorageUtility.getUserProfile()?.userDetails
        ?.eUserId;

      /* istanbul ignore else */
      if (!request.url.endsWith('/api/scsaccount/v1.0/user') && eUserId) {
        headers[API_HEADER_KEYS.X_SCS_EUSER] = eUserId;
      }
    }
    return headers;
  }
}
