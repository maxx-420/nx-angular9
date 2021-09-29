// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// function to return paginator text

import { PageEvent } from '@angular/material/paginator';

const getTablePaginationHeader = (
  page: PageEvent,
  tableDataLength?: number
) => {
  if (!tableDataLength || (tableDataLength && !page)) {
    return `(${tableDataLength})`;
  } else if (!page) {
    return '';
  } else if (tableDataLength <= page.pageSize) {
    return `(${tableDataLength})`;
  } else {
    const till = page.pageSize * (page.pageIndex + 1);
    return `(${page.pageSize * page.pageIndex + 1} - ${
      till > tableDataLength ? tableDataLength : till
    } of ${tableDataLength})`;
  }
};

export default getTablePaginationHeader;
