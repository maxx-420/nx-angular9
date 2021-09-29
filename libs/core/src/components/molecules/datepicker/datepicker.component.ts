// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

import { default as CommonUtility } from './../../../utils/commonUtil';

@Component({
  selector: 'lib-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class DatepickerComponent {
  @Input() min;
  @Input() max;

  @Input() controlName;
  @Input() placeholder;
  @Input() label;
  @Input() todaysDateLinkLabel;
  @Input() showTodaysDate = true;
  @Input() customStyle = '';
  @Input() showInlineLabel = false;
  @Input() isReadOnly = false;
  @Input() isDisabled = false;
  @Input() hideLabel = false;
  @Output() setTodaysDate = new EventEmitter();
  @Output() datePickerFocused = new EventEmitter();
  @Output() dateChanged = new EventEmitter();

  private datePickerFocusFlag = false;
  constructor(private readonly _cdr: ChangeDetectorRef) {}

  /**
   * Called when datepicker opened
   */
  datePickerOpened() {
    this.trackFocusOfDatePicker();
    CommonUtility.detectChanges(this._cdr);
  }

  /**
   * Called when datepicker close
   */
  datePickerClosed() {
    CommonUtility.detectChanges(this._cdr);
  }

  /**
   * Emits focussed Field name
   */
  trackFocusOfDatePicker() {
    if (!this.datePickerFocusFlag) {
      this.datePickerFocused.emit(true);
      this.datePickerFocusFlag = true;
    }
  }

  /**
   * Emits value on click of button 'Use Today's date'
   */
  trackButtonClick(controlName) {
    this.setTodaysDate.emit(controlName);
    if (!this.datePickerFocusFlag) {
      this.datePickerFocused.emit(true);
      this.datePickerFocusFlag = true;
    }
  }
}
