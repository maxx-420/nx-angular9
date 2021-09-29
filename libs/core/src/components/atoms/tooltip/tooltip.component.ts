// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/*
 * Tooltip component
 **/

import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'lib-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  @Input() text: string;
  @Input() content: TemplateRef<any>;
}
