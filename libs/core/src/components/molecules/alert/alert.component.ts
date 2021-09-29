// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Alert panel coponent
 */
import { Component, Input } from '@angular/core';

type AlertType = 'success' | 'warning' | 'note' | 'error' | 'indeterminate'; // nosonar

@Component({
  selector: 'lib-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() alertType: AlertType = 'note';
  @Input() alertMessage: any = null;
  @Input() iconAutomationAttribute: string = '';
  @Input() labelAutomationAttribute: string = '';
}
