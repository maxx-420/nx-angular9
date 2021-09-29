// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { fromEvent, Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import {
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

import { PLACEMENTS } from '../../constants/global.constant';
import { TooltipComponent } from '../../components/atoms/tooltip/tooltip.component';

type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';
type PopoverType = 'tooltip' | 'popover';

@Directive({
  selector: '[libPopoverDirective]',
})
export class PopoverDirective implements OnInit, OnDestroy {
  observer: MutationObserver;
  scrollObservable: any;
  @Input('popoverPlacement')
  get popoverPlacement(): PopoverPosition {
    return this._popoverPlacement;
  }
  set popoverPlacement(value: PopoverPosition) {
    if (value !== this._popoverPlacement) {
      this._popoverPlacement = value;

      if (this.overlayRef) {
        this._updatePosition();
      }
    }
  }
  @Input('libPopoverDirective') popoverContent: any;
  @Input() popoverCloseOnScroll: boolean = true;
  @Input() showPopoverTriangle: boolean = true;
  @Input() popoverType: PopoverType = 'popover';
  @Input() showTooltip = true;
  @Input() fullWidth = false;
  @Input() addOverlayHostClass = '';
  @Input() closeMenuSubject: Observable<boolean>;
  @Input() popoverPositions: {
    [key: string]: ConnectionPositionPair;
  } = {
    [PLACEMENTS.top]: new ConnectionPositionPair(
      { originX: 'center', originY: 'top' },
      { overlayX: 'center', overlayY: 'bottom' },
      0,
      -3,
      'popover-top'
    ),
    [PLACEMENTS.bottom]: new ConnectionPositionPair(
      { originX: 'center', originY: 'bottom' },
      { overlayX: 'center', overlayY: 'top' },
      0,
      3,
      'popover-bottom'
    ),
    [PLACEMENTS.left]: new ConnectionPositionPair(
      { originX: 'start', originY: 'center' },
      { overlayX: 'end', overlayY: 'center' },
      -3,
      0,
      'popover-left'
    ),
    [PLACEMENTS.right]: new ConnectionPositionPair(
      { originX: 'end', originY: 'center' },
      { overlayX: 'start', overlayY: 'center' },
      3,
      0,
      'popover-right'
    ),
  };
  @Input() clickTemplate;
  @Input() popoverPositionsOnClick;
  @Output() menuState = new EventEmitter();
  @Output() detached = new EventEmitter();

  isMenuOpen = false;
  focusableElements = [];
  ngUnsubscribe = new Subject();
  private tooltipRef: ComponentRef<TooltipComponent>;
  private _popoverPlacement: PopoverPosition = (PLACEMENTS as any).bottom;
  private overlayRef: OverlayRef;

  constructor(
    private overlayPositionBuilder: OverlayPositionBuilder,
    private readonly overlay: Overlay,
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef,
    private readonly vcr: ViewContainerRef
  ) {}

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit() {
    this.closeMenuSubject?.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.detachOverlay();
    });
  }

  /**
   * listen On Last Focusable Element
   */
  listenOnLastFocusableElement() {
    this.focusableElements[this.focusableElements.length - 1].addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Tab') {
          this.elementRef.nativeElement.focus();
          this.detachOverlay();
        }
      }
    );
  }

  /**
   * Creates an overlay for click and hover events
   */
  createOverlay(positions = this.popoverPositions) {
    const popoverId = 'popover';
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'aria-label',
      'open ' + popoverId
    );
    this.renderer.setAttribute(this.elementRef.nativeElement, 'role', 'button');
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions(this._getPosition(positions))
      .withPush(false);

    // close on page scroll
    let scrollStrategy;
    if (this.popoverCloseOnScroll) {
      scrollStrategy = this.overlay.scrollStrategies.close();
    } else {
      scrollStrategy = this.overlay.scrollStrategies.reposition();
    }

    const additionStyle = {
      width: '100%',
    };

    this.overlayRef = this.overlay.create({
      ...(this.fullWidth ? additionStyle : {}),
      positionStrategy,
      scrollStrategy,
      panelClass: `${this.popoverType}-container`,
    });

    if (this.addOverlayHostClass) {
      this.overlayRef.hostElement.classList.add(this.addOverlayHostClass);
    }
    this.overlayRef.overlayElement.setAttribute('id', popoverId);
    this.overlayRef
      .keydownEvents()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          this.elementRef.nativeElement.focus();
          this.detachOverlay();
        }
      });
  }

  /**
   * Gets keyboard-focusable elements within a specified element
   * @param [element] element
   * @returns array
   */
  getKeyboardFocusableElements(element) {
    return [
      ...element?.querySelectorAll(
        'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
      ),
    ].filter((el) => !el.hasAttribute('disabled'));
  }

  /**
   * show on mouseenter/focus
   */
  @HostListener('mouseenter', ['$event'])
  @HostListener('keyup', ['$event'])
  @HostListener('touchstart', ['$event'])
  @HostListener('click', ['$event'])
  show(evt = null) {
    if (!this.showTooltip && !(this.clickTemplate && evt.type === 'click')) {
      return;
    }
    if (evt?.type === 'keyup' && evt?.key !== 'Tab') {
      return;
    }

    if (this.clickTemplate && evt.type === 'click') {
      if (!this.isMenuOpen) {
        this.detachOverlay();
        if (this.overlayRef) {
          this.overlayRef.dispose();
        }
        this.createOverlay(this.popoverPositionsOnClick);
        this.overlayRef?.removePanelClass('arrow');
        this.isMenuOpen = true;
        this.menuState.emit(true);
        this.attachOverlay(true);
      } else {
        this.detachOverlay();
      }
      return;
    }

    if (this.overlayRef?.hasAttached() && evt?.type === 'touchstart') {
      this.detachOverlay();
      return;
    }

    if (!this.overlayRef?.hasAttached() && !this.isMenuOpen) {
      this.createOverlay();
      if (this.showPopoverTriangle) {
        this.overlayRef.addPanelClass('arrow');
      }
      this.attachOverlay();
    }

    fromEvent(this.overlayRef.overlayElement, 'mouseleave')
      .pipe(take(1), takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (!this.isMenuOpen) {
          this.detachOverlay();
        }
      });
  }

  /**
   * hide on mouseout/blur
   */
  @HostListener('mouseleave', ['$event'])
  @HostListener('blur', ['$event'])
  hide(e: any) {
    if (
      !this.isMenuOpen &&
      (!e.relatedTarget ||
        !e.relatedTarget.closest(`.${this.popoverType}-container`))
    ) {
      this.detachOverlay();
    }
  }

  /**
   * hide on window event
   * @param e mouse event
   */
  @HostListener('window:click', ['$event'])
  hideFromWindow(e) {
    const target = e?.target as HTMLElement;
    if (
      !target ||
      (target !== this.elementRef.nativeElement &&
        !target?.closest(`.${this.popoverType}-container`))
    ) {
      this.detachOverlay();
    }
  }

  /**
   * ngOnDestroy lifecycle method
   */
  ngOnDestroy(): void {
    this.detachOverlay();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Detach overlay method
   */
  private detachOverlay(): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  /**
   * Attach overlay method
   */
  private attachOverlay(custom = false): void {
    let popoverPortal;

    if (this.popoverType === 'tooltip') {
      popoverPortal = new ComponentPortal(TooltipComponent);
      this.tooltipRef = this.overlayRef.attach(popoverPortal);
      if (typeof this.popoverContent === 'string') {
        this.tooltipRef.instance.text = this.popoverContent;
      } else {
        this.tooltipRef.instance.content = this.popoverContent;
      }
    } else {
      if (this.popoverContent instanceof TemplateRef) {
        popoverPortal = new TemplatePortal(
          custom ? this.clickTemplate : this.popoverContent,
          this.vcr
        );
      } else {
        popoverPortal = new ComponentPortal(this.popoverContent);
      }
      this.overlayRef.attach(popoverPortal);
    }

    this.overlayRef
      .detachments()
      .pipe(take(1), takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.detached.emit();
        if (this.isMenuOpen) {
          this.menuState.emit(false);
          this.isMenuOpen = false;
        }
      });

    this._updateFocus();

    if (this.overlayRef && this.overlayRef.overlayElement.childElementCount) {
      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const elements = this.getKeyboardFocusableElements(
            this.overlayRef.overlayElement
          );
          this.focusableElements =
            elements && elements.length ? elements : this.focusableElements;
          if (this.focusableElements.length) {
            this.listenOnLastFocusableElement();
          }
        });
      });
      const config = { attributes: true, childList: true, characterData: true };
      this.observer.observe(this.overlayRef.overlayElement.children[0], config);
    }
  }

  /**
   * update position
   */
  private _updatePosition() {
    const position = this.overlayRef.getConfig()
      .positionStrategy as FlexibleConnectedPositionStrategy;
    position.withPositions(this._getPosition(this.popoverPositions));
    this.overlayRef.updatePosition();
  }

  /**
   *
   */
  private _updateFocus() {
    this.focusableElements = this.getKeyboardFocusableElements(
      this.overlayRef.overlayElement
    );
    if (this.focusableElements.length) {
      this.focusableElements[0].focus();
      this.listenOnLastFocusableElement();
    }
  }
  /**
   * Get Positioning strategy method
   */
  private _getPosition(popoverPositions) {
    let positions;
    switch (this.popoverPlacement) {
      case PLACEMENTS.right:
        positions = [
          popoverPositions[PLACEMENTS.right],
          popoverPositions[PLACEMENTS.left],
          popoverPositions[PLACEMENTS.bottom],
          popoverPositions[PLACEMENTS.top],
        ];
        break;
      case PLACEMENTS.bottom:
        positions = [
          popoverPositions[PLACEMENTS.bottom],
          ...(popoverPositions[PLACEMENTS.top]
            ? [popoverPositions[PLACEMENTS.top]]
            : []),
          ...(popoverPositions[PLACEMENTS.right]
            ? [popoverPositions[PLACEMENTS.right]]
            : []),
          ...(popoverPositions[PLACEMENTS.left]
            ? [popoverPositions[PLACEMENTS.left]]
            : []),
        ];
        break;
      case PLACEMENTS.top:
        positions = [
          popoverPositions[PLACEMENTS.top],
          popoverPositions[PLACEMENTS.bottom],
          popoverPositions[PLACEMENTS.left],
          popoverPositions[PLACEMENTS.right],
        ];
        break;
      default:
        positions = [
          popoverPositions[PLACEMENTS.left],
          popoverPositions[PLACEMENTS.right],
          popoverPositions[PLACEMENTS.bottom],
          popoverPositions[PLACEMENTS.top],
        ];
    }
    return positions;
  }
}
