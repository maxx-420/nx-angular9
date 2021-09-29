// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Session Storage Utility
import { SESSION_STORAGE_PERSISTENT_KEYS } from '../constants/storage.constant';

import { SESSION_CONFIG } from './../global-config/config';

export const SessionStorageUtility = {
  set(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  },

  get(key) {
    const data = sessionStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  },

  clear() {
    sessionStorage.clear();
  },

  clearUserProfile(clearAll) {
    const keysToClear = [
      SESSION_CONFIG.sessionStorageKey,
      ...Object.keys(sessionStorage).filter(
        (key) => SESSION_STORAGE_PERSISTENT_KEYS.indexOf(key) === -1
      ),
    ];
    keysToClear.forEach((key) => {
      sessionStorage.removeItem(key);
    });
    if (clearAll) {
      SESSION_STORAGE_PERSISTENT_KEYS.forEach((key) => {
        sessionStorage.removeItem(key);
      });
    }
  },

  setUserProfile(data) {
    this.set(SESSION_CONFIG.sessionStorageKey, data);
  },

  getUserProfile() {
    return this.get(SESSION_CONFIG.sessionStorageKey);
  },

  getAccountTypeDetails() {
    const profileData = this.getUserProfile();

    return profileData?.accountTypeDetails
      ? profileData.accountTypeDetails
      : null;
  },

  setConfigKeys(value) {
    this.set(SESSION_CONFIG.configStorageKey, value);
  },

  getConfigKeys(key) {
    return (
      this.get(SESSION_CONFIG.configStorageKey) &&
      this.get(SESSION_CONFIG.configStorageKey)[key]
    );
  },

  setCacheConfigurationKeys(value) {
    this.set(SESSION_CONFIG.cacheConfigKey, value);
  },

  getCacheConfigurationKeys(key) {
    return (
      this.get(SESSION_CONFIG.cacheConfigKey) &&
      this.get(SESSION_CONFIG.cacheConfigKey)[key]
    );
  },

  clearItem(key: string) {
    sessionStorage.removeItem(key);
  },
};

export default SessionStorageUtility;
