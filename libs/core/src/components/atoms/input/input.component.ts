// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/*
 * Input basic component
 **/

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

/**
 * Input Atom Component
 */
@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class InputComponent implements OnChanges {
  /**
   * Input field type value
   */
  @Input() fieldType = 'text';
  /**
   * Input field appearance value.
   * Variations: fill(filled background) , outline (normal input with white background and border)
   */
  @Input() variation = 'standard';
  @Input() name = 'input_field';
  /**
   * Label for the input field
   */
  @Input() label: string = null;

  @Input() labelStyle = {};
  /**
   * Placeholder for the input field
   */
  @Input() placeholderText = '';
  /**
   * Custom style passed by parent component.
   */
  @Input() customStyle = '';
  @Input() color = 'primary';
  /**
   * Form instance to associate input with
   */
  @Input() parentForm;
  /**
   * Form Control name
   */
  @Input() controlName = 'input_control';

  /**
   * For passing automation attribute
   */
  @Input() automationAttribute: string;

  @Input() ariaLabel;

  @Input() maxCharLength: number;

  @Input() noBorder = false;

  @Output() inputFocusEvent = new EventEmitter();

  private inputFocusFlag = false;

  /**
   * Angular hook to listen changes in Inputs
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.placeholderText) {
      this.placeholderText = changes.placeholderText.currentValue;
    }
  }

  /**
   * Emits focus event on input
   */
  onElementFocus() {
    if (!this.inputFocusFlag) {
      this.inputFocusEvent.emit(true);
      this.inputFocusFlag = true;
    }
  }
}
