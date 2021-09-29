// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { VIEWPORT_NAMES } from '../../../constants/viewport.constant';
import { ViewportUtility } from '../../../utils';
import { ROUTER_CONSTANTS } from '../../../constants/router.constant';

@Component({
  selector: 'lib-wip-drilldown-filters',
  templateUrl: './wip-drilldown-filters.component.html',
  styleUrls: ['./wip-drilldown-filters.component.scss'],
})
export class WIPDrilldownFiltersComponent implements AfterViewInit {
  selectBoxStyle = {width: '100%'};
  @Input() filterData: any = [];
  @Input() warehouseListing: any = [];
  @Input() wipChartType;
  @Input() applyOnLoad = false;
  @Input() disableApply = false;
  @Output() filterApplied = new EventEmitter();
  isMobile = false;
  btnFullWidth = false;

  outboundWIP = ROUTER_CONSTANTS.outboundWIP;

  filterForm: FormGroup = this.fb.group({
    dates: this.fb.group({
      dateRange: [''],
      startDate: [''],
      endDate: [''],
    }),
    warehouseCode: [''],
    wipActivity: [''],
    shipmentMode: [''],
  });

  selectedDropdownValues = {
    warehouseCode: [],
    shipmentMode: [],
    wipActivity: [],
  };

  constructor(private readonly fb: FormBuilder) {
    this.initViewportVariables();
  }

  /**
   * ngAfterViewInit
   */
  ngAfterViewInit(): void {
    if (this.applyOnLoad) {
      this.applyFilters();
    }
  }

  /**
   * apply filters
   */
  applyFilters() {
    this.filterApplied.next([
      {...this.filterForm.value, ...this.selectedDropdownValues},
      this.filterForm.valid,
    ]);
  }

  /**
   * On orientation change
   * @param event : browser event object
   */
  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event) {
    setTimeout(() => {
      this.initViewportVariables();
    });
  }

  /**
   * Initializes viewport variables
   */
  initViewportVariables() {
    this.isMobile = ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile);
    this.btnFullWidth = this.isMobile ? true : false;
  }
}
