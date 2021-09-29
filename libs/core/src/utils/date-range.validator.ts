// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// date range validator

import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import * as _moment from 'moment';

// prettier-ignore
const moment = (_moment as any).default ? (_moment as any).default : _moment;

export class DateRangeValidator {
  private static validate(validatorFn: (File) => null | object, type = null) {
    return (control: AbstractControl | FormGroup) => {
      return validatorFn(control);
    };
  }

  /**
   * validate date range
   * @param date date
   * @param range date range
   * @param diffBy moment unitOfTime 'days' | 'months'
   */
  static validateDateRange(
    otherDateControl: AbstractControl,
    range,
    diffBy
  ): ValidatorFn {
    const dateFormat = 'YYYY-MM-DD';
    const validatorFn = (control: AbstractControl) => {
      if (!otherDateControl?.value || !control.value) {
        return null;
      }

      const otherDt: moment.Moment =
        typeof otherDateControl.value === 'string'
          ? moment(otherDateControl.value)
          : otherDateControl.value;
      const controlDate: moment.Moment =
        typeof control.value === 'string'
          ? moment(control.value)
          : control.value;

      let startDate: moment.Moment;
      let endDate: moment.Moment;
      if (moment(controlDate).isAfter(otherDt, 'day')) {
        startDate = otherDt.clone();
        endDate = controlDate.clone();
      } else {
        startDate = controlDate.clone();
        endDate = otherDt.clone();
      }

      let diff: any = 0;
      // Moment API does not include the start date when calculating diff but we want to find number of days between start
      // and end date with both dates inclusive. So for 13th July to 13th August, we expect 32 days but it shows 31 days.
      // So we need to subtract one day from start date to include the start date itself while calculating diff.
      if (!moment(startDate).isSame(endDate, 'day')) {
        diff = moment(startDate.subtract(1, 'day').format(dateFormat)).diff(
          moment(endDate.format(dateFormat)),
          diffBy,
          true
        );
      }

      if (diff && Math.abs(diff) > range) {
        return {
          range: 'range error',
        };
      } else {
        return null;
      }
    };

    return DateRangeValidator.validate(validatorFn);
  }

  /**
   * FormGroup level validator which checks if date is set after custom range is selected
   */
  static oneOfDateSelected(defaultValue): ValidatorFn {
    const validatorFn = (fg: FormGroup) => {
      if (
        defaultValue === null &&
        fg.get('filterValue').value === -1 &&
        fg.get('startDate').value === null &&
        fg.get('endDate').value === null
      ) {
        return { dateNotSet: true };
      } else {
        return null;
      }
    };
    return DateRangeValidator.validate(validatorFn);
  }
}
