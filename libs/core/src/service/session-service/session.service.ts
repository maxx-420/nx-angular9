// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// service to open invalid session modal when API status is 403
import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MODAL_CONFIG } from '../../global-config/config';
import { UnauthenticatedModalComponent } from '../../components/molecules/unauthenticated-modal/unauthenticated-modal.component';

@Injectable({
  providedIn: 'root',
})
export class SessionService implements OnDestroy {
  dialogRef: any;
  ngUnsubscribe = new Subject();
  constructor(private readonly dialog: MatDialog) {}

  /**
   * open modal
   */
  openInvalidSessionModal() {
    if (this.dialogRef) {
      return;
    }
    this.dialogRef = this.dialog.open(UnauthenticatedModalComponent, {
      ...MODAL_CONFIG,
      panelClass: 'symphony-login-access-modalbox',
    });
    this.dialogRef
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.dialogRef = undefined;
      });
  }

  /**
   * lifecycle hook
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
