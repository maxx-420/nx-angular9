// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { FocusableOption } from '@angular/cdk/a11y';
import { Component, ElementRef, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'lib-list-item',
  template: `
    <label>
      <ng-content></ng-content>
    </label>
  `,
  styles: [
    `
      :host {
        width: 100%;
        position: relative;
      }
    `,
  ],
})
export class ListItemComponent implements FocusableOption {
  @HostBinding('attr.tabindex') get getTabindex() {
    return !this.disabled && '0';
  }

  @Input() disabled: boolean;
  @Input() index: boolean;
  @Input() label: boolean;

  constructor(public element: ElementRef) {}

  /**
   * optional interface method of FocusableOption
   * @returns string
   */
  getLabel(): string {
    return `${this.index} ${this.label}`;
  }

  /**
   * inteface method to call focus
   */
  focus(): void {
    this.element.nativeElement.focus();
  }
}
