// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * config file
 */
export const displayColumns = (isMultiView = false) => [
  ...(isMultiView
    ? ['accountNumber']
    : []),
  'referenceNo',
  'upsShipmentNo',
  'exception',
  'orderShipped',
  'scheduledDelivery',
  'origin',
  'destination',
  'carrierServiceLevel',
  'milestoneStatus',
];

export const displayOpenExceptions = (isMultiView = false) => [
  ...(isMultiView
    ? ['accountNumber']
    : []),
  'referenceNo',
  'upsShipmentNo',
  'exceptionType',
  'exception',
  'orderShipped',
  'scheduledDelivery',
  'origin',
  'destination',
  'carrierServiceLevel',
  'milestoneStatus',
];

export const pageSizeForTablePerViewport = {
  mobile: 12,
  tablet: 12,
  desktop: 6,
};

export const dataAutomationAttr = 'undelivered';
