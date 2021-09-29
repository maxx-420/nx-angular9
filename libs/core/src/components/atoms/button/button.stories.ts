// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * button story
 */

import { moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';

import { ButtonComponent } from './button.component';

export default {
  title: 'Button Component',
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent],
      imports: [MatButtonModule],
    }),
  ],
};

export const basicButtons = () => ({
  component: ButtonComponent,
  template: `
  <div class="ups-gld-global_ui-elements">
    <h3 class="ups-gld-global_ui-elements-heading">Basic Buttons</h3>
    <br />
    <span>
      <lib-button></lib-button>
    </span>
    <span>
      <lib-button text="basic" color="accent-blue"></lib-button>
    </span>
    <span>
      <lib-button text="basic" color="accent-yellow"></lib-button>
    </span>
    <span>
      <lib-button text="basic" color="accent-green"></lib-button>
    </span>
    <span>
      <lib-button className="button-class" variation="link"></lib-button>
    <span>
      <lib-button
        className="button-class"
        variation="link"
        color="accent-blue">
      </lib-button>
    </span>
    </span>
    <span>
      <lib-button
        text="basic"
        disabled="true"
        variation="outline"
        color="accent-yellow">
      </lib-button>
    </span>
    <span>
      <lib-button
        text="basic"
        color="accent-blue"
        variation="outline">
      </lib-button>
    </span>
    <br />
    <div style="padding-top: 10px;">
      <lib-button text="basic" fullWidth="true" color="warn"></lib-button>
    </div>
  </div>
  `,
});
