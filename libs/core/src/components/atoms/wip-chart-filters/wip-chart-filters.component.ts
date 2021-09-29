// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

import { AnalyticsService } from '../../../service/analytics-wrapper/analytics.service';

@Component({
  selector: 'wip-chart-filters',
  templateUrl: './wip-chart-filters.component.html',
  styleUrls: ['./wip-chart-filters.component.scss'],
})
export class WipChartFiltersComponent implements OnInit, OnChanges {

  @Input() toggleValue: string;
  @Input() toggleTypes = [];
  @Input() chartFilterForm: FormGroup;
  @Input() showCustomLegends: boolean;
  @Input() legendList: string[];
  @Input() showModeFilter: boolean;
  @Output() toggleChangedEvent: EventEmitter<MatButtonToggleChange> = new EventEmitter<MatButtonToggleChange>();
  @Input() title;
  smallMultiSelectDropdownClass = 'smallMultiSelectDropdown';
  isToggleChangeNotTracked: string[];
  isSelectDropdownTracked = false;
  selectBoxStyle = {
    width: '118px',
    'min-width': '118px',
  };
  constructor(private readonly analyticsService: AnalyticsService,
  ) { }

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit() {
    this.isToggleChangeNotTracked = [...this.toggleTypes];

  }

  /**
   * ngOnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.toggleValue.previousValue !== changes.toggleValue.currentValue && this.legendList) {
      this.legendList = [...this.legendList];
    }
  }
  /**
   * function called when toggle is changed
   */

  toggleChanged(e: MatButtonToggleChange = null) {
    this.toggleChangedEvent.emit(e);
    this.toggleValue = e?.value || this.toggleTypes[0];
    if (this.isToggleChangeNotTracked.indexOf(this.toggleValue) >= 0) {
      this.trackToggleChanges(this.toggleValue);
      this.isToggleChangeNotTracked.splice(this.isToggleChangeNotTracked.indexOf(this.toggleValue), 1);
    }
  }

  /**
   * track changes on toggle Values
   */
  trackToggleChanges(toggleValue: string) {
    this.analyticsService.createLinkClickTagObject(
      '#',
      toggleValue,
      this.title + ' graph interaction',
      'Internal',
      { link_section: this.title }
    );
  }
  /**
   * track click on sections
   */
  trackSelectValueChange(sectionName?: string) {
    if (!this.isSelectDropdownTracked) {
      this.isSelectDropdownTracked = true;
      this.analyticsService.createLinkClickTagObject(
        '#',
        sectionName,
        `${this.title} ${sectionName} interaction`,
        'Internal',
        { link_section: this.title }
      );
    }
  }

}
