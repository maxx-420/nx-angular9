// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Message Bar Component
 */

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { messageBarAutoHideTimeOut } from './message-bar.config';

type MessageType = 'success' | 'error' | 'warning' | undefined;

@Component({
  selector: 'lib-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.scss'],
})
export class MessageBarComponent implements OnChanges {
  @Input() isMessageBarVisible = false;
  @Input() message: string;
  @Input() messageType: MessageType;
  @Input() ariaLabel: string;
  @Input() autoHeight: false;
  @Input() autoCloseEnabled: boolean = true;
  @Output() closed = new EventEmitter();

  timer: any = null;
  /**
   * closeMessageBar
   */
  closeMessageBar() {
    this.isMessageBarVisible = false;
    this.closed.emit('true');
  }

  /**
   * ngOnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.isMessageBarVisible &&
      changes.isMessageBarVisible.currentValue
    ) {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      if (this.autoCloseEnabled) {
        this.timer = setTimeout((): void => {
          this.closeMessageBar();
        }, messageBarAutoHideTimeOut);
      }
    }
  }
}
