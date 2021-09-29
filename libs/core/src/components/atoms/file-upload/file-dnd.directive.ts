// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// file drop container directive

import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[libFileDnd]',
})
export class FileDndDirective {
  @Output() fileDropped = new EventEmitter();

  /**
   * drag over
   * @param evt event
   */
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  /**
   * drag over
   * @param evt event
   */
  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  /**
   * drag over
   * @param evt event
   */
  @HostListener('drop', ['$event']) onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const files = evt.dataTransfer.files;
    /* istanbul ignore else */
    if (files.length > 0) {
      this.fileDropped.emit([files[0]]);
    }
  }
}
