// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Block component

import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent {
  @Input() showTopBorder: boolean;
  @Input() title: string;

  _iconClass = '';
  get icon(): string {
    return this._iconClass ? 'symphony-icons-' + this._iconClass : null;
  }

  // tslint:disable-next-line: prefer-inline-decorator
  @Input('icon')
  set icon(value: string) {
    this._iconClass = value;
  }
}
