// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Naviagtion service to navigate with query parameters

import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { CommonUtility } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public constructor(private readonly injector: Injector) {}

  /**
   * Navigates user to specified url
   *
   * @param route : URL to navigate
   * @param queryParams : Query parameters to update
   * @param replaceUrl : replace url
   */
  public navigateWithQueryParams(
    route: string,
    queryParams: any,
    replaceUrl = false
  ): void {
    let navigationExtras = {};

    navigationExtras = queryParams
      ? { queryParams, queryParamsHandling: 'merge', replaceUrl }
      : { queryParamsHandling: 'preserve', replaceUrl };

    this.injector.get(Router).navigate([route], navigationExtras);
  }

  /**
   * gets list of existing query parameters
   */
  public getQueryParams(): { [key: string]: string } | null {
    let queryParams = {};
    const url = CommonUtility.getWindowLocationProperty();
    let _queryParamsInURL: any = url?.search?.replace('?', '');

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
  }
}
