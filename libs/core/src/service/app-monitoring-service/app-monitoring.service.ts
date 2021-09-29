// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// service to monitor our application using appInsights.

import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { Injectable } from '@angular/core';

import { SessionStorageUtility } from '../../utils/sessionStorage';
import { default as CommonUtility } from '../../utils/commonUtil';

const TELEMETRIC_TAG_CONSTANTS = {
  'ai.cloud.role': 'ai.cloud.role',
  'ai.cloud.roleInstance': 'ai.cloud.roleInstance',
};

@Injectable({ providedIn: 'root' })
export class MyMonitoringService {
  appInsights: ApplicationInsights;
  isAppInsightLogEnabled: boolean;
  appInsightKey: string;
  userProfile: any;
  constructor() {
    this.userProfile = SessionStorageUtility.getUserProfile();

    this.isAppInsightLogEnabled = SessionStorageUtility.getConfigKeys(
      'isAppInsightLogEnabled'
    );
    this.appInsightKey = SessionStorageUtility.getConfigKeys(
      'appInsightsInstrumentationKey'
    );
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: this.appInsightKey && this.appInsightKey.trim(),
        enableAutoRouteTracking: true, // option to log all route changes
      },
    });
    if (this.isAppInsightLogEnabled) {
      this.appInsights.loadAppInsights();
      this.appInsights.setAuthenticatedUserContext(
        this.userProfile?.userDetails?.userId
      );
    }
  }

  /**
   *
   * to log page info on portal
   */
  logPageView(name?: string, url?: string) {
    if (this.isAppInsightLogEnabled) {
      // option to call manually
      this.appInsights.trackPageView({
        name,
        uri: url,
      });
    }
  }

  /**
   *
   * to log page event on portal
   */
  logEvent(name: string, properties?: { [key: string]: any }) {
    if (this.isAppInsightLogEnabled) {
      this.appInsights.trackEvent({ name }, properties);
    }
  }

  /**
   *
   * to log telemetry on portal
   */
  logMetric(
    name: string,
    average: number,
    properties?: { [key: string]: any }
  ) {
    if (this.isAppInsightLogEnabled) {
      this.appInsights.trackMetric({ name, average }, properties);
    }
  }

  /**
   *
   * to log exception on portal
   */
  logException(exception: any, severityLevel?: number) {
    if (this.isAppInsightLogEnabled) {
      this._logTelemetricRole();
      this.appInsights.trackException({ exception, severityLevel });
    }
  }

  /**
   *
   * to track page info on portal
   */
  logTrace(message: string, properties?: { [key: string]: any }) {
    if (this.isAppInsightLogEnabled) {
      this.appInsights.trackTrace({ message }, properties);
    }
  }

  /**
   * logs additional data into app insight for debugging purpose
   * @param page : page url path
   */
  private _logTelemetricRole() {
    const moduleName = CommonUtility.getModuleFromLocationPath(
      CommonUtility.getWindowLocationProperty('pathname')
    );

    this.appInsights.addTelemetryInitializer((envelope) => {
      envelope.tags[TELEMETRIC_TAG_CONSTANTS['ai.cloud.role']] = moduleName;
      envelope.tags[TELEMETRIC_TAG_CONSTANTS['ai.cloud.roleInstance']] =
        moduleName + ' instance';
    });
  }
}
