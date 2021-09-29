// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Shipment milestones component
 */

import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import CommonUtility from '../../../utils/commonUtil';
import { MILESTONE_ICONS, MILESTONE_STATUS, SHIPMENT_ID } from '../../../constants/global.constant';
import { AnalyticsService } from '../../../service/analytics-wrapper/analytics.service';
import { ConfigData } from '../../../global-config';
import { default as ViewportUtility } from '../../../utils/viewport';
import { VIEWPORT_NAMES } from '../../../constants/viewport.constant';
@Component({
  selector: 'lib-shipment-milestones',
  templateUrl: './shipment-milestones.component.html',
  styleUrls: ['./shipment-milestones.component.scss'],
})
export class ShipmentMilestonesComponent
  implements AfterViewInit, OnChanges, OnInit, OnDestroy {
  @Input() stepsInfo;
  @Input() routePath;
  @Output() milestoneEvent = new EventEmitter<string>();
  @Input() dataAutomationAttributeName;
  @Input() milestoneLabels;
  @Input() isShipmentClicked;
  @Input() contentHtmlKey: string;
  @Input() modalTitle: string;
  @Input() isGFFMovement = false;

  utility = CommonUtility;
  milestoneStatus = MILESTONE_STATUS;
  availableIcons = MILESTONE_ICONS.availableIcons;
  defaultIcon = MILESTONE_ICONS.defaultIcon;
  isLearnMoreClicked = false;

  selectedIndex = 0;
  selectedStep = '';

  ngUnsubscribe = new Subject();
  isMobileDevice;
  isDesktop;
  isTablet;

  constructor(private readonly analyticsService: AnalyticsService) {}

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(ConfigData.debounceTime)
      )
      .subscribe(() => {
        this.setSelectedIndexOnViewportChange();
      });
    this.initViewportVariables();
  }

  /**
   * Initializes viewport variables
   */
  initViewportVariables() {
    this.isMobileDevice = ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile);
    this.isTablet = ViewportUtility.checkViewport(VIEWPORT_NAMES.tablet);
    this.isDesktop = ViewportUtility.checkViewport(VIEWPORT_NAMES.desktop);
  }

  /**
   * method to invoke when learn more link is clicked.
   */
  onLearnMoreClick() {
    this.analyticsService.createLinkClickTagObject(
      '#',
      'Learn More about ' + this.modalTitle,
      'Contextual Help Interaction',
      'Internal',
      {link_section: 'Contextual Help'}
    );
    this.isLearnMoreClicked = true;
  }

  /**
   * method to invoke when modal is closed
   * @param event event
   */
  onModalClose(event) {
    this.analyticsService.createModalOpenCloseTagObject(
      this.modalTitle,
      'Modal Closed',
      'Internal',
      {link_section: 'Modal'}
    );
    this.isLearnMoreClicked = false;
  }

  /**
   * to set selected index when viewport is changed
   */
  setSelectedIndexOnViewportChange() {
    if (
      !ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile) &&
      this.selectedIndex === -1
    ) {
      this.selectedIndex = 0;
    }
    if (
      ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile) &&
      this.selectedIndex === 0 &&
      !this.isShipmentClicked
    ) {
      this.selectedIndex = -1;
    }
  }

  /**
   * ngOnDestroy life cycle hook
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Emits selected step id to the parent
   * @param value The selected step index
   */
  onStepSelection(value) {
    if (value === 0) {
      this.selectedStep = SHIPMENT_ID;
    } else {
      this.selectedStep =
        this.stepsInfo[value - 1] &&
        this.stepsInfo[value - 1].id &&
        this.stepsInfo[value - 1].id?.toLowerCase();
    }
    this.milestoneEvent.emit(this.selectedStep);
  }

  /**
   * ngAfterViewInit lifecycle hook
   */
  ngAfterViewInit() {
    if (this.routePath) {
      this.selectedIndex = this.stepsInfo.findIndex(
        (step) => this.routePath?.toLowerCase() === step.id?.toLowerCase()
      );
      this.selectedIndex += 1;
    } else {
      if (ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile)) {
        this.selectedIndex = -1;
      } else {
        this.selectedIndex = 0;
      }
    }
  }

  /**
   * ngOnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.isShipmentClicked) {
      if (changes.isShipmentClicked.currentValue === true) {
        this.selectedIndex = 0;
      } else if (ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile)) {
        this.selectedIndex = -1;
      }
    }

    if (
      changes.routePath &&
      changes.routePath.currentValue &&
      decodeURIComponent(changes.routePath.previousValue) !==
        decodeURIComponent(changes.routePath.currentValue)
    ) {
      this.selectedIndex = this.stepsInfo.findIndex(
        (step) =>
          decodeURIComponent(changes.routePath.currentValue?.toLowerCase()) ===
          step.id?.toLowerCase()
      );
      this.selectedIndex += 1;
    } else if (changes.routePath) {
      // this case is when user clicks on Back to list from any selected step
      if (
        ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile) &&
        changes.routePath.previousValue
      ) {
        this.selectedIndex = -1;
      } else {
        this.selectedIndex = 0;
      }
    }
  }

  /**
   * to check if milestone is clickable or not
   * @param currentStep Current Milestone step
   */
  isMilestoneClickable(currentStep) {
    if (currentStep.status !== this.milestoneStatus.upcoming) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * tag fires on click of expansion toggle
   * @param isOpen boolean emitted from expansion toggle component
   * @param AccordionTitle Accordion Title being passed from html
   */

  trackExpansionToggle(isOpen: boolean, AccordionTitle = 'Milestones') {
    this.analyticsService.createLinkClickTagObject(
      '#',
      isOpen
        ? `${AccordionTitle} Accordion Open`
        : `${AccordionTitle} Accordion Close`,
      'Milestones',
      'Internal',
      {link_section: 'Milestones'}
    );
  }

  /**
   * On orientation change just close if LG viewport
   * @param event : browser event object
   */
  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event) {
    setTimeout(() => {
      this.initViewportVariables(); // Added this as the view was getting rendered before
      // the variables were being re-initailized.
    });
  }
}
