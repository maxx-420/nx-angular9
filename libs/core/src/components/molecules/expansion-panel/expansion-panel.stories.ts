// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * expansion panel story
 */

import { moduleMetadata } from '@storybook/angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ExpansionPanelComponent } from './expansion-panel.component';

export default {
  title: 'Expansion Panel Component',
  decorators: [
    moduleMetadata({
      declarations: [ExpansionPanelComponent],
      imports: [MatExpansionModule, CommonModule, BrowserAnimationsModule],
    }),
  ],
};

export const basicExpansionPanel = () => ({
  component: ExpansionPanelComponent,
  template: `
  <div class="ups-gld-global_ui-elements">
    <h3 class="ups-gld-global_ui-elements-heading">Basic expansion panel</h3>
    <span>
      <lib-expansion-panel
        headerTitle="Header"
        headerSubtitle="headerSubtitle"
        [expandViewTemplate]="save"
      >
      </lib-expansion-panel>
    </span>
  </div>
  <ng-template #save>
    Save
  </ng-template>
  `,
});
