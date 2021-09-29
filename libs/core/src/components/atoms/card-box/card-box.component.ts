// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
//

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VIEWPORT_NAMES } from '../../../constants/viewport.constant';
import { AnalyticsService } from '../../../service/analytics-wrapper/analytics.service';
import { PlatformService } from '../../../service/platform-service/platform.service';

import { default as ViewportUtility } from './../../../utils/viewport';
import { ROUTER_CONSTANTS } from './../../../constants/router.constant';
import NavigationUtility from './../../../utils/navigationUtil';

interface IextraData {
  label: string;
  date: string;
  value: string;
  template: any;
  classes?: string;
}
@Component({
  selector: 'lib-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.scss'],
})
export class CardBoxComponent implements OnInit, OnDestroy {
  /**
   * Card title value
   */
  @Input() title = '';
  @Input() customTooltipTemplate;
  @Input() extraTitle: IextraData;
  /**
   * Card subtitle value
   */
  @Input() subtitle = '';
  /**
   * Card footer value
   */
  @Input() showInfoIcon: boolean;
  @Input() tooltipText;
  @Input() showLearnMoreInTooltip;
  @Output() learnMoreClick = new EventEmitter();
  isDesktopDevice;
  @Input() footer = '';
  @Input() className = '';

  @Input() headerRightTemplate = '';
  @Input() headerLeftTemplate = '';
  /**
   * Custom style passed by parent component.
   */
  @Input() customStyle = '';
  @Input() headerClass = '';
  @Input() contentClass = '';
  @Input() dataAutomationHeader = '';
  @Input() dataAutomationTitle = '';
  @Input() dataAutomationTooltip = '';
  @Input() isCardBoxAccordion = false;

  closeMenu = new BehaviorSubject(false);
  showContent = false;
  _headerIconClass = '';
  /**
   * Boolean for showing and hiding tooltip
   */
  showInfoTooltip;
  infoTooltipLabel;

  get headericon(): string {
    return this._headerIconClass
      ? 'symphony-icons symphony-icons-' + this._headerIconClass
      : null;
  }

  // tslint:disable-next-line: prefer-inline-decorator
  @Input('headericon')
  set headericon(value: string) {
    this._headerIconClass = value;
  }

  isExpanded = false;
  private readonly ngUnsubscribe = new Subject();

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly platformService: PlatformService
  ) {}

  /**
   * OnInit Angular lifecycle hook
   */
  ngOnInit() {
    this.infoTooltipLabel = this.tooltipText || 'lbl_top_records';
    this.isDesktopDevice = ViewportUtility.checkViewport(
      VIEWPORT_NAMES.desktop
    );
    this.platformService.orientationChange$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((viewport) => {
        this.isDesktopDevice = viewport === VIEWPORT_NAMES.desktop;
      });
  }

  /**
   * lifecycle hook
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * hide tooltip on blur
   */

  hideTooltip(e) {
    // if blur is not due inner tooltip-link click
    if (!e.relatedTarget.closest('.tooltip-icon')) {
      this.showInfoTooltip = false;
    }
  }

  /**
   * show tooltip on focus
   */

  showTooltip() {
    this.showInfoTooltip = true;
  }

  /**
   * method to navigate To Reports Section
   */
  navigateToReportsSection() {
    const url = `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.reports}`;
    this.closeMenu.next(true);
    this.trackGoToReportsLink(url);
    NavigationUtility.navigate(null, url, true);
  }

  /**
   * tag fires on click of Go To Reports link
   * @param url url to navigate on
   */
  trackGoToReportsLink(url: string) {
    this.analyticsService.createLinkClickTagObject(
      url,
      'Go To Reports',
      'Clicked on view reports',
      'Internal',
      { link_section: 'All Shipments List' }
    );
  }
}
