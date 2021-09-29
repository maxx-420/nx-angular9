// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// confirmation modal that user response is submitted

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  @Input() isErrorModal: boolean;
  @Input() openModal: boolean;
  @Output() modalClosed = new EventEmitter();

  /**
   * when modal closed
   */
  onPopUpClose(e) {
    this.modalClosed.emit(e);
  }
}
