// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// session and local storage key constants

export const SESSION_STORAGE_KEYS = {
  shipmentsMasterData: 'shipmentsMasterData',
  isMI: 'isMI',
  isMO: 'isMO',
  isMM: 'isMM',
  isBrokerageAccess: 'isBrokerageAccess',
  isGLDAccess: 'isGLDAccess',
  selectedDateRange: 'selectedDateRange',
  wipFiltersData: 'WIPFiltersData',
  pageLoadEventDesc: 'PageLoadEventDesc',
  accountTypeForPageLoad: 'AccountTypeForPageLoad',
  productLineForPageLoad: 'ProductLineForPageLoad',
  serviceLineForPageLoad: 'ServiceLineForPageLoad',
};

export const SESSION_STORAGE_PERSISTENT_KEYS = [
  'selectedDateRange',
  'SCSFilterValues',
  SESSION_STORAGE_KEYS.shipmentsMasterData,
];

export const LocalStorageKeys = {};
