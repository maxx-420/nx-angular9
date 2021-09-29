// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

export interface IPersistentFilterSchema {
  value: any;
  apiKey: string;
  label: string;
  key: string;
  selectedOption: number;
  filterType: string;
}

export interface IPersistentDateFilterSchema {
  value: {
    startDate: string;
    endDate: string;
  };
  apiKey: string;
  label: string;
  key: string;
  selectedOption: number;
  filterType: string;
}
