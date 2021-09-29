// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { WindowUtility } from './window.utility';

describe('WindowUtility', () => {
  it('msSaveOrOpenFile', () => {
    spyOnProperty(window, 'navigator', 'get').and.returnValue({
      msSaveOrOpenBlob: function () {
        return true;
      },
    });
    let spy = spyOn(window.navigator, 'msSaveOrOpenBlob');
    WindowUtility.msSaveOrOpenFile(new Blob(), 'abc.pdf');
    expect(spy).toHaveBeenCalled();
  });

  it('launchUrlPopupWindow', () => {
    let spy = spyOn(window, 'open');
    WindowUtility.launchUrlPopupWindow('/abc');
    expect(spy).toHaveBeenCalledWith('/abc');
    WindowUtility.launchUrlPopupWindow('');
    expect(spy).toHaveBeenCalledWith('');
  });
});
