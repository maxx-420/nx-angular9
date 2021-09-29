// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
//

import {
  AfterViewInit,
  Directive,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';

@Directive({
  selector: '[libPaginator]',
})
export class PaginatorDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input()
  get showTotalPages(): number {
    return this._showTotalPages;
  }
  set showTotalPages(value: number) {
    this._showTotalPages = value % 2 === 0 ? value + 1 : value;
  }

  @Input() length = 0;
  viewRefNativeElement;
  buttonNodeName = 'BUTTON';

  private _currentPage = 0;
  private readonly _pageGapTxt = '...';
  private _rangeStart;
  private _rangeEnd;
  private _buttons = [];

  private _showTotalPages = 3;
  private readonly ngUnsubscribe = new Subject();

  constructor(
    @Host() @Self() @Optional() private readonly matPaginator: MatPaginator,
    private readonly viewRef: ViewContainerRef,
    private readonly renderer: Renderer2,
    private readonly contentPipe: RenderLabelPipe
  ) {
    this.matPaginator.page
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: PageEvent) => {
        this.switchPage(event.pageIndex);
      });
    this.viewRefNativeElement = this.viewRef.element.nativeElement;
  }

  /**
   * ngAfterViewInit life cycle
   */
  ngAfterViewInit() {
    this.initPageRange();
  }

  /**
   * ngOnChanges life cycle
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.length.previousValue !== changes.length.currentValue) {
      this.initPageRange();
    }
  }

  /**
   * ngOnDestroy Lifecycle hook
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   *
   * Responsible for creating first page button of paginator.
   */
  createFirstPageButtonView = (actionContainer, nextPageNode): void => {
    this.renderer.insertBefore(
      actionContainer,
      this.createButton(0, this.matPaginator.pageIndex),
      nextPageNode
    );
  }

  /**
   *
   * Responsible for creating last page button of paginator.
   */
  createLastPageButtonView = (
    actionContainer,
    nextPageNode,
    totalPages
  ): void => {
    if (totalPages > 1) {
      this.renderer.insertBefore(
        actionContainer,
        this.createButton(totalPages - 1, this.matPaginator.pageIndex),
        nextPageNode
      );
    }
  }

  /**
   *
   * Take care of showing pages w.r.t to selected page. (show one page before and after of selected page.)
   */
  createMiddlePagesButtonView = (
    actionContainer,
    nextPageNode,
    i,
    totalPages
  ): void => {
    if (
      (i < this._showTotalPages && i > this._rangeStart) ||
      (i >= this._rangeStart && i <= this._rangeEnd) ||
      (this._currentPage === totalPages - 1 &&
        i >= Math.floor(this._rangeStart))
    ) {
      this.renderer.insertBefore(
        actionContainer,
        this.createButton(i, this.matPaginator.pageIndex),
        nextPageNode
      );
    }
  }

  /**
   *
   * responsible for creating Ellipsis(...)
   */
  buildEllipsis = (actionContainer, nextPageNode): void => {
    this.renderer.insertBefore(
      actionContainer,
      this.createButton(this._pageGapTxt, this.matPaginator.pageIndex),
      nextPageNode
    );
  }

  /**
   *
   * responsible for remove buttons before creating new ones
   */
  removeAllButtons = (actionContainer): void => {
    this._buttons.forEach((button) => {
      this.renderer.removeChild(actionContainer, button);
    });
    // Empty state array
    this._buttons.length = 0;
  }

  customisePaginatorViewNodes = (nodeArray) => {
    for (const node of nodeArray) {
      if (node.nodeName === this.buttonNodeName) {
        this.renderer.addClass(node, 'mat-elevation-z0');
        if (node.disabled) {
          this.renderer.setAttribute(node, 'disabled', 'disabled');
        } else {
          this.renderer.removeAttribute(node, 'disabled');
        }
      }
    }
  }

  private switchPage(i: number, onClick = false): void {
    this._currentPage = i;
    this.matPaginator.pageIndex = i;
    this.initPageRange();
    if (onClick) {
      (this.matPaginator as any)._emitPageEvent({
        previousPageIndex: null,
        pageSize: this.matPaginator.pageSize,
        pageIndex: this.matPaginator.pageIndex,
        length: this.length,
      });
    }
  }

  private createButton(i: any, pageIndex: number): any {
    const linkBtn = isNaN(i)
      ? this.renderer.createElement('span')
      : this.renderer.createElement('button');
    if (!isNaN(i)) {
      this.renderer.addClass(linkBtn, 'mat-mini-fab');
      this.renderer.addClass(linkBtn, 'mat-elevation-z0');
      this.renderer.addClass(linkBtn, 'mat-custom-page');
    }

    const pagingTxt = isNaN(i) ? this._pageGapTxt : +(i + 1);
    const text = this.renderer.createText(pagingTxt + '');
    const totalPages = Math.ceil(this.length / this.matPaginator.pageSize);
    if (!isNaN(i)) {
      this.renderer.setAttribute(
        linkBtn,
        'aria-label',
        `${this.contentPipe.transform(
          'lbl_display_page'
        )}${pagingTxt} of ${totalPages.toString()}`
      );
    }
    if (i === pageIndex) {
      this.renderer.addClass(linkBtn, 'active');
    } else {
      this.renderer.listen(linkBtn, 'click', () => {
        this.switchPage(i, true);
      });
    }

    this.renderer.appendChild(linkBtn, text);
    // Add button to private array for state
    this._buttons.push(linkBtn);
    return linkBtn;
  }

  private buildPaginator(): void {
    const actionContainer = this.viewRefNativeElement.querySelector(
      'div.mat-paginator-range-actions'
    );
    const nextPageNode = this.viewRefNativeElement.querySelector(
      'button.mat-paginator-navigation-next'
    );
    // remove buttons before creating new ones
    if (this._buttons.length > 0) {
      this.removeAllButtons(actionContainer);
    }
    // initialize next page and last page buttons
    if (this._buttons.length === 0) {
      const nodeArray = this.viewRefNativeElement.querySelector(
        'div.mat-paginator-range-actions'
      ).children;
      setTimeout(() => {
        this.customisePaginatorViewNodes(nodeArray);
      });

      let startEllipsis = false;
      let endEllipsis = false;
      const totalPages = Math.ceil(this.length / this.matPaginator.pageSize);
      this.createFirstPageButtonView(actionContainer, nextPageNode);
      for (let i = 1; i < totalPages - 1; i = i + 1) {
        // Ellipsis at start of page count. just after first page button.
        if (
          this._rangeStart > 1 &&
          i === 2 &&
          !startEllipsis &&
          totalPages - this._showTotalPages > 1
        ) {
          this.buildEllipsis(actionContainer, nextPageNode);
          startEllipsis = true;
        }

        // take care of showing pages w.r.t to selected page. (show one page before and after of selected page.)
        this.createMiddlePagesButtonView(
          actionContainer,
          nextPageNode,
          i,
          totalPages
        );
        // Ellipsis at end of page count. just before last page button.
        if (
          i >= this._rangeEnd &&
          !endEllipsis &&
          totalPages - this._showTotalPages > 1
        ) {
          this.buildEllipsis(actionContainer, nextPageNode);
          endEllipsis = true;
        }
      }
      this.createLastPageButtonView(actionContainer, nextPageNode, totalPages);
    }
  }

  private initPageRange(): void {
    this._rangeStart = this._currentPage - this._showTotalPages / 2;
    this._rangeEnd = this._currentPage + this._showTotalPages / 2;

    this.buildPaginator();
  }
}
