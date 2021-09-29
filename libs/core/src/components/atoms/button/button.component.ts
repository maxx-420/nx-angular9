// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/*
 * Button component with variation
 **/

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

/**
 * Button Atom Component
 */
@Component({
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  /**
   * Boolean value to Decide whether button should be disabled or not
   */
  @Input() disabled = false;
  /**
   * Input to choose the type of button.
   * Three types of variation as of now : default(filled button), link(anchor link), icon-button(button with img in it)
   */
  @Input() variation = 'default';
  /**
   * Background color of the button : primary/secondary/accent-blue(only for links)
   */
  @Input() color = 'primary';
  /**
   * Type of button
   */
  @Input() fieldType = 'button';
  @Input() className = '';
  /**
   * Text displayed the button
   */
  @Input() text = 'Button';
  @Input() getTextFromCMS = true;
  /**
   * Boolean to decide whether button takes full width of its parent or not.
   */
  @Input() fullWidth = false;
  @Input() ariaLabel = 'button';
  /**
   * Custom style passed by parent component.
   */
  @Input() customStyle = '';
  @Input() iconClassName = '';
  @Output() clickEvent = new EventEmitter();
  @Input() btnDescription = '';

  /**
   * to pass automation attribute
   */
  @Input() automationAttribute: string;
  /**
   * to pass button size type
   */
  @Input() size = 'md';

  /**
   * onClick method of button
   */
  onClick($event) {
    this.clickEvent.emit($event);
  }
}
