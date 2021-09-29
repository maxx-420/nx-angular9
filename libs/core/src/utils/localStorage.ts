// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Local Storage Utility

import { API_HEADER_KEYS } from '../constants';

export const LocalStorageUtility = {
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  get(key) {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  },

  clear() {
    localStorage.clear();
  },

  clearUserProfile() {
    const localStorageKeyToClear = [
      API_HEADER_KEYS.X_XSRF_TOKEN
    ];
    localStorageKeyToClear.forEach((key) => {
      localStorage.removeItem(key);
    });
  },
};

export default LocalStorageUtility;
