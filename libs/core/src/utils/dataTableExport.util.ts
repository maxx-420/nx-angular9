// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import formatDate from '../utils/formatDate';

import { FileUtility } from './file.utility';
import { WindowUtility } from './window.utility';

const EXPORT_FORMAT: string = 'exportDataAccessor';
const DATE_FORMAT: string = 'MMddyyyy_hhmm';
const EXCEL_FORMAT: string = '.xls';
export class ExportDataTable {
  displayedColumns: any[];
  columnInfo: any = null;
  fileString: string = '';
  sheetName: string = '';
  styleID: number = 1;
  fileName: string = '';
  columnWidth: number = 140;
  uri: string = '';
  link: HTMLAnchorElement;
  workbook: string = `<?xml version="1.0" encoding="UTF-8"?><ss:Workbook  xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">`;
  WorkbookStart: string = this.workbook;
  WorkbookEnd: string = '</ss:Workbook>';

  constructor(
    dataSource: any[],
    displayedColumnsData: any[],
    columnInfoData: any,
    appLabel: string,
    pageName: string,
    sheetName: string
  ) {
    this.displayedColumns = displayedColumnsData;
    this.columnInfo = columnInfoData;
    this.sheetName = sheetName || pageName;
    this.fileName = `${appLabel ? appLabel + '_' : ''}${
      pageName ? pageName + '_' : ''
    }${formatDate(new Date(), DATE_FORMAT)}`;
    this.fileString = JSON.stringify(dataSource)?.replace(/&/gi, '&amp;');
  }

  /**
   * download an excel file
   */
  download(): void {
    const worksheet: string = this.createXMLWorkSheet(
      this.sheetName,
      this.fileString,
      this.displayedColumns,
      this.columnInfo,
      this.columnWidth
    );
    this.WorkbookStart += this.createXMLStyles(this.styleID);
    this.workbook = this.WorkbookStart + worksheet + this.WorkbookEnd;
    WindowUtility.msSaveOrOpenFileSupported
      ? this.downloadExcelForIE()
      : this.downloadExcel();
  }

  /**
   * Download excel for Internet explorer
   */
  downloadExcelForIE(): void {
    const fileBlob: Blob = new Blob([this.workbook], {
      type: FileUtility.getFileType(this.fileName + EXCEL_FORMAT),
    });
    WindowUtility.msSaveOrOpenFile(fileBlob, this.fileName + EXCEL_FORMAT);
  }

  /**
   * Download excel for other browsers
   */
  downloadExcel(): void {
    this.uri =
      'data:text/xls;charset=utf-8,' + encodeURIComponent(this.workbook);
    this.link = document.createElement('a');
    this.link.href = this.uri;
    this.link.style.display = 'none';
    this.link.download = this.fileName + EXCEL_FORMAT;
    document.body.appendChild(this.link);
    this.link.click();
    document.body.removeChild(this.link);
  }

  /**
   * Creates a worksheet
   * @param sheetName name of the sheet when we open excel
   * @param fileString name of file
   * @param displayedColumns columns to be shown
   * @param columnInfo info of columns
   * @param columnWidth width of column
   */
  private createXMLWorkSheet(
    sheetName: string,
    fileString: string,
    displayedColumns: any[],
    columnInfo: {},
    columnWidth: number
  ): string {
    return `<ss:Worksheet ss:Name="${sheetName}">${this.createXMLTable(
      fileString,
      displayedColumns,
      columnInfo,
      columnWidth
    )}</ss:Worksheet>`;
  }

  /**
   * creates xml styles
   * // change the method name
   * @param id style id
   */
  private createXMLStyles(id: number): string {
    return `<ss:Styles><ss:Style ss:ID="${id}"><ss:Font ss:Bold="1"/></ss:Style></ss:Styles>`;
  }

  /**
   * creates xml tables
   * @param fileString name of file
   * @param displayedColumns columns to be shown
   * @param columnInfo info of columns
   * @param columnWidth width of column
   */
  private createXMLTable(
    fileString: string,
    displayedColumns: any[],
    columnInfo: {},
    columnWidth: number
  ): string {
    const tableData: any[] = JSON.parse(fileString);
    return `<ss:Table>${this.generateTableData(
      tableData,
      displayedColumns,
      columnInfo,
      columnWidth
    )}</ss:Table>`;
  }

  private generateTableData(
    tableData: any[],
    displayedColumns: any[],
    columnInfo: {},
    columnWidth: number
  ): string {
    let tableStart: string = '';
    if (tableData.length > 0) {
      let rowData: string = '';
      const displaycol: string[] = [];
      tableStart += displayedColumns.reduce(
        (acc: string, columnName: string): string => {
          if (EXPORT_FORMAT in columnInfo[columnName]) {
            tableData = this.formatTableData(tableData, columnName, columnInfo);
          }
          displaycol.push(columnInfo[columnName].displayLabel);
          acc += this.createXMLColumn(columnWidth);
          return acc;
        },
        ''
      );
      tableData.forEach((rowItem: string): any => {
        rowData += this.createXMLRow(rowItem, displayedColumns);
      });

      tableStart += this.createXMLRowHead(1, displaycol);
      tableStart += rowData;
    }
    return tableStart;
  }

  /**
   * Format the table data if it contains export formatter
   * @param tableData data source
   * @param columnName name of column
   * @param columnInfo info of column
   */
  private formatTableData(
    tableData: any[],
    columnName: string,
    columnInfo: { [key: string]: any }
  ): any[] {
    return tableData.map((data: any): {} => {
      const obj: {} = { ...data };
      obj[columnName] = columnInfo[columnName].exportDataAccessor(
        data[columnName],
        data
      );
      return obj;
    });
  }

  /**
   * Creates XML column
   * @param columnWidth width of column
   */
  private createXMLColumn(columnWidth: number): string {
    return `<ss:Column ss:AutoFitWidth="0" ss:Width="${columnWidth}"/>`;
  }

  /**
   * Create XML row header cell (bold)
   * @param id id
   * @param columns columns to display
   */
  private createXMLRowHead(id: number, columns: string[]): string {
    return `<ss:Row ss:StyleID="${id}">${this.headCells(columns)}</ss:Row>`;
  }

  /**
   * Create XML row item
   * @param item item
   * @param columns disolay columns
   */
  private createXMLRow(rowData: {}, columns: any[]): string {
    return `<ss:Row>${this.dataCells(columns, rowData)}</ss:Row>`;
  }

  /**
   * Create a XML cell
   * @param rowValue row data
   */
  private createXMLCell(rowValue: string): string {
    return `<ss:Cell>${this.createXMLData(rowValue)}</ss:Cell>`;
  }

  /**
   * Creates XML Data
   * @param rowValue value
   */
  private createXMLData(rowValue: string): string {
    return `<ss:Data ss:Type="String">${rowValue}</ss:Data>`;
  }

  /**
   * Creates head cells
   * @param columns columns to display
   */
  private headCells(columns: string[]): string {
    return columns?.reduce((acc: string, column: string): string => {
      acc = acc + this.createXMLCell(column.toUpperCase());
      return acc;
    }, '');
  }

  /**
   * Creates data cells
   * @param columns columns to display
   * @param rowData rowData
   */
  private dataCells(columns: string[], rowData: {}): string {
    return columns?.reduce((acc: string, column: string): string => {
      const rowValue: string = rowData[column] ? rowData[column] : '';
      acc = acc + this.createXMLCell(rowValue);
      return acc;
    }, '');
  }
}
