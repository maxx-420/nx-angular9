// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

export interface IShippableUnit {
  description: IDescription | string;
  quantity: string;
  unitOfMeasurement: string;
  weight: IWeight;
  dimensions: IDimensions;
  temperatureDetails?: any;
  referenceTypes?: any;
}

interface IDescription {
  description: string;
  temperatureDetails: any;
  referenceTypes: any;
}

interface IWeight {
  weight: string;
  unitOfMeasurement: IUnitOfMeasurement;
}

interface IDimensions {
  length: string;
  width: string;
  height: string;
  unitOfMeasurement: IUnitOfMeasurement;
}

interface IUnitOfMeasurement {
  symbol: string;
  name: string;
}
