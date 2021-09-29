// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import ViewportUtility from './viewport';
import { VIEWPORT_BREAKPOINT } from './../constants/viewport.constant';

describe('getCurrentViewport and checkViewport', () => {
  it('should return mobile when viewport is mobile', () => {
    spyOn(window, 'matchMedia')
      .withArgs(`(max-width: ${VIEWPORT_BREAKPOINT.mobile.max}px)`)
      .and.returnValue({
        matches: true,
        media: 'mediaQuery',
        onchange: null,
        addListener: null,
        removeListener: null,
        addEventListener: null,
        removeEventListener: null,
        dispatchEvent: null,
      });

    expect(ViewportUtility.getCurrentViewport()).toBe('mobile');
    expect(ViewportUtility.checkViewport('mobile')).toBe(true);
  });

  it('should return tablet when viewport is tablet', () => {
    spyOn(window, 'matchMedia')
      .withArgs(`(max-width: ${VIEWPORT_BREAKPOINT.mobile.max}px)`)
      .and.returnValue({
        matches: false,
        media: 'mediaQuery',
        onchange: null,
        addListener: null,
        removeListener: null,
        addEventListener: null,
        removeEventListener: null,
        dispatchEvent: null,
      })
      .withArgs(`(min-width: ${VIEWPORT_BREAKPOINT.tablet.min}px)`)
      .and.returnValue({
        matches: true,
        media: 'mediaQuery',
        onchange: null,
        addListener: null,
        removeListener: null,
        addEventListener: null,
        removeEventListener: null,
        dispatchEvent: null,
      })
      .withArgs(`(max-width: ${VIEWPORT_BREAKPOINT.tablet.max}px)`)
      .and.returnValue({
        matches: true,
        media: 'mediaQuery',
        onchange: null,
        addListener: null,
        removeListener: null,
        addEventListener: null,
        removeEventListener: null,
        dispatchEvent: null,
      });

    expect(ViewportUtility.getCurrentViewport()).toBe('tablet');
    expect(ViewportUtility.checkViewport('tablet')).toBe(true);
  });

  it('should return desktop when viewport is desktop', () => {
    spyOn(window, 'matchMedia')
      .withArgs(`(max-width: ${VIEWPORT_BREAKPOINT.mobile.max}px)`)
      .and.returnValue({
        matches: false,
        media: 'mediaQuery',
        onchange: null,
        addListener: null,
        removeListener: null,
        addEventListener: null,
        removeEventListener: null,
        dispatchEvent: null,
      })
      .withArgs(`(min-width: ${VIEWPORT_BREAKPOINT.tablet.min}px)`)
      .and.returnValue({
        matches: false,
        media: 'mediaQuery',
        onchange: null,
        addListener: null,
        removeListener: null,
        addEventListener: null,
        removeEventListener: null,
        dispatchEvent: null,
      })
      .withArgs(`(min-width: ${VIEWPORT_BREAKPOINT.desktop.min}px)`)
      .and.returnValue({
        matches: true,
        media: 'mediaQuery',
        onchange: null,
        addListener: null,
        removeListener: null,
        addEventListener: null,
        removeEventListener: null,
        dispatchEvent: null,
      });

    expect(ViewportUtility.getCurrentViewport()).toBe('desktop');
    expect(ViewportUtility.checkViewport('desktop')).toBe(true);
  });

  it('should return null when viewport does not match to mobile, tablet or desktop', () => {
    spyOn(window, 'matchMedia')
      .withArgs(`(max-width: ${VIEWPORT_BREAKPOINT.mobile.max}px)`)
      .and.returnValue({
        matches: false,
        media: 'mediaQuery',
        onchange: null,
        addListener: null,
        removeListener: null,
        addEventListener: null,
        removeEventListener: null,
        dispatchEvent: null,
      })
      .withArgs(`(min-width: ${VIEWPORT_BREAKPOINT.tablet.min}px)`)
      .and.returnValue({
        matches: false,
        media: 'mediaQuery',
        onchange: null,
        addListener: null,
        removeListener: null,
        addEventListener: null,
        removeEventListener: null,
        dispatchEvent: null,
      })
      .withArgs(`(min-width: ${VIEWPORT_BREAKPOINT.desktop.min}px)`)
      .and.returnValue({
        matches: false,
        media: 'mediaQuery',
        onchange: null,
        addListener: null,
        removeListener: null,
        addEventListener: null,
        removeEventListener: null,
        dispatchEvent: null,
      });

    expect(ViewportUtility.getCurrentViewport()).toBe(null);
    expect(ViewportUtility.checkViewport('tablet')).toBe(false);
  });
});
