// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

const INBOUND = 'inbound';
const OUTBOUND = 'outbound';

export const ConfigData = {
  country: '250',
  language: '6',
  debounceTime: 200,
  digitalPlatform: ['digital-platform', 'digital-core'],
  gldPlatform: ['gld-platform'],
  gldOutbound: ['gld-outbound'],
  gldInbound: ['gld-inbound'],
  gldWarehouse: ['gld-warehouse'],
  gldReports: ['gld-reports'],
  gldBilling: ['gld-billing'],
  gldBrokerage: ['gld-brokerage'],
  gldShipments: ['gld-shipments'],
  footerHtmlFragement: 'symphony-footer-html-fragment',
  topBannerHtmlFragement: 'topBanner',
};

export const FILTER_CONFIGURATIONS = {
  shipmentTypeOptions: [
    {
      value: INBOUND,
      viewValue: 'lbl_inbound_shipments_filters_title',
    },
    {
      value: OUTBOUND,
      viewValue: 'lbl_outbound_shipments_filters_title',
    },
  ],
  shptTypWHConvergenceOptions: [
    {
      value: INBOUND,
      viewValue: 'lbl_ib_asn_shpt_filters_title',
    },
    {
      value: OUTBOUND,
      viewValue: 'lbl_ob_distr_shpt_filters_title',
    },
  ],

  dateFilterOptions: [
    {
      value: 2,
      viewValue: 'lbl_filter_last_24_hours',
    },
    {
      value: 7,
      viewValue: 'lbl_filter_last_7_days',
    },
    {
      value: 14,
      viewValue: 'lbl_filter_last_14_days',
    },
    {
      value: 30,
      viewValue: 'lbl_filter_last_30_days',
    },
    {
      value: 60,
      viewValue: 'lbl_filter_last_60_days',
    },
    {
      value: -1,
      viewValue: 'lbl_filter_custom_range',
    },
  ],
  chartDateFilterOptions: [
    {
      value: 7,
      viewValue: 'lbl_filter_7_days',
    },
    {
      value: 14,
      viewValue: 'lbl_filter_14_days',
    },
    {
      value: 30,
      viewValue: 'lbl_filter_30_days',
    },
    {
      value: 60,
      viewValue: 'lbl_filter_60_days',
    },
    {
      value: -1,
      viewValue: 'lbl_filter_custom_range',
    },
  ],
};

export const MTD_FILTER_CONFIGURATION = {
  dateFilterOptions: [
    {
      value: 'MTD',
      label: 'lbl_filter_MTD',
      isCmsLabel: true,
    },
    {
      value: 'MTD-1',
      label: 'lbl_filter_MTD-1',
      isCmsLabel: true,
    },
    {
      value: 'MTD-2',
      label: 'lbl_filter_MTD-2',
      isCmsLabel: true,
    },
  ],
};

export const MTD_FILTER_TYPES = {
  MTD: 'MTD',
  'Previous Month': 'MTD-1',
  '2 Months ago': 'MTD-2',
};

export const MOVEMENT_FILTER_CONFIGURATION = {
  dateFilterOptions: [
    {
      value: 2,
      label: 'lbl_filter_last_24_hours',
      isCmsLabel: true,
    },
    {
      value: 7,
      label: 'lbl_filter_last_7_days',
      isCmsLabel: true,
    },
    {
      value: 14,
      label: 'lbl_filter_last_14_days',
      isCmsLabel: true,
    },
    {
      value: 30,
      label: 'lbl_filter_last_30_days',
      isCmsLabel: true,
    },
    {
      value: 60,
      label: 'lbl_filter_last_60_days',
      isCmsLabel: true,
    },
    {
      value: -1,
      label: 'lbl_filter_custom_range',
      isCmsLabel: true,
    },
  ],
};

export const MOVEMENT_FILTER_CONFIGURATION_NEXT = {
  dateFilterOptions: [
    {
      value: -2,
      label: 'lbl_filter_next_24_hours',
      isCmsLabel: true,
    },
    {
      value: -7,
      label: 'lbl_filter_next_7_days',
      isCmsLabel: true,
    },
    {
      value: -14,
      label: 'lbl_filter_next_14_days',
      isCmsLabel: true,
    },
    {
      value: -30,
      label: 'lbl_filter_next_30_days',
      isCmsLabel: true,
    },
    {
      value: -60,
      label: 'lbl_filter_next_60_days',
      isCmsLabel: true,
    },
    {
      value: -1,
      label: 'lbl_filter_custom_range',
      isCmsLabel: true,
    },
  ],
};

export const ShipmentTypeConfig = {
  outbound: 'outbound',
  inbound: 'inbound',
};

export const MAX_RECORDS = 150;

export const SESSION_CONFIG = {
  sessionStorageKey: 'UserProfile',
  inactivityTimeout: 30, // Minutes
  inactivityCheckTimeout: 20, // Seconds
  inactivityCounterKeyName: 'LastActivityTimestamp',
  configStorageKey: 'Configs',
  cacheConfigKey: 'cacheConfig',
  inclusionsKey: 'inclusionDetails',
  dashboardExperience: 'dashboardExperience',
  reportExperience: 'reportExperience',
  warehouseExperience: 'warehouseExperience',
};

export const LASSO_URLS = {
  logout: 'https://www.ups.com/lasso/logout',
  login: 'https://www.ups.com/lasso/login',
};

export const MODAL_CONFIG = {
  panelClass: 'symphony-modalbox',
  disableClose: true,
  autoFocus: true,
};

// prod app config keys
export const PROD_APP_CONFIG_KEYS = {
  isAppInsightLogEnabled: false,
  appInsightsInstrumentationKey: '90b1eeed-c78c-4026-8eb0-fdf52a6d3fd4',
  googleMapsApiKey: 'AIzaSyC0Joh1RAj2d3ikO3g9WFLNuWlZANxcbGI',
  googleMapsUrl: 'https://maps.googleapis.com/maps/api/js?v=weekly&key=',
  geoCodeUrl: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
};

// non-prod app config keys
export const NON_PROD_APP_CONFIG_KEYS = {
  isAppInsightLogEnabled: false,
  appInsightsInstrumentationKey: 'e8b5f885-8288-4926-83bc-527cee85ca95',
  googleMapsApiKey: 'AIzaSyCwe1FEXWKuKC3KIWRZROyFRprYLyRjIYs',
  googleMapsUrl: 'https://maps.googleapis.com/maps/api/js?v=weekly&key=',
  geoCodeUrl: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
};

/**
 * keeping common config variations here
 * and reusing them.
 */
const COMMON_SHIPMENT_TYPE_CONFIG = {
  variation1: {
    MI: [
      'WH-MANTRAN-IN-INT',
      'WH-MANTRAN-IN-DOM',
      'WH-MANTRAN-IN-INT-FTZ',
      'WH-MANTRAN-IN-DOM-FTZ',
    ],
    NMI: ['WH-IN'],
    MO: [
      'WH-MANTRAN-OUT-INT',
      'WH-MANTRAN-OUT-DOM',
      'WH-MANTRAN-OUT-DOM-PS',
      'WH-MANTRAN-OUT-INT-PS',
    ],
    NMO: ['WH-OUT'],
  },
};

/**
 * there was a ask in story UPSGLD-6910 to make a separate
 * config for different product lines, as template type
 * values can differ for HLD and GLD.
 */
export const SHIPMENT_TYPES_CONFIG = {
  'GLD@*@*': COMMON_SHIPMENT_TYPE_CONFIG.variation1,
  'HLD@*@*': COMMON_SHIPMENT_TYPE_CONFIG.variation1,
  'HLD_GFF@*@*': COMMON_SHIPMENT_TYPE_CONFIG.variation1,
  'GLD_GFF@*@*': COMMON_SHIPMENT_TYPE_CONFIG.variation1,
};

export const SUB_NAV_OPTIONS = {
  viewingAs: 'viewingAs',
  dateRange: 'dateRange',
  account: 'account',
  contactUs: 'contactUs',
  admin: 'admin',
  signOut: 'signOut',
};

export const DEFAULT_SELECTED_DATE_RANGE = 7;

export const CACHE_CONFIG_KEYS = {
  l3CacheEnabled: 'false',
};

export const CACHE_CONFIG_L3_KEY = 'CacheConfigurationKeys';

export const PAGE_SPECIFC_HEADER_CONFIG = {
  showlogoTextForModules: [
    'shipments',
    'outbound',
    'inbound',
    'warehouse',
    'reports',
  ],
};

export const GOOGLE_MAP_CONFIG = {
  googleMapsUrl: 'googleMapsUrl',
  googleMapsApiKey: 'googleMapsApiKey',
  geoCodeUrl: 'geoCodeUrl',
  l3CacheEnabled: 'l3CacheEnabled',
};

export const DASHBOARD_EXPERIENCE_CONFIG = {
  convergenceExperience: 'new',
  oldExperiences: 'old',
};

export const REPORT_EXPERIENCE_CONFIG = {
  convergenceExperience: 'new',
  oldExperience: 'old',
};

export const WAREHOUSE_EXPERIENCE_CONFIG = {
  convergenceExperience: 'new',
  oldExperiences: 'old',
};

export const BATCH_CONFIG = {
  reasonCodes: ['recalled', 'expired', 'quarantine', 'quality', 'others'],
  status: ['Held', 'Released'],
  quarantine: 'Quarantine',
};
