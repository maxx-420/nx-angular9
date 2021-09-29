// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

export interface IRequestParamsInboundSummary {
  shipmentCreationStartDate?: string;
  shipmentCreationEndDate?: string;
  actualDeliveryStartDate?: string;
  actualDeliveryEndDate?: string;
  transportationType?: string;
  inboundType?: string;
  accountTypeId?: string;
  warehouseId?: string;
  startDate?: string;
  endDate?: string;
}

export interface IRequestParamsInboundMilestones {
  shipmentCreationStartDate?: string;
  shipmentCreationEndDate?: string;
  transportationType?: string;
}
