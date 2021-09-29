// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// fetch cms content service

import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CMSContentStoreService } from '../cms-content-store/cms-content-store.service';

@Injectable({
  providedIn: 'root',
})
export class FetchCMSContentService implements OnDestroy {
  ngUnsubscribe = new Subject();

  constructor(
    private readonly http: HttpClient,
    private readonly _cmsContentStoreService: CMSContentStoreService
  ) {}

  /**
   * Get CMS data and process it
   */
  public getCMSContent(url): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.fetchCMSData(url)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (res) => {
            /**
             * Using stub data
             */
            const mergedLabels = this.modifyCMSData(res);
            if (mergedLabels) {
              this._cmsContentStoreService.setLabelsInStore(mergedLabels);
            }
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  /**
   * Modify API data
   * @param res : HTTP Response
   */
  modifyCMSData(res) {
    const labelDataArr = [];
    res.labelData?.forEach((obj) => {
      labelDataArr.push(obj.value);
    });
    res.contentData?.forEach((obj) => {
      labelDataArr.push({ key: obj.applicationId, value: obj.value });
    });
    return [].concat.apply([], labelDataArr);
  }
  /**
   * Fetch CMS data from servie
   */
  fetchCMSData(url): Observable<any> {
    return this.http.get(url, {
      headers: {
        isContentJSON: 'true',
      },
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
