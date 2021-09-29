// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
//

import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'lib-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class RadioButtonsComponent {
  @Input() controlName: string = null;
  @Input() buttonsDirection: 'column' | 'row' = 'column';
  @Input() radioOptions: {
    value: string | number;
    label: string | number;
    isCmsLabel?: false;
    disabled?: false;
    automationAttribute?: '';
  }[] = [];
  @Input() automationAttribute = '';
  @Output() radioSelectedValue = new EventEmitter();
  @Input() className: string;

  /**
   * Emit value selected by radio button for analytics tracking
   */
  radioChange() {
    this.radioSelectedValue.emit(true);
  }
}
