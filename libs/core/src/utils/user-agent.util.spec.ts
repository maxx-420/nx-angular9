// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { UserAgentUtility } from './user-agent.util';

describe('UserAgentUtility', () => {
  it('isIE', () => {
    spyOnProperty(window, 'navigator', 'get').and.returnValue({
      userAgent: {
        match: function () {
          return true;
        },
        indexOf: function () {
          return 1;
        },
      },
    });
    expect(UserAgentUtility.isIE()).toBe(true);
  });

  it('cleanupElement when isIE true', () => {
    spyOn(UserAgentUtility, 'isIE').and.returnValue(true);

    let elementRef = {
      nativeElement: {
        parentNode: {
          removeChild: (temp) => {
            return true;
          },
        },
      },
    };
    let spy = spyOn(elementRef.nativeElement.parentNode, 'removeChild');
    UserAgentUtility.cleanupElement(null);
    expect(spy).toHaveBeenCalledTimes(0);
    UserAgentUtility.cleanupElement(elementRef);
    expect(spy).toHaveBeenCalled();
  });

  it('cleanupElement when isIE false', () => {
    spyOn(UserAgentUtility, 'isIE').and.returnValue(false);

    let elementRef = {
      nativeElement: {
        parentNode: {
          removeChild: (temp) => {
            return true;
          },
        },
      },
    };
    let spy = spyOn(elementRef.nativeElement.parentNode, 'removeChild');
    UserAgentUtility.cleanupElement(elementRef);
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
