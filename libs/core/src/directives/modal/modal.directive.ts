// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { MODAL_CONFIG } from '../../global-config/config';

@Directive({
  selector: '[libModalDirective]',
})
export class ModalDirective implements OnInit, OnDestroy {
  @Input() modalTemplate: TemplateRef<any>;
  @Input() modalClass = 'symphony-view-more-modal';
  ngUnsubscribe = new Subject();
  dialogRef: any;

  constructor(
    public dialog: MatDialog,
    private readonly elementRef: ElementRef,
  ) { }

  /**
   * ngOnInit lifecycle method
   */
  ngOnInit(): void {
    fromEvent(this.elementRef.nativeElement, 'click')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e) => {
        if (this.dialogRef) {
          return;
        }
        this.dialogRef = this.dialog.open(this.modalTemplate, {
          ...MODAL_CONFIG,
          disableClose: false,
          panelClass: this.modalClass,
          ariaLabelledBy: 'dialog-title',
          ariaDescribedBy: 'dialog-desc',
        });
        this.dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
          this.dialogRef = undefined;
        });
      });
  }

  /**
   * ngOnDestroy lifecycle method
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
