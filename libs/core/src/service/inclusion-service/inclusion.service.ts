// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';

import { PlatformService } from '../platform-service/platform.service';

import { default as InclusionUtility } from './../../utils/inclusion/inclusion-util';
import { default as SessionStorageUtility } from './../../utils/sessionStorage';
import { SESSION_CONFIG } from './../../global-config';
import {
  IComponentInclusion,
  IUpdateInclusionRequest,
} from './../../model/interfaces';

@Injectable({
  providedIn: 'root',
})
export class InclusionService implements OnDestroy {
  ngUnsubscribe = new Subject();
  constructor(
    private readonly http: HttpClient,
    private readonly platformService: PlatformService
  ) {}

  /**
   * Fetch inclusions
   */
  getInclusions(
    url: string,
    payload: { module: string; pages?: string }
  ): Observable<any> {
    return this.http.get(url, { params: payload });
  }

  /**
   * Update inclusions
   * @param url: API Endpoint for updating inclusions
   * @param queryParams: query params - module, page
   * @param payload: list of components with isDisplay property
   */
  updateInclusions(
    url: string,
    queryParams: { module: string; page: string },
    payload: IUpdateInclusionRequest
  ): Observable<any> {
    return this.http.put(url, payload, { params: queryParams });
  }

  /**
   * Inclusions factory method
   * @param endpoint : API Endpoint getting for inclusions
   * @param modules : modules for which to fetch the inclusions
   * @param pages : pages for which to fetch the inclusions
   */
  getInclusionFactoryService(
    endpoint: string,
    modules: string[] = [],
    pages: string[] = []
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getInclusionsAndFormat(endpoint, modules, pages).subscribe(
        (response: IComponentInclusion): void => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  /**
   * Get Inclusions from BE then format and save in Session Storage.
   *
   * @param endpoint : API Endpoint getting for inclusions
   * @param modules : modules for which to fetch the inclusions
   * @param pages : pages for which to fetch the inclusions
   */
  getInclusionsAndFormat(
    endpoint: string,
    modules: string[] = [],
    pages: string[] = []
  ): Observable<any> {
    return new Observable((observer: Subscriber<any>): void => {
      this.getInclusions(endpoint, {
        module: modules.join('|'),
        pages: pages.join('|'),
      })
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (response: IComponentInclusion): void => {
            const transformedInclusions: any = InclusionUtility.transformInclusions(
              response[SESSION_CONFIG.inclusionsKey]
            );
            let userProfile: any = SessionStorageUtility.getUserProfile();
            userProfile = {
              ...userProfile,
              [SESSION_CONFIG.inclusionsKey]: transformedInclusions,
            };

            SessionStorageUtility.setUserProfile(userProfile);
            this.platformService.notifyInclusionUpdates();

            observer.next(response);
            observer.complete();
          },
          (error) => {
            // TODO :: Show inpage error with something went wrong
            // will be global to handle same error for all applications at single place
            observer.error(error);
            observer.complete();
          }
        );
    });
  }

  /**
   * lifecycle hook
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
