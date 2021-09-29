// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { SymphonyDatePipe } from './symphony-date.pipe';
import { UserAgentUtility } from '../utils';

describe('SymphonyDatePipe', () => {
  let pipe!: SymphonyDatePipe;

  beforeEach(() => {
    pipe = new SymphonyDatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('shoud call pipe without any value', () => {
    expect(pipe.transform(null)).toEqual('');
  });

  it('shoud call pipe with date time string', () => {
    expect(pipe.transform('2020-10-14 06:15:56')).toEqual('2020-10-14 06:15');
  });

  it('shoud call pipe with date time and timezone string', () => {
    expect(pipe.transform('2021-05-31 17:04:32', '', 'GMT')).toEqual(
      '2021-05-31 17:04 GMT'
    );
  });

  it('shoud call pipe for IE browser', () => {
    spyOn(UserAgentUtility, 'isIE').and.returnValue(true);

    expect(pipe.transform('2021-05-31T17:04:32')).toEqual('2021-05-31 17:04');
  });

  it('shoud call pipe and date transform throws the error', () => {
    spyOn(pipe.datePipe, 'transform').and.throwError('error');

    expect(pipe.transform('2021-05-31 17:04:32')).toEqual(
      '2021-05-31 17:04:32'
    );
  });

  it('shoud call pipe and utility method throws the error', () => {
    spyOn(UserAgentUtility, 'isIE').and.throwError('error');

    expect(pipe.transform('2021-05-31 17:04:32')).toEqual(
      '2021-05-31 17:04:32'
    );
  });
});
