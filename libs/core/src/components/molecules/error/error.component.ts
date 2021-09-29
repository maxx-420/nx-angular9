// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Error component

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  @Input() variation = 'notFound';
  @Input() customStyle: any = { height: '100%' };
  @Input() errorReason = '';
  @Input() pageSection = '';
  @Input() customMessage = null;
  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit(): void {
    this.customStyle = {
      ...this.customStyle,
    };
  }
}
