// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandler } from './global-error-handler.service';
import CommonUtility from './../../utils/commonUtil';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('handleError should log error if env is not production', () => {
    spyOn(CommonUtility, 'isProdEnv').and.returnValue(false);
    let spy = spyOn(console, 'error');
    service.handleError({ message: 'Error message', stack: 'Error stack' });
    expect(spy).toHaveBeenCalledWith({
      message: 'Error message',
      stack: 'Error stack',
    });
    service.handleError('Error occurred');
    expect(spy).toHaveBeenCalledWith('Error occurred');
  });

  it('handleError should not log error if env is production', () => {
    spyOn(CommonUtility, 'isProdEnv').and.returnValue(true);
    let spy = spyOn(console, 'error');
    service.handleError({ message: 'Error message', stack: 'Error stack' });
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
