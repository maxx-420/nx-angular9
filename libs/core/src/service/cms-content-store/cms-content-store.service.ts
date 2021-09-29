// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// CMS Content Store service

import { Injectable } from '@angular/core';

/**
 * Created interface for data.
 */
interface ContentDataType {
  key: '';
  value: '';
}
/**
 * Created window function to call window object.
 */
function _window(): any {
  // return the global native browser window object.
  return window;
}

@Injectable({
  providedIn: 'platform',
})
export class CMSContentStoreService {
  _window: any;
  constructor() {
    this._window = _window();
    /**
     * Added a attribute into window obj to store data as a key, value pair. It has been shered between multiple application.
     */
    this._window._cmsContentMap = new Map<string, string>();
  }
  /**
   * Used to set values into map.
   */
  public setLabelsInStore(labelsData: ContentDataType[]): void {
    for (const labelData of labelsData) {
      this.setContent(labelData.key, labelData.value);
    }
  }
  /**
   * Get the value of the corresponding key
   */
  public getValue(key: string): any {
    return this.getContent(key);
  }
  /**
   * Retrieves the string value associated with the provided key
   */
  public getContent(key: string): string {
    const contentString = this._window._cmsContentMap.get(key);
    return contentString ? contentString : '';
  }
  /**
   * Sets the key/value pair
   */
  public setContent(key: string, value: string): void {
    this._window._cmsContentMap.set(key, value);
  }
}
