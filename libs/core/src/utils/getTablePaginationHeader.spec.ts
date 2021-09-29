// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { default as getTablePaginationHeader } from './getTablePaginationHeader';

describe('getTablePaginationHeader', () => {
  it('should return header text', () => {
    let mock = {
      length: 10,
      pageSize: 10,
      pageIndex: 0,
    };
    let header = getTablePaginationHeader(mock, 10);
    expect(header).toBe('(10)');
    mock = {
      ...mock,
      length: 20,
    };
    header = getTablePaginationHeader(mock, 20);
    expect(header).toBe('(1 - 10 of 20)');
    header = getTablePaginationHeader(mock, 0);
    expect(header).toBe('(0)');
    header = getTablePaginationHeader(null, 10);
    expect(header).toBe('(10)');
  });
});
