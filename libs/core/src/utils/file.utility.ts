// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Encoding utility

import { WindowUtility } from './window.utility';

declare let window: any;

export class FileUtility {
  /**
   * creates blob object from byte array
   * @param fileByteBase64 base64 string
   */
  public static createDocument(fileByteBase64: string, type: string): Blob {
    let decodedString: string;
    try {
      decodedString = window.atob(fileByteBase64);
    } catch (error) {
      throw new Error('Unable to parse Base64 string');
    }
    const byteNumbers = new Array(decodedString.length);
    for (let i = 0; i < decodedString.length; i++) {
      byteNumbers[i] = decodedString.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  }

  /**
   * getFileType
   * @param fileName fileName
   */
  public static getFileType(fileName: string) {
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (extension === 'pdf') {
      return 'application/pdf';
    } else if (extension === 'xls') {
      return 'application/vnd.ms-excel';
    } else if (extension === 'xlsx') {
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (extension === 'doc') {
      return 'application/msword';
    } else if (extension === 'docx') {
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
    return undefined;
  }

  /**
   * downloads pdf from base64 string
   * @param base64Data base64 string
   * @param fileName pdf name
   */
  public static downloadDocument(base64Data, fileName) {
    const type = this.getFileType(fileName);
    const fileBlob = this.createDocument(base64Data, type);
    if (WindowUtility.msSaveOrOpenFileSupported) {
      WindowUtility.msSaveOrOpenFile(fileBlob, fileName);
    } else {
      const downloadLink = document.createElement('a');
      downloadLink.download = fileName;
      if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(fileBlob);
      } else {
        downloadLink.href = window.URL.createObjectURL(fileBlob);
        downloadLink.onclick = document.body.removeChild(
          event.target as any
        ) as any;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
      }
      downloadLink.click();
    }
  }
}
