// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Window utility

export class WindowUtility {
  /**
   * checks if the browser supports msSaveOrOpenBlob or not
   */
  public static get msSaveOrOpenFileSupported(): boolean {
    return !!window.navigator.msSaveOrOpenBlob;
  }

  /**
   * msSaveOrOpenFile
   * @param file blob object
   * @param fileName file name
   */
  public static msSaveOrOpenFile(file: any, fileName: string): void {
    window.navigator.msSaveOrOpenBlob(file, fileName);
  }

  /**
   * launchUrlPopupWindow
   * @param url pdf url
   * @param features window features
   */
  public static launchUrlPopupWindow(url: string) {
    window.open(!!url ? url : '');
  }
}
