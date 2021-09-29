// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

export interface IDataTableColumnProperties {
  displayLabel: string;
  styleClass?: string;
  styles?: any;
  style?: any;
  type?: string;
  customTemplate?: any;
  isSortable?: boolean;
  noUpperCase?: boolean;
  transformLabel?: boolean;
  sortingDataAccessor?: Function;
}

export interface ColumnInfo {
  [key: string]: IDataTableColumnProperties;
}
