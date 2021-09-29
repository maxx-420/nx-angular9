// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * input story
 */

import { moduleMetadata } from '@storybook/angular';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputComponent } from './input.component';

export default {
  title: 'Input Component',
  decorators: [
    moduleMetadata({
      declarations: [InputComponent],
      imports: [MatInputModule, BrowserAnimationsModule],
    }),
  ],
};

export const basicInputs = () => ({
  component: InputComponent,
  template: `
  <div>
    <h3 class="ups-gld-global_ui-elements-heading">Basic Inputs</h3>
    <br />
    <span>
      <lib-input></lib-input>
    </span>
    <span>
      <lib-input
        variation="fill"
        name="inputBox"
        label="Search"
        placeholderText="Enter Text"
      ></lib-input>
    </span>
    <span>
      <lib-input
        variation="outline"
        name="inputBox"
        label="Search"
        placeholderText="Enter Text"
        color="accent-yellow"
      ></lib-input>
    </span>
    <span>
      <lib-input
        variation="outline"
        name="inputBox"
        label="Search"
        placeholderText="Enter Text"
        color="warn"
      ></lib-input>
    </span>
    <span>
      <lib-input
        variation="outline"
        name="inputBox"
        label="Search"
        placeholderText="Enter Text"
        color="accent-blue"
      ></lib-input>
    </span>
  </div>
  `,
});
