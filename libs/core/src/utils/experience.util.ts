// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Experience utility
import {
  DASHBOARD_EXPERIENCE_CONFIG,
  REPORT_EXPERIENCE_CONFIG,
  SESSION_CONFIG,
  WAREHOUSE_EXPERIENCE_CONFIG,
} from '../global-config';

import { default as CommonUtility } from './.././utils/commonUtil';
import { SessionStorageUtility } from './sessionStorage';

/**
 * Get which dashboard experience to be shown to logged in user
 * @returns (Boolean) true, if new dashboard experience to be shown
 */
export function isConvergenceDashboardExperience() {
  const dashboardExperience = CommonUtility.getPropValueFromObj(
    SessionStorageUtility.getUserProfile(),
    SESSION_CONFIG.dashboardExperience
  );

  return (
    dashboardExperience?.toLowerCase() ===
    DASHBOARD_EXPERIENCE_CONFIG.convergenceExperience
  );
}

/**
 * Get which report experience to be shown to logged in user
 * @returns (Boolean) true, if new report experience to be shown
 */
export function isConvergenceReportExperience() {
  const reportExperience = CommonUtility.getPropValueFromObj(
    SessionStorageUtility.getUserProfile(),
    SESSION_CONFIG.reportExperience
  );

  return (
    reportExperience?.toLowerCase() ===
    REPORT_EXPERIENCE_CONFIG.convergenceExperience
    );
}
/**
 * Get which warehouse experience to be shown to logged in user
 * @returns (Boolean) true, if new warehouse experience to be shown
 */
export function isConvergenceWarehouseExperience() {
  const warehouseExperience = CommonUtility.getPropValueFromObj(
    SessionStorageUtility.getUserProfile(),
    SESSION_CONFIG.warehouseExperience
  );

  return (
    warehouseExperience?.toLowerCase() ===
    WAREHOUSE_EXPERIENCE_CONFIG.convergenceExperience
  );
}
