// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AnalyticsService } from '../../../service/analytics-wrapper/analytics.service';

@Component({
  selector: 'time-chart-filters',
  templateUrl: './time-chart-filters.component.html',
})
export class TimeChartFiltersComponent {
  @Input() isChartFilter: boolean;
  @Input() showDateRangeFilter: boolean;
  @Input() selectClassName = '';
  @Output() dateRangeChanged = new EventEmitter();
  @Input() title: string;

  isDateFiltertracked = false;
  constructor(private readonly analyticsService: AnalyticsService) {}
  /**
   * track chart filter first change event
   */
  trackDateFilterChange() {
    if (!this.isDateFiltertracked) {
      this.isDateFiltertracked = true;
      this.analyticsService.createLinkClickTagObject(
        '#',
        'Date Filter',
        this.title + ' Date filter interaction',
        'Internal',
        { link_section: this.title }
      );
    }
  }
}
