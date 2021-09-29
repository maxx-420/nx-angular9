// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

export const ShipmentDrilldownKeys = {
  shipmentCreation: 'shipmentCreation',
  shipmentBooked: 'shipmentBooked',
  status: 'status',
  shipmentMode: 'shipmentMode',
};

export const CustomLabelMapping = {
  'Delivered Late': 'late',
  'Delivered On Time': 'ontime',
};

export const linksDrilldownKeys = {
  onTime: ['ON TIME'],
  late: ['LATE'],
};
export const DeliveryStatusMapping = {
  'ON TIME': 'onTime',
  LATE: 'late',
  'Delivered On Time': 'onTime',
  'Delivered Late': 'late',
};

export const DropdownOptions = [
  { value: 'On Time Performance', viewValue: 'On Time Performance' },
  {
    value: 'On Time Performance by Mode',
    viewValue: 'On Time Performance by Mode',
  },
];

export const ShipmentChartData = {
  deliveryPerformanceSummary: {
    modesAvailable: ['Delivered On Time', 'Delivered Late'],
    shipmentData: [],
  },
};

export const AttributesToFetchData = {
  chart: ['name', 'count'],
  modal: ['name', 'percent'],
};

export const ResponseKey = 'deliveryPerformanceSummary';

export const MilestoneDelivered = 'delivered';

export const dataAutomationAttr = 'on-time-performance';

export const ModalConfig = {
  modalTitleDefault: 'On Time Performance*',
  modalTitleMode: 'On Time Performance By Mode*',
  contentHtmlKeyDefault: 'lbl_performance_donut_chart_html',
  contentHtmlKeyMode: 'lbl_performance_bar_chart_html',
};

export const CustomLabelMappingModal = {
  ONTIME: 'Delivered On Time',
  LATE: 'Delivered Late',
};

export const modesCountLimit = 5;
