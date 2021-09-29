// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

export interface ICompanyDetails {
  name: string;
  id: number;
  hasFtzAccess: boolean;
  eId: string;
  productLines: IProductLine[];
  unitName: string;
}

interface IProductLine {
  productType: string;
  serviceLines: IServiceLine[];
}

interface IServiceLine {
  serviceLineName: string;
}
