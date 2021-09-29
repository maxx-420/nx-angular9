// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/*
 * Menu component
 **/

import {
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'lib-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent {
  @Input() isProductLineHLD;
  @Input() menuItems: Array<any>;
  @Input() className = '';
  @Input() customStyle = '';
  @Input() buttonStyling = '';
  @Input() showSpinner = false;
  @Input() footerTemplate: TemplateRef<any>;
  @Input() position: 'before' | 'after' = 'before';
  @Input() showFooterLink;
}
