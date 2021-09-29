// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Invalid Field Focus Directive
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[libInvalidFieldFocus]',
})
export class InvalidFieldFocusDirective {
  constructor(private readonly el: ElementRef) {}

  /**
   * Form Submit listener
   */
  @HostListener('submit')
  onFormSubmit() {
    const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');

    if (invalidControl) {
      invalidControl.focus();
    }
  }
}
