// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { ExportDataTable } from './dataTableExport.util';
import CommonUtility from './commonUtil';
import { FileUtility } from './file.utility';
import { WindowUtility } from './window.utility';
const displayColumns = ['customerPONumber', 'totalCharge'];
const PAGE_NAME = 'Movement Shipments';
const APP_NAME = 'Symphony';
const columnInfo = {
  customerPONumber: {
    displayLabel: 'lbl_shipment_l2_PONumber',
    transformLabel: true,
    styleClass: 'nowrap',
  },
  totalCharge: {
    displayLabel: 'Total Charge',
    transformLabel: true,
    styleClass: 'nowrap',
    type: 'custom',
    exportDataAccessor: (columnData, rowData) => {
      let data: string = '';
      if (rowData?.totalChargeCurrency && rowData?.totalCharge) {
        data = `${
          rowData.totalChargeCurrency
        } ${CommonUtility.getFormattedCostString(columnData)}`;
      }
      if (rowData?.isClaim === 'Y') {
        data += ` Has Claims`;
      }
      return data;
    },
  },
};
const dataSource = [
  {
    upsShipmentNumber: 'SN7312458',
    referenceNumber: null,
    carrierShipmentNumber: ['T20802'],
    customerPONumber: ['T', '2', '0', '8', '0', '2'],
    upsFileNumber: null,
    upsOffice: null,
    milestoneStatus: 'DELIVERED',
    shipmentType: 'MOVEMENT',
    mode: 'TL',
    createdOnDatetime: '2021-06-07 10:40:00',
    pickupDatetime: '2021-06-07 18:32:00',
    scheduledDeliveryDatetime: '2021-06-08 15:00:00',
    deliveryETADatetime: null,
    bookedDatetime: null,
    service: 'Standard',
    equipmentType: 'Controlled Temperature Trailer (Reefer) (RT)',
    origin: {
      line1: '300 QUALITY CIRCLE',
      line2: '',
      city: 'HARRISBURG',
      zipCode: '17112',
      country: 'US',
      state: 'PA',
    },
    destination: {
      line1: null,
      line2: null,
      city: null,
      zipCode: null,
      country: null,
      state: null,
    },
    lastKnownLocation: null,
    destinationCode: null,
    containerLoad: null,
    originCode: null,
    deliveryStatus: 'ONTIME',
    loadId: 'LD7430068',
    productLine: 'HLD',
    accountType: 'MM',
    totalCharge: '2695',
    totalChargeCurrency: 'USD',
    isClaim: 'Y',
    originCity: 'HARRISBURG',
    originCountry: 'US',
    destinationCity: null,
    destinationCountry: null,
  },
  {
    upsShipmentNumber: 'SN7312261',
    referenceNumber: null,
    carrierShipmentNumber: ['10576276'],
    customerPONumber: ['1', '0', '5', '7', '6', '2', '7', '6'],
    upsFileNumber: null,
    upsOffice: null,
    milestoneStatus: 'DELIVERED',
    shipmentType: 'MOVEMENT',
    mode: 'TL',
    createdOnDatetime: '2021-06-07 10:24:00',
    pickupDatetime: '2021-06-07 17:30:00',
    scheduledDeliveryDatetime: '2021-06-08 15:00:00',
    deliveryETADatetime: null,
    bookedDatetime: null,
    service: 'Standard',
    equipmentType: 'Controlled Temperature Trailer (Reefer) (RT)',
    origin: {
      line1: '5 Bradley Drive',
      line2: null,
      city: 'Westbrook',
      zipCode: '04092',
      country: 'US',
      state: 'ME',
    },
    destination: {
      line1: null,
      line2: null,
      city: null,
      zipCode: null,
      country: null,
      state: null,
    },
    lastKnownLocation: null,
    destinationCode: null,
    containerLoad: null,
    originCode: null,
    deliveryStatus: 'LATE',
    loadId: 'LD7429865',
    productLine: 'HLD',
    accountType: 'MM',
    totalCharge: '6045',
    totalChargeCurrency: 'USD',
    isClaim: 'N',
    originCity: 'Westbrook',
    originCountry: 'US',
    destinationCity: null,
    destinationCountry: null,
  },
];
const tableData = [
  {
    upsShipmentNumber: 'SN7312458',
    referenceNumber: null,
    carrierShipmentNumber: ['T20802'],
    customerPONumber: ['T', '2', '0', '8', '0', '2'],
    upsFileNumber: null,
    upsOffice: null,
    milestoneStatus: 'DELIVERED',
    shipmentType: 'MOVEMENT',
    mode: 'TL',
    createdOnDatetime: '2021-06-07 10:40:00',
    pickupDatetime: '2021-06-07 18:32:00',
    scheduledDeliveryDatetime: '2021-06-08 15:00:00',
    deliveryETADatetime: null,
    bookedDatetime: null,
    service: 'Standard',
    equipmentType: 'Controlled Temperature Trailer (Reefer) (RT)',
    origin: {
      line1: '300 QUALITY CIRCLE',
      line2: '',
      city: 'HARRISBURG',
      zipCode: '17112',
      country: 'US',
      state: 'PA',
    },
    destination: {
      line1: null,
      line2: null,
      city: null,
      zipCode: null,
      country: null,
      state: null,
    },
    lastKnownLocation: null,
    destinationCode: null,
    containerLoad: null,
    originCode: null,
    deliveryStatus: 'Delivered On Time',
    loadId: 'LD7430068',
    productLine: 'HLD',
    accountType: 'MM',
    totalCharge: 'USD 2,695.00 Has Claims',
    totalChargeCurrency: 'USD',
    isClaim: 'Y',
    originCity: 'HARRISBURG',
    originCountry: 'US',
    destinationCity: null,
    destinationCountry: null,
  },
  {
    upsShipmentNumber: 'SN7312261',
    referenceNumber: null,
    carrierShipmentNumber: ['10576276'],
    customerPONumber: ['1', '0', '5', '7', '6', '2', '7', '6'],
    upsFileNumber: null,
    upsOffice: null,
    milestoneStatus: 'DELIVERED',
    shipmentType: 'MOVEMENT',
    mode: 'TL',
    createdOnDatetime: '2021-06-07 10:24:00',
    pickupDatetime: '2021-06-07 17:30:00',
    scheduledDeliveryDatetime: '2021-06-08 15:00:00',
    deliveryETADatetime: null,
    bookedDatetime: null,
    service: 'Standard',
    equipmentType: 'Controlled Temperature Trailer (Reefer) (RT)',
    origin: {
      line1: '5 Bradley Drive',
      line2: null,
      city: 'Westbrook',
      zipCode: '04092',
      country: 'US',
      state: 'ME',
    },
    destination: {
      line1: null,
      line2: null,
      city: null,
      zipCode: null,
      country: null,
      state: null,
    },
    lastKnownLocation: null,
    destinationCode: null,
    containerLoad: null,
    originCode: null,
    deliveryStatus: 'Delivered Late',
    loadId: 'LD7429865',
    productLine: 'HLD',
    accountType: 'MM',
    totalCharge: 'USD 6,045.00',
    totalChargeCurrency: 'USD',
    isClaim: 'N',
    originCity: 'Westbrook',
    originCountry: 'US',
    destinationCity: null,
    destinationCountry: null,
  },
];
describe('customEncoder', () => {
  let excelXML = new ExportDataTable(
    dataSource,
    displayColumns,
    columnInfo,
    APP_NAME,
    PAGE_NAME,
    ''
  );

  it('should test createXMLData', () => {
    const rowValue = 'LD7430068';
    const expected = `<ss:Data ss:Type="String">${rowValue}</ss:Data>`;
    const result = excelXML['createXMLData'](rowValue);
    expect(result).toEqual(expected);
  });

  it('should test createXMLCell', () => {
    const rowValue = 'LD7430068';
    const expected = `<ss:Cell>${excelXML['createXMLData'](
      rowValue
    )}</ss:Cell>`;
    const result = excelXML['createXMLCell'](rowValue);
    expect(result).toEqual(expected);
  });

  it('should test dataCells', () => {
    const expected =
      '<ss:Cell><ss:Data ss:Type="String">T,2,0,8,0,2</ss:Data></ss:Cell><ss:Cell><ss:Data ss:Type="String">USD 2,695.00 Has Claims</ss:Data></ss:Cell>';
    const result = excelXML['dataCells'](displayColumns, tableData[0]);
    expect(result).toEqual(expected);
  });

  it('should test downloadExcelForIE', () => {
    window.navigator.msSaveOrOpenBlob = () => {
      return true;
    };
    const spy = spyOn(WindowUtility, 'msSaveOrOpenFile');
    excelXML.download();
    expect(spy).toHaveBeenCalled();
  });

  it('should test downloadExcel', () => {
    window.navigator.msSaveOrOpenBlob = null;
    excelXML.download();
    expect(excelXML.link).not.toBeUndefined();
  });

  it('should test headCells', () => {
    const expected =
      '<ss:Cell><ss:Data ss:Type="String">CUSTOMERPONUMBER</ss:Data></ss:Cell><ss:Cell><ss:Data ss:Type="String">TOTALCHARGE</ss:Data></ss:Cell>';
    const result = excelXML['headCells'](displayColumns);
    expect(result).toEqual(expected);
  });

  it('should test createXMLRow', () => {
    const dataCells = excelXML['dataCells'](displayColumns, tableData[0]);
    const expected = `<ss:Row>${dataCells}</ss:Row>`;
    const result = excelXML['createXMLRow'](tableData[0], displayColumns);
    expect(result).toEqual(expected);
  });

  it('should test createXMLRowHead', () => {
    const headCells = excelXML['headCells'](displayColumns);
    const expected = `<ss:Row ss:StyleID="1">${headCells}</ss:Row>`;
    const result = excelXML['createXMLRowHead'](1, displayColumns);
    expect(result).toEqual(expected);
  });

  it('should test createXMLColumn', () => {
    const expected = `<ss:Column ss:AutoFitWidth="0" ss:Width="140"/>`;
    const result = excelXML['createXMLColumn'](140);
    expect(result).toEqual(expected);
  });

  it('should test formatTableData', () => {
    const expected = tableData[0].totalCharge;
    const result = excelXML['formatTableData'](
      dataSource,
      'totalCharge',
      columnInfo
    );
    expect(result[0].totalCharge).toEqual(expected);
  });

  it('should test createXMLStyles', () => {
    const expected = `<ss:Styles><ss:Style ss:ID="${excelXML.styleID}"><ss:Font ss:Bold="1"/></ss:Style></ss:Styles>`;
    const result = excelXML['createXMLStyles'](excelXML.styleID).trim();
    expect(result).toEqual(expected);
  });

  it('should test downLoad', () => {
    excelXML.download();
    expect(excelXML.workbook).not.toEqual(undefined);
  });

  it('should test createXMLTable', () => {
    const expected =
      '<ss:Table><ss:Column ss:AutoFitWidth="0" ss:Width="140"/><ss:Column ss:AutoFitWidth="0" ss:Width="140"/><ss:Row ss:StyleID="1"><ss:Cell><ss:Data ss:Type="String">LBL_SHIPMENT_L2_PONUMBER</ss:Data></ss:Cell><ss:Cell><ss:Data ss:Type="String">TOTAL CHARGE</ss:Data></ss:Cell></ss:Row>undefined<ss:Row><ss:Cell><ss:Data ss:Type="String">T,2,0,8,0,2</ss:Data></ss:Cell><ss:Cell><ss:Data ss:Type="String">USD 2,695.00 Has Claims</ss:Data></ss:Cell></ss:Row><ss:Row><ss:Cell><ss:Data ss:Type="String">1,0,5,7,6,2,7,6</ss:Data></ss:Cell><ss:Cell><ss:Data ss:Type="String">USD 6,045.00</ss:Data></ss:Cell></ss:Row></ss:Table>';
    const result = excelXML['createXMLTable'](
      excelXML.fileString,
      excelXML.displayedColumns,
      excelXML.columnInfo,
      excelXML.columnWidth
    );
    expect(result.startsWith('<ss:Table>')).toBeTruthy();
  });
});
