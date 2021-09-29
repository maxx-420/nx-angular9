// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Landing layout component

import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'lib-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.scss'],
})
export class LandingLayoutComponent {
  @Input() containerTemplate: TemplateRef<any>;
  @Input() shipmentsDetailPage = false;
  @Input() loginLandingPage = false;

  activeRoute = '';
}
