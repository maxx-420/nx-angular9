// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// to detect the viewport of the device

import {
  VIEWPORT_BREAKPOINT,
  VIEWPORT_NAMES,
} from './../constants/viewport.constant';

declare let window: any;

const ViewportUtility = {
  checkViewport(viewport: string) {
    if (
      (viewport === VIEWPORT_NAMES.mobile &&
        window.matchMedia(`(max-width: ${VIEWPORT_BREAKPOINT.mobile.max}px)`)
          .matches) ||
      (viewport === VIEWPORT_NAMES.tablet &&
        window.matchMedia(`(min-width: ${VIEWPORT_BREAKPOINT.tablet.min}px)`)
          .matches &&
        window.matchMedia(`(max-width: ${VIEWPORT_BREAKPOINT.tablet.max}px)`)
          .matches) ||
      (viewport === VIEWPORT_NAMES.desktop &&
        window.matchMedia(`(min-width: ${VIEWPORT_BREAKPOINT.desktop.min}px)`)
          .matches) ||
      (viewport === VIEWPORT_NAMES.largeDesktop &&
        window.matchMedia(
          `(min-width: ${VIEWPORT_BREAKPOINT.largeDesktop.min}px)`
        ).matches)
    ) {
      return true;
    }
    return false;
  },

  getCurrentViewport() {
    if (
      window.matchMedia(`(max-width: ${VIEWPORT_BREAKPOINT.mobile.max}px)`)
        .matches
    ) {
      return VIEWPORT_NAMES.mobile;
    } else if (
      window.matchMedia(`(min-width: ${VIEWPORT_BREAKPOINT.tablet.min}px)`)
        .matches &&
      window.matchMedia(`(max-width: ${VIEWPORT_BREAKPOINT.tablet.max}px)`)
        .matches
    ) {
      return VIEWPORT_NAMES.tablet;
    } else if (
      window.matchMedia(`(min-width: ${VIEWPORT_BREAKPOINT.desktop.min}px)`)
        .matches
    ) {
      return VIEWPORT_NAMES.desktop;
    }

    return null;
  },

  isDesktopDevice() {
    return this.checkViewport(VIEWPORT_NAMES.desktop);
  },

  isMobileDevice() {
    return this.checkViewport(VIEWPORT_NAMES.mobile);
  },

  // Should not be used apart from google map
  isLargeDesktopDevice() {
    return this.checkViewport(VIEWPORT_NAMES.largeDesktop);
  },
};

export default ViewportUtility;
