// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { ExportFormatterUtility } from './exportFormatter.util';

const rowDataCanceledShipment = {
  upsShipmentNo: '81883330',
  referenceNo: '765763435',
  cancelledDate: '2021-06-15 09:20:01',
  serviceName: 'UPS Next Day Air',
  shipmentLineCanceledReason: null,
  shipmentLineCanceledDateTime: null,
  shipmentCanceledDateTimeZone: 'America\u002fNew\u005fYork',
  shipmentLineCanceledFlag: 'Y',
  productLine: 'GLD',
  accountType: 'MO',
  plBusinessId: 'GLD-19458',
  accountNumber: 'accountNumber',
};
describe('ExportFormatterUtility', () => {
  it('should test dateFormatter', () => {
    const expected = '2021-06-07 10:40';
    const result = ExportFormatterUtility.dateFormatter('2021-06-07 10:40:00');
    expect(result).toEqual(expected);
  });

  it('should test dateFormatter if param is null', () => {
    const expected = '';
    const result = ExportFormatterUtility.dateFormatter(null);
    expect(result).toEqual(expected);
  });

  it('should test cancelledDate', () => {
    const expected = '2021-06-15 09:20';
    const result = ExportFormatterUtility.cancelledDate(
      '2021-06-07 10:40:00',
      rowDataCanceledShipment
    );
    expect(result).toEqual(expected);
  });

  it('should test cancelledDate if cancelledDate and shipmentLineCanceledDateTime is null', () => {
    const expected = '';
    const data = { ...rowDataCanceledShipment };

    data.cancelledDate = null;
    data.shipmentLineCanceledDateTime = null;
    const result = ExportFormatterUtility.cancelledDate(
      '2021-06-07 10:40:00',
      data
    );
    expect(result).toEqual(expected);
  });

  it('should test cancelledDateWithTimeZone', () => {
    const expected = '2021-06-15 09:20 America/New_York';
    const result = ExportFormatterUtility.cancelledDateWithTimeZone(
      '2021-06-07 10:40:00',
      rowDataCanceledShipment
    );
    expect(result).toEqual(expected);
  });

  it('should test cancelledDateWithTimeZone if cancelledDate and shipmentLineCanceledDateTime is null', () => {
    const expected = '';
    const data = { ...rowDataCanceledShipment };
    data.cancelledDate = null;
    data.shipmentLineCanceledDateTime = null;
    const result = ExportFormatterUtility.cancelledDateWithTimeZone(
      '2021-06-07 10:40:00',
      data
    );
    expect(result).toEqual(expected);
  });
});
