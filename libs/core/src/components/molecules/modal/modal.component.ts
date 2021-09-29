// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
//

import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MODAL_CONFIG } from '../../../global-config/config';

@Component({
  selector: 'lib-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() opened = false;
  @Input() title = '';
  @Input() showCancelCTA = true;
  @Input() disableClose = false;
  @Input() showOkCTA = true;
  @Input() okCTALabel = '';
  @Input() cancelCTALabel = '';
  @Input() ariaLabel = '';
  @Input() data: any = {};
  @Input() component: ComponentType<any> | TemplateRef<any> = null;
  @Input() hasTemplate = false;
  @Input() isOkCtaDisabled = false;
  @Input() okCtaAriaLabel: string;
  ngUnsubscribe = new Subject();

  @Output() afterClosed = new EventEmitter();

  @ViewChild('modalWrapper', {read: TemplateRef})
  modalWrapper: TemplateRef<any>;

  modalRef: MatDialogRef<any>;

  constructor(
    private readonly dialog: MatDialog
  ) {}

  /**
   * ngAfterViewInit lifecycle hook
   */
  ngAfterViewInit() {
    this.toggleModal();
  }

  /**
   * ngOnChanges lifecycle hook
   * @param param0 param0
   */
  ngOnChanges({component, opened}: SimpleChanges) {
    if (opened && opened.currentValue !== opened.previousValue) {
      this.toggleModal();
    }

    if (component?.currentValue && !component.previousValue) {
      this.toggleModal();
    }
  }

  /**
   * show/hide modal
   */
  toggleModal() {
    if (this.opened && this.component && this.modalWrapper) {
      this.modalRef = this.dialog.open(this.modalWrapper, {
        ...MODAL_CONFIG,
        height: 'auto',
        disableClose: this.disableClose,
        ariaLabelledBy: 'dialog-title',
        ariaDescribedBy: 'dialog-desc',
        data: {
          ...this.data,
        },
      });
      this.modalRef
        .afterClosed()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((result) => this.afterClosed.emit(result));
    } else if (this.modalRef) {
      this.modalRef.close();
    }
  }

  /**
   * lifecycle hook
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
