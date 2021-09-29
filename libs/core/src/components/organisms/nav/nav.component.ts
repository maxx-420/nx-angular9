// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Navigation Menu

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AnalyticsService } from '../../../service/analytics-wrapper/analytics.service';
import { ROUTER_CONSTANTS } from '../../../constants/router.constant';

@Component({
  selector: 'lib-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class LeftNavComponent {
  @Input() sideNavApps = [];
  @Output() navClicked = new EventEmitter();

  constructor(
    public router: Router,
    private readonly analyticsService: AnalyticsService
  ) {}

  /**
   * Returns a flag to show highlight on Selected menu link
   * @param url : Url of the menu link
   */
  isSelected(url) {
    const symphonyUrl = `/${ROUTER_CONSTANTS.gldPlatform}`;
    if (
      this.router.url.startsWith(url) ||
      ((this.router.url === symphonyUrl ||
        this.router.url === symphonyUrl + '/') &&
        url.startsWith(
          `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`
        ))
    ) {
      return true;
    }

    // do not select
    return false;
  }

  /**
   * Let parent know about navigation click
   */
  navClick(url, serviceName) {
    this.navClicked.emit(true);
    this.tagOnNavClick(url, serviceName);
  }
  /**
   * Tag fires on Left Navigation Click
   */
  tagOnNavClick(url: string, serviceName: string) {
    const linkName = serviceName.replace(
      serviceName.charAt(0),
      serviceName.charAt(0)?.toUpperCase()
    );
    this.analyticsService.createLinkClickTagObject(
      url,
      linkName,
      'Left Navigation Menu Clicked',
      'Internal',
      { link_section: 'Left Navigation Menu' }
    );
  }
}
