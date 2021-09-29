// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

export interface IFilterType {
  key: string;
  label: string;
  value: any;
  startDate: any;
  endDate: any;
  filterType: string;
  deliveryStatus?: string;
}

export interface DrilldownDateObject {
  key: string;
  value: {
    type: string;
    range?: number;
    startDate?: string;
    endDate?: string;
  };
}

export interface DrilldownStringObject {
  key: string;
  value: string[];
}
