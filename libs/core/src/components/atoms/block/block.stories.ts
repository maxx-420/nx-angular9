// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Block stories

import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { BlockComponent } from './block.component';

export default {
  title: 'Block Component',
  decorators: [
    moduleMetadata({
      declarations: [BlockComponent],
      imports: [CommonModule],
    }),
  ],
};

export const basicDataTableWithSorting = () => ({
  component: BlockComponent,
  props: {
    title: '',
    icon: 'ship',
    showTopBorder: true,
  },
  template: `
  <div class="ups-gld-global_ui-elements">
    <h3 class="ups-gld-global_ui-elements-heading">
      Block Component
    </h3>
    <lib-block title="ORIGIN:" icon="ship" showTopBorder="true">
      <p class="block-body">
        Block component content
      </p>
    </lib-block>
  </div>
  `,
});
