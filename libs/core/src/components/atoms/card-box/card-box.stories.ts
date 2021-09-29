// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Car box stories

import { moduleMetadata } from '@storybook/angular';
import { MatCardModule } from '@angular/material/card';

import { CardBoxComponent } from './card-box.component';

export default {
  title: 'Card Box Component',
  decorators: [
    moduleMetadata({
      declarations: [CardBoxComponent],
      imports: [MatCardModule],
    }),
  ],
};

export const basicCardBox = () => ({
  component: CardBoxComponent,
  template: `
  <div class="ups-gld-global_ui-elements">
    <h3 class="ups-gld-global_ui-elements-heading">Basic cards</h3>
    <span>
      <lib-card-box
        title="This is card title"
        subtitle="This is card subtitle"
        footer="This is card footer"
      >
        This is card content
      </lib-card-box>
    </span>
  </div>
  `,
});

export const collapsibleContentCardBox = () => ({
  component: CardBoxComponent,
  template: `
  <div class="ups-gld-global_ui-elements">
    <h3 class="ups-gld-global_ui-elements-heading">Collapsible Content card</h3>
    <span>
      <lib-card-box
        title="This is card title"
        subtitle="This is card subtitle"
        footer="This is card footer"
        isCollapsable="true"
        headericon="ship"
      >
        This is card content
        <div expandable>
          This is hidden card content
        </div>
      </lib-card-box>
    </span>
  </div>
  `,
});
