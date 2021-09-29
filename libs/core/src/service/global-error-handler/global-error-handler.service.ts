// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Global Error Handler

import { ErrorHandler, Injectable } from '@angular/core';

import { SessionStorageUtility } from '../../utils/sessionStorage';
import { MyMonitoringService } from '../app-monitoring-service/app-monitoring.service';
import CommonUtility from '../../utils/commonUtil';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler extends ErrorHandler {
  isLocalHost: boolean;
  constructor(private readonly monitoringService: MyMonitoringService) {
    super();
    this.isLocalHost = SessionStorageUtility.get('isLocalHost');
  }

  /**
   *
   * to log errors in a specific format on console.
   */
  handleError(error: any) {
    const err = {
      message: error.message ? error.message : error.toString(),
      stack: error.stack ? error.stack : '',
    };

    if (!CommonUtility.isProdEnv()) {
      // Log  the error
      console.error(error);
    }

    if (!this.isLocalHost) {
      this.monitoringService.logException(err);
    }

    // Optionally send it to your back-end API
    // Notify the user
  }
}
