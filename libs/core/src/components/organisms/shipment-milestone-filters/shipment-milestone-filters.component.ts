// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Shipment milestone filters
 */

import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { MILESTONE_ICONS } from '../../../constants/global.constant';
import CommonUtility from '../../../utils/commonUtil';

import { ConfigData } from './../../../global-config/index';
import { default as ViewportUtility } from './../../../utils/viewport';
import { VIEWPORT_NAMES } from './../../../constants/viewport.constant';
import { config } from './shipment-milestone-filters.component.config';

@Component({
  selector: 'lib-shipment-milestone-filters',
  templateUrl: './shipment-milestone-filters.component.html',
  styleUrls: ['./shipment-milestone-filters.component.scss'],
})
export class ShipmentMilestoneFiltersComponent
  implements AfterContentInit, OnChanges, OnDestroy {
  @Input() milestones: Array<any>;
  @Input() selectedStep = '';
  @Input() milestoneType = '';
  selectedIndex = -1;
  prevStepIndex: number;
  isMobileDevice = ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile);
  @Output() selectMilestoneEvent = new EventEmitter<string>();
  @Output() windowResizeEvent = new EventEmitter<string>();
  shipmentId = config.shipmentId;
  utility = CommonUtility;
  ngUnsubscribe = new Subject();

  availableIcons = MILESTONE_ICONS.availableIcons;
  defaultIcon = MILESTONE_ICONS.defaultIcon;
  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(ConfigData.debounceTime)
      )
      .subscribe(() => {
        this.onWindowResize();
      });
  }

  /**
   * updating view based on window resize window:resize
   */
  onWindowResize() {
    // comparing viewports on window resize if viewport is changing to mobile from tablet/desktop
    const currentViewport = ViewportUtility.getCurrentViewport();
    this.windowResizeEvent.emit(currentViewport);
    if (
      currentViewport !== VIEWPORT_NAMES.mobile &&
      this.isMobileDevice &&
      this.selectedIndex === -1
    ) {
      this.selectedIndex = 0;
      this.onStepSelection(this.selectedIndex);
    }
    // when moving from desktop/tablet to mobile we need remove selection if first tab is selected
    if (
      !this.isMobileDevice &&
      currentViewport === VIEWPORT_NAMES.mobile &&
      this.selectedIndex === 0
    ) {
      this.selectedStep = '';
      this.selectedIndex = -1;
      this.prevStepIndex = null;
      this.selectMilestoneEvent.emit(this.selectedStep);
    }

    this.isMobileDevice = ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile);
  }

  /**
   * AfterViewInit life cycle hook
   */
  ngAfterContentInit() {
    // checking if mobile device to restrict initial tab selection
    /* istanbul ignore else*/
    if (!this.isMobileDevice) {
      let selectedIndex = 0;
      /* istanbul ignore else*/
      if (this.selectedStep) {
        selectedIndex = this.milestones.findIndex((milestone) => {
          return milestone.id?.toLowerCase() === this.selectedStep?.toLowerCase();
        });
        this.selectedIndex = selectedIndex >= 0 ? selectedIndex : 0;
      }
    }
  }

  /**
   * ngOnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    /* istanbul ignore else*/
    if (changes.selectedStep) {
      this.selectedStep = changes.selectedStep.currentValue;
      /* istanbul ignore else*/
      if (this.selectedStep === '') {
        this.selectedIndex = -1;
        this.prevStepIndex = null;
      } else {
        let selectedIndex = 0;
        selectedIndex = this.milestones.findIndex((milestone) => {
          return milestone.id?.toLowerCase() === this.selectedStep?.toLowerCase();
        });
        this.selectedIndex = selectedIndex >= 0 ? selectedIndex : 0;
      }
    }
  }

  /**
   * Method to emit step selection event
   */
  onStepSelection(value: number) {
    /* istanbul ignore else*/
    if (this.prevStepIndex !== value) {
      this.selectedIndex = value;
      this.selectedStep = this.milestones[value] && this.milestones[value].id;
      this.selectMilestoneEvent.emit(this.selectedStep);
      this.prevStepIndex = value;
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
   * Method to capitalize first letter of string
   * @param word string to convert
   */
  toSentenceCase(word) {
    return word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase();
  }
}
