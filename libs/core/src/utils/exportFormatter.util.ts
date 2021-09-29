// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { DATE_FORMAT_WITH_HOURS } from '../constants';
import { SymphonyDatePipe } from '../pipe/symphony-date.pipe';

const datePipe: SymphonyDatePipe = new SymphonyDatePipe();
export const ExportFormatterUtility = {
  /**
   * To format the date in the required excel format
   * @param coldata column Data received by data-table
   */
  dateFormatter(coldata: string): string {
    return coldata ? datePipe.transform(coldata, DATE_FORMAT_WITH_HOURS) : '';
  },

  cancelledDate: (coldata: any, rowData: any): string => {
    if (rowData.cancelledDate || rowData.shipmentLineCanceledDateTime) {
      return datePipe.transform(
        rowData.cancelledDate || rowData.shipmentLineCanceledDateTime
      );
    } else {
      return '';
    }
  },

  cancelledDateWithTimeZone: (coldata: any, rowData: any): string => {
    if (rowData.cancelledDate || rowData.shipmentLineCanceledDateTime) {
      return datePipe.transform(
        rowData.cancelledDate || rowData.shipmentLineCanceledDateTime,
        null,
        rowData.shipmentCanceledDateTimeZone
      );
    } else {
      return '';
    }
  },
};
