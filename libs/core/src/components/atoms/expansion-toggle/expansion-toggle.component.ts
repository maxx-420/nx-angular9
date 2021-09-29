// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// angular material cutom mat expension panel icons

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-expansion-toggle',
  templateUrl: './expansion-toggle.component.html',
  styles: [
    `
      :host: {
        position: absolute;
      }
    `,
  ],
})
export class ExpansionToggleComponent {
  @Input() expanded = false;
  @Input() fontSize = '20px';
  @Output() expansionToggleClicked = new EventEmitter();

  /**
   * Emits accordion state on toggle click
   */
  onExpansionToggleClick() {
    this.expansionToggleClicked.emit(!this.expanded);
  }
  /**
   * Empty Keydown method
   */
  onKeyDown() {
    // intentional ommision
  }
}
