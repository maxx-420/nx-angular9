// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

// common Exclusions
const commonNMIExclusions = {
  ShipmentMode: 'ShipmentMode',
  Origin: 'Origin',
  CareerServiceLevel: 'CareerServiceLevel',
  ShipmentDetailCardOutRefNumber1: 'ShipmentDetailCardlOutRefNumber1',
  ShipmentDetailCardOutRefNumber2: 'ShipmentDetailCardOutRefNumber2',
  ShipmentDetailCardOutRefNumber3: 'ShipmentDetailCardOutRefNumber3',
  ShipmentDetailCardOutRefNumber4: 'ShipmentDetailCardOutRefNumber3',
  ShipmentDetailCardOutRefNumber5: 'ShipmentDetailCardOutRefNumber3',
  ShipmentDetailCardQcReasonCode: 'ShipmentDetailCardQcReasonCode',
  ShipmentDetailCardAuthorizorName: 'ShipmentDetailCardAuthorizorName',
  ShipmentDetailCardWaybillAirbillNumber:
    'ShipmentDetailCardWaybillAirbillNumber',
  ShipmentDetailCardDeliveryInstructions:
    'ShipmentDetailCardDeliveryInstructions',
  ShipmentDetailCardOriginLocationCode: 'ShipmentDetailCardOriginLocationCode',
  ShipmentDetailCardDestinationLocationCode:
    'ShipmentDetailCardDestinationLocationCode',
  ShowDateTimeZone: 'ShowDateTimeZone',
  ItemsShippedTableRef1: 'ItemsShippedTableRef1',
  ItemsShippedTableRef2: 'ItemsShippedTableRef2',
  ItemsShippedTableRef3: 'ItemsShippedTableRef3',
  ItemsShippedTableRef4: 'ItemsShippedTableRef4',
  ItemsShippedTableRef5: 'ItemsShippedTableRef5',
  ItemsShippedvVSN: 'ItemsShippedvVSN',
  ItemsShippedVCL: 'ItemsShippedVCL',
  ItemsShippedLPN: 'ItemsShippedLPN',
  ItemsShippedDesignator: 'ItemsShippedDesignator',
  ShipmentDetailCardExpectedShippedByDate:
    'ShipmentDetailCardExpectedShippedByDate',
  ShipmentScheduleCardActualPickup: 'ShipmentScheduleCardActualPickup',
  ShipmentScheduleCardSchedulePickup: 'ShipmentScheduleCardSchedulePickup',
  CarrierShipmentsExternalCarrierSites: 'CarrierShipmentsExternalCarrierSites',
  CostCard: 'CostCard',
  ClaimsCard: 'ClaimsCard',
  ShipUnitDetailsCard: 'ShipUnitDetailsCard',
};

const commonMIExclusions = {
  CreatedOn: 'CreatedOn',
  FreightCarrierCode: 'FreightCarrierCode',
  AirWayBillNumber: 'AirWayBillNumber',
  ShipmentDetailCardOutRefNumber1: 'ShipmentDetailCardOutRefNumber1',
  ShipmentDetailCardOutRefNumber2: 'ShipmentDetailCardOutRefNumber2',
  ShipmentDetailCardOutRefNumber3: 'ShipmentDetailCardOutRefNumber3',
  ShipmentDetailCardOutRefNumber4: 'ShipmentDetailCardOutRefNumber4',
  ShipmentDetailCardOutRefNumber5: 'ShipmentDetailCardOutRefNumber5',
  ShipmentDetailCardQcReasonCode: 'ShipmentDetailCardQcReasonCode',
  ShipmentDetailCardAuthorizorName: 'ShipmentDetailCardAuthorizorName',
  ShipmentDetailCardWaybillAirbillNumber:
    'ShipmentDetailCardWaybillAirbillNumber',
  ShipmentDetailCardDeliveryInstructions:
    'ShipmentDetailCardDeliveryInstructions',
  ShipmentDetailCardOriginLocationCode: 'ShipmentDetailCardOriginLocationCode',
  ShipmentDetailCardDestinationLocationCode:
    'ShipmentDetailCardDestinationLocationCode',
  ShowDateTimeZone: 'ShowDateTimeZone',
  ItemsShippedTableCustomerPONumber: 'ItemsShippedTableCustomerPONumber',
  ItemsShippedTableRef1: 'ItemsShippedTableRef1',
  ItemsShippedTableRef2: 'ItemsShippedTableRef2',
  ItemsShippedTableRef3: 'ItemsShippedTableRef3',
  ItemsShippedTableRef4: 'ItemsShippedTableRef4',
  ItemsShippedTableRef5: 'ItemsShippedTableRef5',
  ItemsShippedTablevVSN: 'ItemsShippedTablevVSN',
  ItemsShippedTableVCL: 'ItemsShippedTableVCL',
  ItemsShippedTableLPN: 'ItemsShippedTableLPN',
  ItemsShippedTableDesignator: 'ItemsShippedTableDesignator',
  ShipmentDetailCardExpectedShippedByDate:
    'ShipmentDetailCardExpectedShippedByDate',
  CarrierShipmentsExternalCarrierSites: 'CarrierShipmentsExternalCarrierSites',
};

const commonExclusionsColumns = {
  ExpirationDate: 'ExpirationDate',
  SerialNumber: 'SerialNumber',
  BatchNumber: 'BatchNumber',
};

// maintained a config for repetidely used exclusions
const commonExclusions = {
  FGNMI: {
    ...commonNMIExclusions,
    ...commonExclusionsColumns,
  },
  FGMI: {
    ...commonMIExclusions,
    ...commonExclusionsColumns,
  },
  PSMI: {
    CreatedOn: 'CreatedOn',
    FreightCarrierCode: 'FreightCarrierCode',
    AirWayBillNumber: 'AirWayBillNumber',
    ShipmentDetailCardOutRefNumber1: 'ShipmentDetailCardOutRefNumber1',
    ShipmentDetailCardOutRefNumber2: 'ShipmentDetailCardOutRefNumber2',
    ShipmentDetailCardOutRefNumber3: 'ShipmentDetailCardOutRefNumber3',
    ShipmentDetailCardOutRefNumber4: 'ShipmentDetailCardOutRefNumber4',
    ShipmentDetailCardOutRefNumber5: 'ShipmentDetailCardOutRefNumber5',
    ShipmentDetailCardQcReasonCode: 'ShipmentDetailCardQcReasonCode',
    ShipmentDetailCardAuthorizorName: 'ShipmentDetailCardAuthorizorName',
    ShipmentDetailCardWaybillAirbillNumber:
      'ShipmentDetailCardWaybillAirbillNumber',
    ShipmentDetailCardDeliveryInstructions:
      'ShipmentDetailCardDeliveryInstructions',
    ShipmentDetailCardOriginLocationCode:
      'ShipmentDetailCardOriginLocationCode',
    ShipmentDetailCardDestinationLocationCode:
      'ShipmentDetailCardDestinationLocationCode',
    ShowDateTimeZone: 'ShowDateTimeZone',
    ItemsShippedTableCustomerPONumber: 'ItemsShippedTableCustomerPONumber',
    ItemsShippedTableRef4: 'ItemsShippedTableRef4',
    ItemsShippedTableRef5: 'ItemsShippedTableRef5',
    ItemsShippedTablevVSN: 'ItemsShippedTablevVSN',
    ItemsShippedTableVCL: 'ItemsShippedTableVCL',
    ItemsShippedTableLPN: 'ItemsShippedTableLPN',
    ItemsShippedTableDesignator: 'ItemsShippedTableDesignator',
    ActivityFeedSegmentNumber: 'ActivityFeedSegmentNumber',
    ShipmentDetailCardExpectedShippedByDate:
      'ShipmentDetailCardExpectedShippedByDate',
    ShipmentScheduleCardActualPickup: 'ShipmentScheduleCardActualPickup',
    ShipmentScheduleCardSchedulePickup: 'ShipmentScheduleCardSchedulePickup',
    ExceptionHistoryTable: 'ExceptionHistoryTable',
    CostCard: 'CostCard',
    ClaimsCard: 'ClaimsCard',
    ...commonExclusionsColumns,
  },
  PSNMI: {
    ShipmentMode: 'ShipmentMode',
    Origin: 'Origin',
    CareerServiceLevel: 'CareerServiceLevel',
    ShipmentDetailCardOutRefNumber1: 'ShipmentDetailCardOutRefNumber1',
    ShipmentDetailCardOutRefNumber2: 'ShipmentDetailCardOutRefNumber2',
    ShipmentDetailCardOutRefNumber3: 'ShipmentDetailCardOutRefNumber3',
    ShipmentDetailCardOutRefNumber4: 'ShipmentDetailCardOutRefNumber4',
    ShipmentDetailCardOutRefNumber5: 'ShipmentDetailCardOutRefNumber5',
    ShipmentDetailCardQcReasonCode: 'ShipmentDetailCardQcReasonCode',
    ShipmentDetailCardAuthorizorName: 'ShipmentDetailCardAuthorizorName',
    ShipmentDetailCardWaybillAirbillNumber:
      'ShipmentDetailCardWaybillAirbillNumber',
    ShipmentDetailCardDeliveryInstructions:
      'ShipmentDetailCardDeliveryInstructions',
    ShipmentDetailCardOriginLocationCode:
      'ShipmentDetailCardOriginLocationCode',
    ShipmentDetailCardDestinationLocationCode:
      'ShipmentDetailCardDestinationLocationCode',
    ShipmentDetailCardTransportOrderNo: 'ShipmentDetailCardTransportOrderNo',
    ShowDateTimeZone: 'ShowDateTimeZone',
    'ItemsShippedTable-Ref4': 'ItemsShippedTable-Ref4',
    ItemsShippedTableRef5: 'ItemsShippedTableRef5',
    ItemsShippedTablevVSN: 'ItemsShippedTablevVSN',
    ItemsShippedTableVCL: 'ItemsShippedTableVCL',
    ItemsShippedTableLPN: 'ItemsShippedTableLPN',
    ItemsShippedTableDesignator: 'ItemsShippedTableDesignator',
    ActivityFeedSegmentNumber: 'ActivityFeedSegmentNumber',
    ShipmentDetailCardExpectedShippedByDate:
      'ShipmentDetailCardExpectedShippedByDate',
    ShipmentScheduleCardActualPickup: 'ShipmentScheduleCardActualPickup',
    ShipmentScheduleCardSchedulePickup: 'ShipmentScheduleCardSchedulePickup',
    ExceptionHistoryTable: 'ExceptionHistoryTable',
    CostCard: 'CostCard',
    ClaimsCard: 'ClaimsCard',
    ...commonExclusionsColumns,
  },
  HealthNMI: {
    ...commonNMIExclusions,
  },
  HealthMI: {
    ...commonMIExclusions,
  },
};
/**
 * list of exclusion for map, delivery eta, shipment detail card,
 * exception history table, activity feed, ItemsShippedCard,
 * TransportationDetailsCard and CarrierShipmentNumberCard
 */
export const inboundDetailsExclusions = {
  'GLD@FG@NMI': commonExclusions.FGNMI,
  'GLD@FG@MI': commonExclusions.FGMI,
  'GLD@PS@MI': commonExclusions.PSMI,
  'GLD@PS@NMI': commonExclusions.PSNMI,
  'GLD_GFF@FG@MI': commonExclusions.FGMI,
  'GLD_GFF@FG@NMI': commonExclusions.FGNMI,
  'HLD_GFF@HEALTH@NMI': commonExclusions.HealthNMI,
  'HLD_GFF@*@MI': commonExclusions.FGMI,
  'HLD_GFF@*@NMI': commonExclusions.FGNMI,
  'HLD@HEALTH@NMI': commonExclusions.HealthNMI,
  'HLD@HEALTH@MI': commonExclusions.HealthMI,
  'HLD@*@MI': commonExclusions.FGMI,
  'HLD@*@NMI': commonExclusions.FGNMI,
};

export const shipmentWrapperComponentIDMap = {
  documentsTab: 'DocumentsTab',
  entryDetails: 'L3-IN-ShipmentDetail-EntryDetails',
  itemsShippedCard: 'L3-IN-ItemsShippedCard',
  transportationDetailsCard: 'TransportationDetailsCard',
  carrierShipmentNumberCard: 'L3-IN-CarrierShipmentNumberCard',

  shipmentMode: 'ShipmentMode',
  shipmentType: 'ShipmentType',
  shipmentScheduleCardDeliveryETA: 'ShipmentScheduleCardDeliveryETA',
  freightCarrierCode: 'FreightCarrierCode',
  airWayBillNumber: 'AirWayBillNumber',
  createdOn: 'CreatedOn',
  origin: 'Origin',
  customerPO: 'CustomerPO',
  careerServiceLevel: 'CareerServiceLevel',
  shipmentDetailCardOutRefNumber1: 'ShipmentDetailCardOutRefNumber1',
  shipmentDetailCardOutRefNumber2: 'ShipmentDetailCardOutRefNumber2',
  shipmentDetailCardOutRefNumber3: 'ShipmentDetailCardOutRefNumber3',
  shipmentDetailCardOutRefNumber4: 'ShipmentDetailCardOutRefNumber4',
  shipmentDetailCardOutRefNumber5: 'ShipmentDetailCardOutRefNumber5',
  shipmentDetailCardQcReasonCode: 'ShipmentDetailCardQcReasonCode',
  shipmentDetailCardAuthorizorName: 'ShipmentDetailCardAuthorizorName',
  shipmentDetailCardWaybillAirbillNumber:
    'ShipmentDetailCardWaybillAirbillNumber',
  shipmentDetailCardDeliveryInstructions:
    'ShipmentDetailCardDeliveryInstructions',
  shipmentDetailCardOriginLocationCode: 'ShipmentDetailCardOriginLocationCode',
  shipmentDetailCardDestinationLocationCode:
    'ShipmentDetailCardDestinationLocationCode',
  shipmentDetailCardTransportOrderNo: 'ShipmentDetailCardTransportOrderNo',
  showDateTimeZone: 'ShowDateTimeZone',
  itemsShippedTableRef1: 'ItemsShippedTableRef1',
  itemsShippedTableRef2: 'ItemsShippedTableRef2',
  itemsShippedTableRef3: 'ItemsShippedTableRef3',
  itemsShippedTableRef4: 'ItemsShippedTableRef4',
  itemsShippedTableRef5: 'ItemsShippedTableRef5',
  itemsShippedTablevVSN: 'ItemsShippedTablevVSN',
  itemsShippedTableVCL: 'ItemsShippedTableVCL',
  itemsShippedTableLPN: 'ItemsShippedTableLPN',
  itemsShippedTableDesignator: 'ItemsShippedTableDesignator',
  itemsShippedTableCustomerPONumber: 'ItemsShippedTableCustomerPONumber',
  activityFeedSegmentNumber: 'ActivityFeedSegmentNumber',
  shipmentDetailCardExpectedShippedByDate:
    'ShipmentDetailCardExpectedShippedByDate',
  shipmentScheduleCardActualPickup: 'ShipmentScheduleCardActualPickup',
  shipmentScheduleCardSchedulePickup: 'ShipmentScheduleCardSchedulePickup',
  carrierShipmentsExternalCarrierSites: 'CarrierShipmentsExternalCarrierSites',
  exceptionHistoryTable: 'ExceptionHistoryTable',
  costCard: 'CostCard',
  claimsCard: 'ClaimsCard',
  expirationDate: 'ExpirationDate',
  serialNumber: 'SerialNumber',
  batchNumber: 'BatchNumber',
  shipUnitDetailsCard: 'ShipUnitDetailsCard',
};

const commonConnections = {
  variation1: ['shipmentDetails', 'items', 'asn'],
};

/**
 * this is the inclusion config for shipment connections
 */
export const inboundConnectionList = () => {
  return {
    'GLD@FG@NMI': commonConnections.variation1,
    'GLD@FG@MI': commonConnections.variation1,
    'GLD@PS@NMI': commonConnections.variation1,
    'GLD_GFF@FG@MI': commonConnections.variation1,
    'GLD_GFF@FG@NMI': commonConnections.variation1,
    'HLD_GFF@*@MI': commonConnections.variation1,
    'HLD_GFF@*@NMI': commonConnections.variation1,
    'HLD@*@MI': commonConnections.variation1,
    'HLD@*@NMI': commonConnections.variation1,
  };
};
