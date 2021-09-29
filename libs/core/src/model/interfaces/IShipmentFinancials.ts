// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

export interface IFinancialsSummary {
  basicSummary: IBasicSummary[];
  laneSummary: ILaneSummary[];
  carrierSummary: ICarrierSummary[];
  shipmentModeSummary: IShipmentModeSummary[];
  dailySummary: IDailySummary[];
  errorDetails: any[];
  success: boolean;
}

interface IBasicSummary {
  totalcustomerCharge: string;
  totalcustomerChargeCurrency: string;
  averageCostPerShipment: string;
  averageCostPerUnit: string;
  averageCostPerShipmentForDifferential: string;
  averageCostPerUnitForDifferential: string;
  numberOfClaims: string;
}

export interface ILaneSummary {
  totalcustomerCharge: string;
  totalcustomerChargeCurrency: string;
  originCity: string;
  originCountry: string;
  destinationCity: string;
  destinationCountry: string;
}

export interface ICarrierSummary {
  carrierName: string;
  totalcustomerCharge: string;
  totalcustomerChargeCurrency: string;
  averageCostPerShipment: string;
  averageCostPerUnit: string;
  averageCostPerMile: string;
  averageCostPerWeight: string;
  averageCostPerSKU: string;
}

interface IShipmentModeSummary {
  shipmentMode: string;
  totalcustomerCharge: string;
  averageCostPerShipment: string;
  averageCostPerUnit: string;
  averageCostPerShipmentForDifferential: string;
  averageCostPerUnitForDifferential: string;
}
interface IDailySummary {
  date: string;
  totalcustomerCharge: string;
  averageCostPerShipment: string;
  averageCostPerUnit: string;
  averageCostPerMile: string;
  averageCostPerWeight: string;
  averageCostPerSKU: string;
  shipmentMode: string;
}
