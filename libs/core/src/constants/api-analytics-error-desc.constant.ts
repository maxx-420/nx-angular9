// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Constants for api to error message mappings

export const API_ERROR_DESC_MAPPING = [
  {
    endPoint: '/api/gldinbound/v1.0/shipments/summary',
    errorMessage:
      'Inbound Summary Api has failed. Some widgets on the page will show error.',
  },
  {
    endPoint: '/api/gldinbound/v1.0/Shipments',
    errorMessage:
      'Inbound Shipment Api has failed. Shipment table widget on the page will show error.',
  },
  {
    endPoint: '/api/gldinbound/v1.0/shipments/milestones',
    errorMessage:
      'Inbound Milestone Api has failed. Milestones widget on the page will show error.',
  },
  {
    endPointRegex: '^/api/gldinbound/v1.0/Shipments/[0-9]+$',
    errorMessage:
      'Inbound Shipment Details Api has failed. Shipment Details page will show error.',
  },
  {
    endPointRegex:
      '^/api/gldinbound/v1.0/Shipments/[0-9]+/milestones/[a-zA-Z]+$',
    errorMessage:
      'Inbound Milestones Api for Shipment Details has failed. Activity Feeds widget will show error.',
  },
  {
    endPoint: '/api/gldoutbound/v1/shipments/summary',
    errorMessage:
      'Outbound Summary Api has failed. Some widgets on the page will show error.',
  },
  {
    endPoint: '/api/gldoutbound/v1/shipments/dailysummary',
    errorMessage:
      'Outbound Daily Summary Api has failed. Some widgets on the page will show error.',
  },
  {
    endPoint: '/api/gldoutbound/v1.0/Shipments',
    errorMessage:
      'Outbound Shipment Api has failed. Shipment table widget on the page will show error.',
  },
  {
    endPoint: '/api/gldoutbound/v1.0/Shipments/milestones',
    errorMessage:
      'Outbound Milestone Api has failed. Milestones widget on the page will show error.',
  },
  {
    endPoint: '/api/gldoutbound/v1/Shipments/cancelledshipments',
    errorMessage:
      'Outbound Cancelled Shipment Api has failed. Cancelled shipment widget on the page will show error.',
  },
  {
    endPointRegex: '^/api/gldoutbound/v1.0/Shipments/[0-9]+$',
    errorMessage:
      'Outbound Shipment Details Api has failed. Shipment Details page will show error.',
  },
  {
    endPointRegex:
      '^/api/gldoutbound/v1.0/Shipments/[0-9]+/milestones/[a-zA-Z]+$',
    errorMessage:
      'Outbound Milestones Api for Shipment Details has failed. Activity Feeds widget will show error.',
  },
  {
    endPoint: '/api/gldwarehouse/v1/warehouse',
    errorMessage:
      'Warehouse Listing Api has failed. Some widgets on the page will show error.',
  },
  {
    endPoint: '/api/glddocument/v1/Documents',
    errorMessage:
      'Billing Listing Api has failed. Documents table on the page will show error.',
  },
  {
    endPoint: '/api/gldplatform/v1/items/search',
    errorMessage:
      'Item Search Api has failed. Search results table on the page will show error.',
  },
  {
    endPoint: '/api/gldplatform/v1/shipments/search',
    errorMessage:
      'Search Api has failed. Search results table on the page will show error.',
  },
  {
    endPoint: '/api/gldplatform/v1/items',
    errorMessage:
      'Item Details Api has failed. Item Details table on the page will show error.',
  },
];
