// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-footer-cost-link',
  templateUrl: './footer-cost-link.component.html',
  styleUrls: ['./footer-cost-link.component.scss'],
})
export class FooterCostLinkComponent {
  /**
   * This parameter adds styling for L3 page i.e. add extra left padding for left nav-bar
   */
  @Input() customStyleForL3: boolean = false;
  /**
   * This parameter adds scss class if the component is added in a specific page i.e. to fix the position of the icon at the bottom-left
   */
  @Input() customPageStyle: boolean = false;
}
