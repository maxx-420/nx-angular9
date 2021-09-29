// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// service to fetch configs from API

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FE_CONFIG_KEY_NAME } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class FetchConfigKeysService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Fetch CMS data from servie
   */
  fetchConfigKeys(url, body = null): Observable<any> {
    return this.http.post(
      url,
      body || [
        FE_CONFIG_KEY_NAME,
        'CacheConfigurationKeys',
        'ReportServiceNames',
      ]
    );
  }
}
