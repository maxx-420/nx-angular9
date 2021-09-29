// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// User Agent Utility

export const UserAgentUtility = {
  /**
   * To check the browser is IE or not
   */
  isIE() {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');

    // If Internet Explorer, return version number
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      return true;
    }

    return false;
  },

  cleanupElement(elementRef) {
    if (this.isIE()) {
      elementRef?.nativeElement?.parentNode?.removeChild(
        elementRef.nativeElement
      );
    }
  },
};
