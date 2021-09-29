// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Expansion panel component

import { Component, Input, TemplateRef } from '@angular/core';
/**
 * Expansion Panel Component
 */
@Component({
  selector: 'lib-expansion-panel',
  templateUrl: './expansion-panel.component.html',
})
export class ExpansionPanelComponent {
  @Input() headerTitle = '';
  @Input() headerSubtitle = '';
  /**
   * Reference of template which should be shown in expanded view.
   */
  @Input() expandViewTemplate: TemplateRef<any>;
}
