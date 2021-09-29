// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

export interface IComponentInclusion {
  companyDetails: any;
  inclusionDetails: Array<IInclusionDetails>;
  errorDetails: any;
  success: boolean;
}

export interface IInclusionDetails {
  page: string;
  module: string;
  templateType: string;
  componentList: Array<IComponentList>;
}

export interface IUpdateInclusionRequest {
  componentList: Array<IComponentList>;
}

export interface IComponentList {
  id: string;
  isDisplay: boolean;
}

export interface ISessionInclusions {
  [key: string]: boolean;
}

export interface IWidgetConfig {
  widgetId: string;
  title: string;
}

export interface ISelectorPanelConfiguration {
  id: string;
  isDisplay: boolean;
  viewValue: string;
}
export interface IInclusionConfiguration {
  [key: string]: any;
}
export interface IInclusionMappingId {
  [key: string]: string;
}
