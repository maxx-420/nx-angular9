// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// symphony date pipe: this pipe is used get DatePipe work in IE11

import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';

import { UserAgentUtility } from '../utils/user-agent.util';

const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd HH:mm';

// prettier-ignore
const moment = (_moment as any).default ? (_moment as any).default : _moment;
@Pipe({
  name: 'dateFormatter',
})
export class SymphonyDatePipe implements PipeTransform {
  datePipe = new DatePipe('en-US');

  /**
   * transform method
   * @param value value
   * @param format format
   * @param timezone timezone
   * @param locale locale
   */
  transform(
    value: string,
    format?: string,
    timezone?: string,
    locale?: string
  ) {
    try {
      // below code is used as to convert date object in local date time
      // because toISOString() convert date object to GMT time as we are not getting
      // timezone in date object this is required

      // const formattedDate = new Date(
      //   new Date(value).toString().split('GMT')[0] + ' UTC'
      // )
      //   .toISOString()
      //   .split('.')[0];
      if (!value) {
        return '';
      }
      if (UserAgentUtility.isIE()) {
        value = value.replace(' ', 'T');
      }
      let formattedValue;
      try {
        // Format date
        formattedValue = this.datePipe.transform(
          moment(value).toLocaleString(),
          format || DEFAULT_DATE_FORMAT,
          undefined,
          locale
        );
      } catch (error) {
        formattedValue = value;
      }
      // concat timezone string as per passed value
      return formattedValue + (timezone ? ' ' + timezone : '');
    } catch (error) {
      return value || '';
    }
  }
}
