// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
//

import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-spinner',
  template: `
    <svg
      class="spinner"
      role="img"
      [attr.width]="dimension"
      [attr.height]="dimension"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="circle"
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  `,
  styles: [
    '.spinner { animation: rotation 1.35s linear infinite; }',
    '@keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(270deg); } }',
    '.circle { stroke-dasharray: 180; stroke-dashoffset: 0; transform-origin: center; animation: turn 1.35s ease-in-out infinite; }',
    '@keyframes turn { 0% { stroke-dashoffset: 180; } 50% { stroke-dashoffset: 45; transform: rotate(135deg); } 100% { stroke-dashoffset: 180; transform: rotate(450deg); } }',
    'svg:nth-child(1){stroke:#FFDC00;}',
  ],
})
export class SpinnerComponent {
  @Input() dimension = '20px';
}
