// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Constants for Component ID mappings

export const COMPONENT_ID_MAPPING = {
  global: {
    header: 'L0-GBL-Header',
    searchbar: 'L0-GBL-Search',
    leftNavigation: 'L0-GBL-LeftNavModules',
  },
  dashboard: {
    inboundMilestoneRollupMetrices: 'L1-DB-InboundMilestoneRollupMetrices',
    outboundMilestoneRollupMetrices: '	L1-DB-OutboundMilestoneRollupMetrices',
    inboundShipmentModeCounts: 'L1-DB-InboundShipmentModeCounts',
    outboundShipmentModeCounts: 'L1-DB-OutboundShipmentModeCounts',
    inboundShipmentsByStatusChart: 'L1-DB-InboundShipmentsByStatusBarGraph',
    outboundShipmentsByStatusChart: 'L1-DB-OutboundShipmentsByStatusBarGraph',
    totalInboundShipmentsByDayLineGraph:
      'L1-DB-TotalInboundShipmentsByDayLineGraph',
    totalOutboundShipmentsByDayLineGraph:
      'L1-DB-TotalOutboundShipmentsByDayLineGraph',
    outboundConfirmationBarGraph:
      'L1-DB-OutboundShipmentsByShipmentsConfirmationBarGraph',
    outboundShipmentsbyTop5ServiceLevelBarGraph:
      'L1-DB-OutboundShipmentsByTop5ServiceLevelBarGraph',
    inboundOpenExceptionsTable: 'L1-DB-InboundOpenExceptionsTable',
    outboundOpenExceptionsTable: 'L1-DB-OutboundOpenExceptionsTable',
    exceptionListingTableReferenceNumber:
      'L1-DB-ExceptionListingTable-ReferenceNumber',
    exceptionListingTableOrderShipped:
      'L1-DB-ExceptionListingTable-OrderShipped',
    exceptionListingTableOrderCreatedOn:
      'L1-DB-ExceptionListingTable-CreatedOn',
    exceptionListingTableOrderExceptionCreated:
      'L1-DB-ExceptionListingTable-ExceptionCreated',
    searchListingReferenceNumberColumn:
      'L1-DB-SearchListingReferenceNumberColumn',
    searchListingShipmentTypeColumn: 'L1-DB-SearchListingShipmentTypeColumn',
    searchListingContainerLoadColumn: 'L1-DB-SearchListingContainerLoadColumn',
    exceptionListingTableCarrierShipment:
      'L1-DB-ExceptionListingTable-CarrierShipment',
    exceptionListingTableCustomerPO: 'L1-DB-ExceptionListingTable-CustomerPO',
  },
  inbound: {
    l2: {
      originDestinationMap: 'L2-IN-InboundOriginDestinationMap',
      inboundMilestoneMetricsBar: 'L2-IN-InboundMilestoneMetricsBar',
      inboundShipmentListingTable: 'L2-IN-InboundShipmentListingTable',
      inboundShipmentsDeliveredByDateByDayLineGraph:
        'L2-IN-InboundShipmentsDeliveredDateByDayLineGraph',
      inboundShipmentsCreatedDateByDayLineGraph:
        'L2-IN-InboundShipmentsCreatedDateByDayLineGraph',
      inboundShipmentsByStatusBarGraph:
        'L2-IN-InboundShipmentsByStatusBarGraph',
      inboundCancelledShipmentListingTable:
        'L2-IN-InboundCancelledShipmentListingTable',
      inboundShipmentListingTableScheduledDelivery:
        'L2-IN-ShipmentListingTable-ScheduledDelivery',
      inboundShipmentListingTableOriginCity:
        'L2-IN-ShipmentListingTable-OriginCity',
      inboundShipmentListingTableOriginCountry:
        'L2-IN-ShipmentListingTable-OriginCountry',
      inboundShipmentListingTableServiceUsed:
        'L2-IN-ShipmentListingTable-ServiceUsed',
      inboundShipmentListingTableBookedOn:
        'L2-IN-ShipmentListingTable-BookedOn',
      inboundShipmentListingTableCreatedOn:
        'L2-IN-ShipmentListingTable-CreatedOn',
      inboundShipmentListingTableShipmentType:
        'L2-IN-ShipmentListingTable-ShipmentType',
      inboundShipmentListingTableDeliveryETA:
        'L2-IN-ShipmentListingTable-DeliveryETA',
      inboundShipmentsByDeliveryDateLineGraph:
        'L2-IN-InboundShipmentsByDeliveryDateLineGraph',
    },
    l3: {
      milestoneSteps: 'L3-IN-MilestoneSteps',
      shipmentDetailsCard: 'L3-IN-ShipmentDetailsCard',
      alerts: 'L3-IN-Alerts',
      carrierShipmentNumberCard: 'L3-IN-CarrierShipmentNumberCard', // Do not exists till now
      itemsShippedCard: 'L3-IN-ItemsShippedCard',
      ASNCard: 'L3-IN-ASNCard',
      documentCard: 'L3-IN-DocumentCard',
      activityFeed: 'L3-IN-ActivityFeed',
      careerServiceLevel: 'L3-IN-CareerServiceLevel',
      freightCarrierCode: 'L3-IN-FreightCarrierCode',
      airWayBillNumber: 'L3-IN-AirWayBillNumber',
      shipmentMode: 'L3-IN-ShipmentMode',
      bookedOn: 'L3-IN-BookedOn',
      createdOn: 'L3-IN-CreatedOn',
      scheduledDelivery: 'L3-IN-ScheduledDelivery',
      origin: 'L3-IN-Origin',
      shipmentType: 'L3-IN-ShipmentType',
      showDateTimeZone: 'L3-OUT-ShowDateTimeZone',
      shipmentDetailRefNumber1: 'L3-IN-ShipmentDetail-OutRefNumber1',
      shipmentDetailRefNumber2: 'L3-IN-ShipmentDetail-OutRefNumber2',
      shipmentDetailRefNumber3: 'L3-IN-ShipmentDetail-OutRefNumber3',
      shipmentDetailRefNumber4: 'L3-IN-ShipmentDetail-OutRefNumber4',
      shipmentDetailRefNumber5: 'L3-IN-ShipmentDetail-OutRefNumber5',
      shipmentDetailQcReasonCode: 'L3-IN-ShipmentDetail-QcReasonCode',
      shipmentDetailAuthorizorName: 'L3-IN-ShipmentDetail-AuthorizorName',
      shipmentDetailWaybillAirbillNumber:
        'L3-IN-ShipmentDetail-WaybillAirbillNumber',
      shipmentDetailDeliveryInstructions:
        'L3-IN-ShipmentDetail-DeliveryInstructions',
      shipmentDetailOrgLocnCode: 'L3-IN-ShipmentDetail-OriginLocationCode',
      shipmentDetailDestLocnCode:
        'L3-IN-ShipmentDetail-DestinationLocationCode',
      lineNumber: 'L3-IN-ItemsShipped-LineNumber',
      shipmentDimensions: 'L3-IN-ItemsShipped-ShipmentDimensions',
      shipmentWeight: 'L3-IN-ItemsShipped-ShipmentWeight',
      referenceNumber1: 'L3-IN-ItemsShipped-Ref1',
      referenceNumber2: 'L3-IN-ItemsShipped-Ref2',
      referenceNumber3: 'L3-IN-ItemsShipped-Ref3',
      referenceNumber4: 'L3-IN-ItemsShipped-Ref4',
      referenceNumber5: 'L3-IN-ItemsShipped-Ref5',
      vsn: 'L3-IN-ItemsShipped-vVSN',
      vcl: 'L3-IN-ItemsShipped-VCL',
      lpn: 'L3-IN-ItemsShipped-LPN',
      designator: 'L3-IN-ItemsShipped-Designator',
      carrierCode: 'L3-IN-CarrierShipments-CarrierCode',
      customerPONumber: 'L3-IN-ItemsShipped-CustomerPONumber',
      shipmentDetailsEntryDetails: 'L3-IN-ShipmentDetail-EntryDetails',
      transportationDetailsCard: 'TransportationDetailsCard',
      documentsTab: 'DocumentsTab',
    },
  },
  outbound: {
    l2: {
      originDestinationMap: 'L2-OUT-OutboundOriginDestinationMap',
      outboundCancelledShipmentListingTable:
        'L2-OUT-OutboundCancelledShipmentListingTable',
      outboundMilestoneMetricsBar: 'L2-OUT-OutboundMilestoneMetricsBar',
      outboundShipmentListingTable: 'L2-OUT-OutboundShipmentListingTable',
      outboundShipmentsByShipmentShippedDateLineGraph:
        'L2-OUT-ShipmentsByShipmentShippedDateLineGraph',
      outboundShipmentsByTop5ServiceLevelBarGraph:
        'L2-OUT-OutboundShipmentsbyTop5ServiceLevelBarGraph',
      outboundShipmentListingTableScheduledDelivery:
        'L2-OUT-ShipmentListingTable-ScheduledDelivery',
      outboundShipmentListingTableDeliveryETA:
        'L2-OUT-ShipmentListingTable-DeliveryETA',
      outboundShipmentListingTableReferenceNumber:
        'L2-OUT-ShipmentListingTable-ReferenceNumber',
      outboundShipmentListingTableOutboundReferenceNumber1:
        'L2-OUT-ShipmentListingTable-OutboundReferenceNumber1',
      outboundShipmentListingTableOutboundReferenceNumber2:
        'L2-OUT-ShipmentListingTable-OutboundReferenceNumber2',
      outboundShipmentListingTableOutboundReferenceNumber3:
        'L2-OUT-ShipmentListingTable-OutboundReferenceNumber3',
      outboundShipmentListingTableOutboundReferenceNumber4:
        'L2-OUT-ShipmentListingTable-OutboundReferenceNumber4',
      outboundShipmentListingTableOutboundReferenceNumber5:
        'L2-OUT-ShipmentListingTable-OutboundReferenceNumber5',
      outboundShipmentListingTableWarehouseCode:
        'L2-OUT-ShipmentListingTable-WarehouseCode',
      outboundShipmentListingTableDestinationLocationCode:
        'L2-OUT-ShipmentListingTable-DestinationLocationCode',
      outboundLateDeliveryExceptionsChart: 'L2-OUT-LateDeliveryExceptionsChart',
      outboundUndeliveredExceptionsTable: 'L2-OUT-UndeliveredExceptionsTable',
      outboundCancelShipmentsTimeZone: 'L2-OUT-OutboundCancelShipmentsTimeZone',
      outboundCancelShipmentsLineNumberColumn:
        'L2-OUT-OutboundCancelShipmentsLineNumberColumn',
      outboundCancelShipmentsReasonColumn:
        'L2-OUT-OutboundCancelShipmentsReasonColumn',
      outboundCancelShipmentsServiceNameColumn:
        'L2-OUT-OutboundCancelShipmentsServiceNameColumn',
    },
    l3: {
      milestoneSteps: 'L3-OUT-MilestoneSteps',
      shipmentDetailsCard: 'L3-OUT-ShipmentDetailsCard',
      alerts: 'L3-OUT-Alerts',
      carrierShipmentNumberCard: 'L3-OUT-CarrierShipmentNumberCard',
      itemsShippedCard: 'L3-OUT-ItemsShippedCard',
      activityFeed: 'L3-OUT-ActivityFeed',
      customerPO: 'L3-OUT-CustomerPO',
      upsTransportationShipment: 'L3-OUT-UPSTransportationShipment',
      careerServiceLevel: 'L3-OUT-CareerServiceLevel',
      shipmentMode: 'L3-OUT-ShipmentMode',
      createdOn: 'L3-OUT-CreatedOn',
      showDateTimeZone: 'L3-OUT-ShowDateTimeZone',
      shipmentScheduleScheduledDelivery:
        'L3-OUT-ShipmentDetail-ScheduledDeliveryDate',
      shipmentDetailRefNumber1: 'L3-OUT-ShipmentDetail-OutRefNumber1',
      shipmentDetailRefNumber2: 'L3-OUT-ShipmentDetail-OutRefNumber2',
      shipmentDetailRefNumber3: 'L3-OUT-ShipmentDetail-OutRefNumber3',
      shipmentDetailRefNumber4: 'L3-OUT-ShipmentDetail-OutRefNumber4',
      shipmentDetailRefNumber5: 'L3-OUT-ShipmentDetail-OutRefNumber5',
      shipmentDetailQcReasonCode: 'L3-OUT-ShipmentDetail-QcReasonCode',
      shipmentDetailAuthorizorName: 'L3-OUT-ShipmentDetail-AuthorizorName',
      shipmentDetailWaybillAirbillNumber:
        'L3-OUT-ShipmentDetail-WaybillAirbillNumber',
      shipmentDetailDeliveryInstructions:
        'L3-OUT-ShipmentDetail-DeliveryInstructions',
      shipmentDetailOrgLocnCode: 'L3-OUT-ShipmentDetail-OriginLocationCode',
      shipmentDetailDestLocnCode:
        'L3-OUT-ShipmentDetail-DestinationLocationCode',
      lineNumber: 'L3-OUT-ItemsShipped-LineNumber',
      shipmentDimensions: 'L3-OUT-ItemsShipped-ShipmentDimensions',
      shipmentWeight: 'L3-OUT-ItemsShipped-ShipmentWeight',
      referenceNumber1: 'L3-OUT-ItemsShipped-Ref1',
      referenceNumber2: 'L3-OUT-ItemsShipped-Ref2',
      referenceNumber3: 'L3-OUT-ItemsShipped-Ref3',
      referenceNumber4: 'L3-OUT-ItemsShipped-Ref4',
      referenceNumber5: 'L3-OUT-ItemsShipped-Ref5',
      vsn: 'L3-OUT-ItemsShipped-vVSN',
      vcl: 'L3-OUT-ItemsShipped-VCL',
      lpn: 'L3-OUT-ItemsShipped-LPN',
      designator: 'L3-OUT-ItemsShipped-Designator',
      carrierCode: 'L3-OUT-CarrierShipments-CarrierCode',
      externalCarrierSites: 'L3-OUT-CarrierShipments-ExternalCarrierSites',
      shipmentDetailsEntryDetails: 'L3-OUT-ShipmentDetail-EntryDetails',
      logiNextLink: 'L3-OUT-ShipmentDetail-LogiNextLink',
      documentsTab: 'DocumentsTab',
    },
  },
  warehouse: {
    l2: {
      inboundMilestoneStatusOverviewMetricsBar:
        'L2-WH-InboundMilestoneMetricsBar',
      outboundMilestoneStatusOverviewMetricsBar:
        'L2-WH-OutboundMilestoneMetricsBar',
      inboundShipmentsByStatusBarGraph:
        'L2-WH-InboundShipmentsByStatusBarGraph',
      outboundShipmentsByStatusBarGraph:
        'L2-WH-OutboundShipmentsByStatusBarGraph',
      warehouseListingTable: 'L2-WH-WarehouseListingTable',
      outboundCancelledShipmentsTable: 'L2-WH-OutboundCancelledShipmentsTable',
      mapOfWarehouses: 'L2-WH-MapWarehouses',
      warehouseListingTableLPNOnHandCount:
        'L2-WH-WarehouseListingTable-LPNOnHandCount',
      warehouseInventoryTab: 'L2-WH-WarehouseInventoryTab',
    },
    l3: {
      inboundShipmentsByCreationDateLineGraph:
        'L3-WH-InboundShipmentsByCreationDateLineGraph',
      inboundShipmentsByModeBarGraph: 'L3-WH-InboundShipmentsByModeBarGraph',
      inboundShipmentsByDeliveryDateLineGraph:
        'L3-WH-InboundShipmentsByDeliveryDateLineGraph',
      inboundShipmentsByStatusBarGraph:
        'L3-WH-InboundShipmentsByStatusBarGraph',
      inboundShipmentByStatusMetricsBar:
        'L3-WH-InboundShipmentByStatusMetricsBar',
      inboundShipmentByStatusTable: 'L3-WH-InboundShipmentByStatusTable',
      outboundShipmentsByShipmentConfirmDateLineGraph:
        'L3-WH-OutboundShipmentsByShipmentConfirmDateLineGraph',
      outboundShipmentCancellationsTable:
        'L3-WH-OutboundShipmentCancellationsTable',
      outboundShipmentsByStatusBarGraph:
        'L3-WH-OutboundShipmentsByStatusBarGraph',
      outboundShipmentsByTop5CarrierServiceLevelBarGraph:
        'L3-WH-OutboundShipmentsByTop5CarrierServiceLevelBarGraph',
      outboundShipmentByStatusMetricsBar:
        'L3-WH-OutboundShipmentByStatusMetricsBar',
      outboundShipmentByStatusTable: 'L3-WH-OutboundShipmentByStatusTable',
      inventoryLookupOnOutboundScreen: 'L3-WH-InventoryLookupOnOutboundScreen',
      inventoryLookupOnInboundScreen: 'L3-WH-InventoryLookupOnInboundScreen',
      inboundShipmentListingTableScheduledDelivery:
        'L3-WH-InboundShipmentListingTable-ScheduledDelivery',
      inboundShipmentListingTableOriginCity:
        'L3-WH-InboundShipmentListingTable-OriginCity',
      inboundShipmentListingTableOriginCountry:
        'L3-WH-InboundShipmentListingTable-OriginCountry',
      inboundShipmentListingTableServiceUsed:
        'L3-WH-InboundShipmentListingTable-ServiceUsed',
      inboundShipmentListingTableBookedOn:
        'L3-WH-InboundShipmentListingTable-BookedOn',
      inboundShipmentListingTableCreatedOn:
        'L3-WH-InboundShipmentListingTable-CreatedOn',
      outboundShipmentListingTableScheduledDelivery:
        'L3-WH-OutboundShipmentListingTable-ScheduledDelivery',
      inboundShipmentListingTableShipmentType:
        'L3-WH-InboundShipmentListingTable-ShipmentType',
      outboundShipmentListingTableDeliveryETA:
        'L3-WH-OutboundShipmentListingTable-DeliveryETA',
      outboundShipmentListingTableReferenceNumber:
        'L3-WH-OutboundShipmentListingTable-ReferenceNumber',
      outboundShipmentListingTableOutboundReferenceNumber1:
        'L3-WH-OutboundShipmentListingTable-OutboundReferenceNumber1',
      outboundShipmentListingTableOutboundReferenceNumber2:
        'L3-WH-OutboundShipmentListingTable-OutboundReferenceNumber2',
      outboundShipmentListingTableOutboundReferenceNumber3:
        'L3-WH-OutboundShipmentListingTable-OutboundReferenceNumber3',
      outboundShipmentListingTableOutboundReferenceNumber4:
        'L3-WH-OutboundShipmentListingTable-OutboundReferenceNumber4',
      outboundShipmentListingTableOutboundReferenceNumber5:
        'L3-WH-OutboundShipmentListingTable-OutboundReferenceNumber5',
      outboundShipmentListingTableWarehouseCode:
        'L3-WH-OutboundShipmentListingTable-WarehouseCode',
      outboundShipmentListingTableDestinationLocationCode:
        'L3-WH-OutboundShipmentListingTable-DestinationLocationCode',
    },
  },
  report: {},
  billing: {
    l2: {
      billingDeleteDocument: 'L2-BL-DeleteDocument',
      billingUploadDocument: 'L2-BL-AddDocument',
    },
  },
  movement: {
    l2: {
      shipmentListingTableReferenceNumber:
        'L2-GFF-ShipmentListingTable-ReferenceNumber',
      shipmentListingTableShipmentType:
        'L2-GFF-ShipmentListingTable-ShipmentType',
      shipmentListingTableBookedDateTime:
        'L2-GFF-ShipmentListingTable-BookedDateTime',
      shipmentListingTableDestinationCode:
        'L2-GFF-ShipmentListingTable-DestinationCode',
      shipmentListingTableEquipmentType:
        'L2-GFF-ShipmentListingTable-EquipmentType',
      shipmentListingTableContainerLoad:
        'L2-GFF-ShipmentListingTable-ContainerLoad',
      shipmentListingTableOriginCode: 'L2-GFF-ShipmentListingTable-OriginCode',
      shipmentSummaryMap: 'L2-ShipmentsSummaryView-ShipmentMap',
      shipmentsByMilestoneChart:
        'L2-ShipmentsSummaryView-ShipmentsByMilestoneChart',
      shipmentsByServiceLevelChart:
        'L2-ShipmentsSummaryView-ShipmentsByServiceLevelChart',
      shipmentsTotalGraph: 'L2-ShipmentsSummaryView-TotalShipmentsGraph',
      shipmentsByModeChart: 'L2-ShipmentsSummaryView-ShipmentsByModeChart',
      shipmentsByCarrier: 'L2-ShipmentSummaryView-ShipmentsByCarriersChart',
      cancelledShipmentsTable: 'L2-ShipmentSummaryView-CancelledShipmentsTable',
      shipmentListingTableLastKnownLocation:
        'L2-GFF-ShipmentListingTable-LastKnownLocation',
      shipmentListingTablePerformance:
        'L2-GFF-ShipmentListingTable-Performance',
      shipmentListingTableCarrierShipment:
        'L2-LIST-ShipmentListingTable-CarrierShipment',
      shipmentListingTableCustomerPO: 'L2-LIST-ShipmentListingTable-CustomerPO',
    },
    l3: {
      freightPaymentTerm: 'L3-GFF-FreightPaymentTerm',
      shipmentType: 'L3-GFF-ShipmentType',
      seal: 'L3-GFF-Seal',
      containerType: 'L3-GFF-ContainerType',
      containerNumber: 'L3-GFF-ContainerNumber',
      voyageNumber: 'L3-GFF-VoyageNumber',
      vessel: 'L3-GFF-Vessel',
      quantity: 'L3-GFF-Quantity',
      containerWeight: 'L3-GFF-ContainerWeight',
      weightUOM: 'L3-GFF-WeightUOM',
      containerVolume: 'L3-GFF-ContainerVolume',
      volumeUOM: 'L3-GFF-VolumeUOM',
      flightNumber: 'L3-GFF-FlightNumber',
      documentsTab: 'DocumentsTab',
      transportationDetailsCard: 'TransportationDetailsCard',
      carrierShipmentCard: 'CarrierShipmentCard'

    },
  },
};
