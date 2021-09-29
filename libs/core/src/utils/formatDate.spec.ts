// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import formatDate from './formatDate';
import { DatePipe } from '@angular/common';
const datePipe = new DatePipe('en-US');

describe('formatDate', () => {
  it('should format as per given format if format available', () => {
    expect(formatDate(new Date(), 'yyyy-MM-dd HH:mm')).toBe(
      datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm')
    );
  });

  it('should format as  yyyy-MM-dd if format not available', () => {
    expect(formatDate(new Date())).toBe(
      datePipe.transform(new Date(), 'yyyy-MM-dd')
    );
  });
});
