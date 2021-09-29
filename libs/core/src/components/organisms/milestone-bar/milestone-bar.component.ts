// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Shipment milestone filters
 */

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { MILESTONE_ICONS } from '../../../constants/global.constant';
import CommonUtility from '../../../utils/commonUtil';

@Component({
  selector: 'lib-milestone-bar',
  templateUrl: './milestone-bar.component.html',
  styleUrls: ['./milestone-bar.component.scss'],
})
export class MilestoneBarComponent implements OnChanges {
  @Input() milestones: Array<any>;
  @Input() cardTitleLbl = '';
  @Input() modalTitleLbl = '';
  @Input() modalLearnMoreLbl = '';
  @Input() hasApiFailed = false;
  @Input() errorReason = '';
  @Input() pageSection = '';
  @Input() totalCountTileId = '';
  @Input() componentFilterId = '';
  @Input() defaultFilters: [];
  @Input() selectedFilters: [];
  dataAutomationAttribute = 'milestone-bar-';
  dataAutomationAttributeFilterChip = 'milestone-bar-filter-chip';
  tileClicked = '';
  utility = CommonUtility;
  availableIcons = MILESTONE_ICONS.availableIcons;
  defaultIcon = MILESTONE_ICONS.defaultIcon;
  isLearnMoreClicked = false;
  @Output() openFilter = new EventEmitter();
  @Output() clickMilestoneEvent = new EventEmitter<string>();
  constructor() {}

  /**
   * ngOnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    /* istanbul ignore else*/
    if (
      changes?.milestones?.previousValue !== changes?.milestones?.currentValue
    ) {
      this.milestones = changes.milestones.currentValue;
    }
  }

  /**
   * Method to emit step selection event
   */
  onTileClick(value: number) {
    this.tileClicked = this.milestones[value] && this.milestones[value].id;
    this.clickMilestoneEvent.emit(this.tileClicked);
  }

  /**
   * method to invoke when view data link is clicked.
   */
  onLearnMoreClick() {
    this.isLearnMoreClicked = !this.isLearnMoreClicked;
  }
}
