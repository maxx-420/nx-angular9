// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Service to load scripts.json

import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class LoadScriptJsonService implements OnDestroy {
  ngUnsubscribe = new Subject();

  constructor(private readonly http: HttpClient) {}
  /**
   * Load scripts.json for each micro app.
   */
  load(microApp) {
    if (!window.microapps_scripts) {
      window.microapps_scripts = {};
    }
    this.http
      .get(`${microApp.path}/scripts.json`, {
        headers: {
          isScriptJSON: 'true',
        },
      })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          window.microapps_scripts[microApp.path] = res;
        },
        (err) => {
          window.microapps_scripts[microApp.path] = 'failed';
        }
      );
  }
  /**
   * Load scripts.json for all micro apps.
   */
  loadAll(microApps: any[]) {
    microApps.forEach((microApp) => {
      this.load(microApp);
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
