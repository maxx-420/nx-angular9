// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * mentions global constants
 */
export const SHIPMENT_STATUS = {
  booking: 'booking',
  departure: 'departure',
  customs: 'customs',
  delivery: 'delivery',
  delivered: 'delivered',
  receiving: 'receiving',
  putaway: 'putaway',
  created: 'created',
  warehouse: 'warehouse',
  warehouse_complete: 'warehouse complete',
  inbound: 'inbound',
  outbound: 'outbound',
  line: 'line',
  asn_created: 'asncreated',
  ftz: 'ftz',
  pending: 'pending',
  rated: 'rated',
  in_transit: 'intransit',
  booked: 'booked',
};

export const MILESTONE_ICONS = {
  availableIcons: [
    'shipment',
    'booking',
    'departure',
    'customs',
    'delivery',
    'delivered',
    'putaway',
    'warehouse',
    'receiving',
    'created',
    'warehousecomplete',
    'asncreated',
    'ftz',
    'pending',
    'rated',
    'intransit',
    'booked',
  ],
  defaultIcon: 'default',
};

export const MILESTONE_STATUS = {
  upcoming: 'upcoming',
  completed: 'completed',
  inProgress: 'inProgress',
};

export const SHIPMENT_ID = 'shipment';

export const SHIPMENT_MODE = {
  availableIcons: [
    'air',
    'courier',
    'intermodal',
    'ltl',
    'ocean',
    'parcel',
    'tl',
  ],
  defaultIcon: 'default',
};

export const EXTERNAL_CARRIERS_LIST = ['fedex', 'expeditors', 'usps'];

export const CARRIER_LINK_REDIRECTION = {
  'united parcel service':
    'https://www.ups.com/track?loc=en_US&requester=WT&tracknum=%%tracking_number%%',
  ups:
    'https://www.ups.com/track?loc=en_US&requester=WT&tracknum=%%tracking_number%%',
  fedex: 'https://www.fedex.com/fedextrack/?trknbr=%%tracking_number%%',
  expeditors:
    'http://expo.expeditors.com/expo/SQGuest?SearchType=shipmentSearch&TrackingNumber=%%tracking_number%%&action=SQGuest',
  usps:
    'https://tools.usps.com/go/TrackConfirmAction?tLabels=%%tracking_number%%',
  'ups air freight':
    'https://www.ups.com/track?loc=en_US&requester=WT&tracknum=%%tracking_number%%',
};

export const LOGINEXT_TRACK = {
  link: 'https://api.loginextsolutions.com/track/#/order?',
  AIDUSCAKey: 'logiNextAidUsCa',
  AIDDefaultKey: 'logiNextAidDefault',
};

export const UPS_CARRIER_CODE = 'UPS';
export const UPS_CARRIER_FULL_NAME = 'UNITED PARCEL SERVICE';

export const NOT_AVAILABLE = 'na';

export const UPS_PAGE_DESCRIPTION_PREFIX = 'UPS GLD Symphony ';
export const DEFAULT_LINK_SECTION_VALUE = 'on page';
export const EVENT_FLAG_VALUES = {
  generic_event_counter: 'generic_event_counter',
  internal_site_search: 'internal_site_search',
};
export const SEARCH_RESULTS_LOADED = 'Search Results Loaded';
export const PAGE_NAME_PREFIX = 'ups:us:en:';
export const PAGE_ID_PREFIX = 'gld:symphony:';
export const HTTP_GET_METHOD = 'GET';

export const ROUTE_STATES = {
  inboundListing: 'inboundListing',
  outboundListing: 'outboundListing',
  warehouseListing: 'warehouseListing',
  search: 'search',
  noaccess: 'noaccess',
  dashboard: 'dashboard',
  inboundWip: 'inboundWip',
  outboundWip: 'outboundWip',
  inboundShipmentDetails: 'inboundShipmentDetails',
  shipmentListing: 'shipmentListing',
  distributionOrders: 'distributionOrders',
  distributionOrdersListing: 'distributionOrdersListing',
  financials: 'financials',
  movementShipments: 'movementShipments',
  freightShipments: 'freightShipments',
  freightShipmentsListing: 'freightShipmentsListing',
  cancelledShipments: 'cancelledShipments',
};

export const ROLLUP_GRP_KEYS = {
  shipments: 'shipments',
  inTransit: 'inTransit',
  receiving: 'receiving',
  putaway: 'putaway',
  inProcess: 'inProcess',
  delivered: 'delivered',
  created: 'created',
  warehouse: 'warehouse',
  departure: 'departure',
  asn_created: 'asncreated',
};

export const SHIPMENT_TYPE = {
  inbound: 'inbound',
  outbound: 'outbound',
  movement: 'movement',
};

export const ADDRESS_TYPE = {
  origin: 'origin',
  destination: 'destination',
};

export const SEARCH_VARIATION = {
  inpage: 'inpage',
};

export const INBOUNDTYPE = {
  asn: 'ASN',
  transportOrder: 'Transport Order',
};

export const IbMarkPreviousCompletedList = ['delivery', 'delivered'];

export const ObMarkPreviousCompletedList = ['delivery', 'delivered'];

export const API_HEADER_KEYS = {
  X_SCS_XSRF_TOKEN: 'X-SCS-XSRF-TOKEN',
  X_SCS_EUSER: 'X-SCS-EUSER',
  X_XSRF_TOKEN: 'X-XSRF-TOKEN',
  Authorization: 'Authorization',
};

export const DATE_FORMAT = 'YYYY/MM/DD';

export const CUSTOM_RANGE_OPTION_VALUE = -1;

export const MULTI_SELECT_ALL = 'ALL';

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';
export const LEARN_MORE_DATE_FORMAT = 'dd-MMM-yyyy';

export const DATE_FORMAT_WITH_HOURS = 'yyyy-MM-dd HH:mm';

export const INTERNATIONAL_SHIPMENT = 'International';

export const PARTIALLY_CANCELLED_SHIPMENT_YES = 'y';

export const TOP_FIVE_ELEMENTS = 5;

export const TOP_EIGHT_ELEMENTS = 8;

export const TOP_TEN_ELEMENTS = 10;

export const MONTH_TO_DATE_OPTION_VALUE = 'MTD';

export const DECIMAL_NUMBER_DEFAULT_FORMAT = '1.2-2';

export const DECIMAL_NUMBER_FORMAT = '1.0-2';

export const PLACEMENTS = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
};

export const VIEW_MORE = {
  popoverMaxItems: 9,
  popoverColumns: 2,
  modalColumns: 3,
  referencesType: 'REFERENCES',
  referencesLimit: '6',
  temperature: 'TEMPERATURE',
  contactTooltip: 'contactTooltip',
};

export const VIEW_MORE_VARIATIONS = {
  modalVariation: 'viewMoreDataModal',
  multiValuetooltipVariation: 'multiValueTooltip',
  multiKeyValueTooltipVariation: 'multiKeyValueTooltip',
};

export const FILTER_TYPES = {
  DATE_RANGE: 'dateRange',
  MILESTONE: 'milestone',
  DEFAULT: 'default',
  MULTI_SELECT: 'multi-select-dropdown',
  MULTI_CHECKBOX: 'multi-select-checkbox',
  SINGLE_SELECT: 'select-dropdown',
  STATUS: 'status',
};

export const PAGE_KEYS = {
  billing: 'billing',
  dashboard_gff_hld: 'dashboard_gff_hld',
  dashboard_gld: 'dashboard_gld',
  hamburger: 'hamburger',
  inbound_summary: 'inbound_summary',
  inbound_shipment_detail: 'inbound_shipment_detail',
  outbound_summary: 'outbound_summary',
  outbound_shipment_detail: 'outbound_shipment_detail',
  shipments_shipment_detail: 'shipments_shipment_detail',
  shipments_mov_summary: 'shipments_mov_summary',
  shipments_financials: 'shipments_financials',
  shipments_listing: 'shipments_listing',
  shipments_exceptions: 'shipments_exceptions',
  shipments_distribution_orders: 'shipments_distribution_orders',
  shipments_distribution_orders_listing:
    'shipments_distribution_orders_listing',
  shipments_freight_shipments: 'shipments_freight_shipments',
  shipments_freight_shipments_listing: 'shipments_freight_shipments_listing',
  warehouse_inventory: 'warehouse_inventory',
  warehouse_inventory_item_availability:
    'warehouse_inventory_item_availability',
  search_item_availability: 'search_item_availability',
  warehouse_inventory_results: 'warehouse_inventory_results',
  warehouse_inventory_lookup_results: 'warehouse_inventory_lookup_results',
  warehouse_dashboard: 'warehouse_dashboard',
  warehouse_inbound: 'warehouse_inbound',
  warehouse_outbound: 'warehouse_outbound',
  reports: 'reports',
  cancelled_shipments_listing: 'cancelled_shipments_listing',
};

export const MODULE_NAMES = {
  dashboard: 'dashboard',
  outbound: 'outbound',
  inbound: 'inbound',
  warehouse: 'warehouse',
  reports: 'reports',
  search: 'search',
  billing: 'billing',
  shipments: 'shipments',
  brokerage: 'brokerage',
};

export const ENTRY_DETAILS_URL = '/scs/ucp/entries?tracking=';
export const ENTRY_DETAILS_BUSINESS_ID = '&businessID=';
export const ENTRY_DETAILS_PROCESSING_COUNTRY = '&processingCountry=';
export const ENTRY_DETAILS_SOURCE = '&source=GLD';
export const ITEM_SEARCH_MIN_CHARACTERS = 4;

export const DELIVERED_STATUS = {
  onTime: 'OnTime',
  late: 'Late',
};

export const SHIPMENT_CONNECTION = {
  managedInboundFG: 'managedInboundFG',
  nonManagedInboundFG: 'nonManagedInboundFG',
  nonManagedInboundPS: 'nonManagedInboundPS',
  managedOutboundFG: 'managedOutboundFG',
  nonManagedOutboundFG: 'nonManagedOutboundFG',
  managedOutboundPS: 'managedOutboundPS',
  nonManagedOutboundPS: 'nonManagedOutboundPS',
  hld: 'HLD',
  gffAir: 'GFFAir',
  gffOcean: 'GFFOcean',
};

export const FILTER_CHIPS_TO_SHOW = {
  desktop: 15,
  mobile: 5,
};

export const SHIPMENT_CONNECTION_NAMES = {
  shipmentDetails: 'Shipment Details',
  items: 'Items',
  asn: 'ASN',
  purchaseOrders: 'Purchase Orders',
};
export const MilestoneStatus = {
  pending: 'Pending',
  rated: 'Rated',
  booked: 'Booked',
  inTransit: 'In Transit',
  importCustoms: 'Import Customs',
  exportCustoms: 'Export Customs',
  customs: 'Customs',
  delivered: 'Delivered',
  asnCreated: 'ASN Created',
  ftz: 'FTZ',
  receiving: 'Receiving',
  putaway: 'Putaway',
  pickup: 'Pickup',
  departure: 'Departure',
  arrival: 'Arrival',
  delivery: 'Delivery',
};

export const IS_CUSTOM_ENTRIES_SEARCH_ALLOWED = true;

export const SEARCH_BY_INVENTORY_NO = 'inventoryBatchNumber';

export const WAREHOUSE_BATCH_LOOKUP = {
  warehouseSource: 'warehouse',
  inventorySource: 'inventory',
};
export const FE_CONFIG_KEY_NAME = 'FEConfigurationKeys';

export const US_LOCALE = 'en-US';

export const NO_WIDGET_TEMPLATE = 'noWidgetSelectedTemplate';
