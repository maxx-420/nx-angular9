// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// function to get end date based on number of days

import { DatePipe } from '@angular/common';

const datePipe = new DatePipe('en-US');

const formatDate = (date: Date, format?: string) => {
  if (format) {
    return datePipe.transform(date, format);
  } else {
    return datePipe.transform(date, 'yyyy-MM-dd');
  }
};

export default formatDate;
