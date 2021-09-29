// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Delivery Performance component of GLD Platform

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { PlatformService } from '../../../service/platform-service/platform.service';
import {
  CommonUtility,
  NavigationUtility,
  ViewportUtility,
} from '../../../utils';
import { VIEWPORT_NAMES } from '../../../constants/viewport.constant';
import {
  CUSTOM_RANGE_OPTION_VALUE,
  DEFAULT_DATE_FORMAT,
} from '../../../constants/global.constant';

import {
  chartDataDonut,
  chartOptionsBar,
  chartOptionsDonut,
  StackedChartColors,
} from './delivery-performance.charts.config';
import {
  AttributesToFetchData,
  CustomLabelMapping,
  CustomLabelMappingModal,
  dataAutomationAttr,
  DeliveryStatusMapping,
  DropdownOptions,
  linksDrilldownKeys,
  MilestoneDelivered,
  ModalConfig,
  modesCountLimit,
  ResponseKey,
  ShipmentChartData,
  ShipmentDrilldownKeys,
} from './delivery-performance.config';

@Component({
  selector: 'lib-delivery-performance',
  templateUrl: './delivery-performance.component.html',
  styleUrls: ['./delivery-performance.component.scss'],
})
export class DeliveryPerformanceComponent
  implements OnDestroy, OnInit, OnChanges {
  @Input() dateFilter;
  @Input() triggerLoading;
  @Input() selectedChipFilters;
  @Input() defaultChipFilters;
  @Input() componentFilterId;
  @Input() isGFFUser;
  @Input() l2ListingConfig = null;
  @Input() deliveryPerformanceSummary;

  @Output() openFilter = new EventEmitter();

  isDesktopDevice;

  defaultFilterKey: string;
  dataAutomationAttr= dataAutomationAttr;
  chartData: ChartData;
  chartOptionsDonut: ChartOptions;
  chartOptionBar: ChartOptions;
  drilldownArray: any[];
  performanceForm: FormGroup;
  data: any;
  isLoading: boolean;
  selectBoxStyle = { width: '100%', height: '100%' };
  isDonut: boolean;
  modalTitles = {
    modalTitleDefault: '',
    modalTitleMode: '',
  };
  isViewDataClicked = false;
  dropdownOptions = DropdownOptions;
  shipmentChartData = ShipmentChartData;
  attributesToFetchData = AttributesToFetchData;
  toggleValue = ResponseKey;
  labelCustomMapping = CustomLabelMapping;
  labelCustomMappingModal = CustomLabelMappingModal;
  stackedChartColors = StackedChartColors;
  modalConfig = ModalConfig;
  linksDrilldown = linksDrilldownKeys;
  toggleTypes = [this.toggleValue];
  hasSummaryApiFailed = false;
  donutNoData = true;

  private ngUnsubscribe = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly platformService: PlatformService,
    private readonly router: Router
  ) {
    this.performanceForm = this.fb.group({
      performanceBy: [''],
    });
    this.performanceForm
      .get('performanceBy')
      .setValue(this.dropdownOptions[0].value);
    this.chartData = chartDataDonut;
    this.chartOptionsDonut = chartOptionsDonut;
    this.chartOptionBar = chartOptionsBar;
    this.defaultFilterKey = this.isGFFUser
      ? ShipmentDrilldownKeys.shipmentBooked
      : ShipmentDrilldownKeys.shipmentCreation;
    this.isLoading = true;
    this.isDonut = true;
  }

  /**
   * ngOninit life cycle hook
   */
  ngOnInit() {
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
   * Detects dropdown value
   */
  changeLayout() {
    this.isDonut =
      this.performanceForm.get('performanceBy').value ===
      this.dropdownOptions[0].value
        ? true
        : false;
  }

  /**
   * This method recieves teh label clicked on donut chart and drill sdown to list page
   * @param doughnutLabel Label of slice clicked in []
   */
  onDonutChartClicked(doughnutSegmentData: any, fromLearnMore?: boolean) {
    this.drilldownArray = [];
    const deliveredStatusDrilldown = {
      key: ShipmentDrilldownKeys.status,
      value: [MilestoneDelivered],
      deliveryStatus: fromLearnMore
        ? DeliveryStatusMapping[
            doughnutSegmentData.data.join(' ')?.toUpperCase()
          ]
        : DeliveryStatusMapping[doughnutSegmentData.data[0]?.toUpperCase()],
    };
    this.drilldownArray.push(deliveredStatusDrilldown);
    this.drilldownToListPage();
  }

  /**
   * This method recieves the mode and section clicked on bar chart and drills down to list page
   * @param state any
   */
  clickOnModeChart(state, fromLearnMore?: boolean) {
    this.drilldownArray = [];
    const modeDrillDownObj = {
      key: ShipmentDrilldownKeys.shipmentMode,
      value: fromLearnMore ? [state.rowData] : [state.mode[0]],
    };
    this.drilldownArray.push(modeDrillDownObj);

    const deliveredStatusDrilldown = {
      key: ShipmentDrilldownKeys.status,
      value: [MilestoneDelivered],
      deliveryStatus: fromLearnMore
        ? DeliveryStatusMapping[state.columnData]
        : DeliveryStatusMapping[state.status],
    };
    this.drilldownArray.push(deliveredStatusDrilldown);
    this.drilldownToListPage();
  }

  /**
   * This function adds the selected date to drilldown obj and navigates to L2 List
   * @param drilldownArr Array containing selected filters
   */
  drilldownToListPage() {
    this.createDateDrillDownObj();
    // for routing b/w microapps
    if (this.l2ListingConfig.state){
      const navigationExtras = {
        ...this.l2ListingConfig.state,
        shipmentsDrilldownFilters: this.drilldownArray,
      };
      NavigationUtility.navigate(
        this.router,
        [this.l2ListingConfig.url],
        false,
        navigationExtras,
        undefined,
        true
      );
    } else { // for routing within shipments microapp
      const navigationExtras = {
        shipmentsDrilldownFilters: this.drilldownArray,
      };
      NavigationUtility.navigate(this.router, [this.l2ListingConfig.url], false, {
        state: navigationExtras,
      });
    }

  }

  /**
   * Creates the date drilldown obj
   */
  createDateDrillDownObj() {
    const isCustom = this.dateFilter.value === CUSTOM_RANGE_OPTION_VALUE;
    const dateDrilldownObj = {
      key: this.defaultFilterKey,
      value: {
        type: isCustom ? 'custom' : 'relative',
        range: !isCustom ? -1 * this.dateFilter.value : null,
        startDate: this.dateFilter.startDate ?? null,
        endDate: this.dateFilter.endDate ?? null,
      },
    };
    this.drilldownArray.push(dateDrilldownObj);
  }

  /**
   * method to invoke when view data link is clicked.
   */
  onViewDataClick() {
    this.isViewDataClicked = !this.isViewDataClicked;
  }

  /**
   * ngOnChanges life cycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes?.triggerLoading) {
      this.changeLayout();
      if (this.deliveryPerformanceSummary.data) {
        this.formatData(this.deliveryPerformanceSummary.data);
      }
      this.isLoading = this.triggerLoading;
    }
    if (
      changes.dateFilter &&
      changes.dateFilter.previousValue !== changes.dateFilter.currentValue
    ) {
      this.createModalTitle();
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
   * Formats summary data to form acceptable by charts
   */
  formatData(data) {
    this.formatDoughnutChartData(data);
    this.formatBarChartData(data);
  }

  /**
   * Formats data for doughnut chart
   */
  private formatDoughnutChartData(data) {
    let totalOnTime = 0;
    let totalLate = 0;
    const onTime = 'ontime';
    const late = 'late';
    data.forEach((element) => {
      const filteredData = element.deliveryStatus.filter(
        (x) => x.name !== null
      );
      const onTimeCount = filteredData.find(
        (x) => x && x.name?.toLowerCase() === onTime
      )?.count;
      const lateCount = filteredData.find(
        (x) => x && x.name?.toLowerCase() === late
      )?.count;
      totalOnTime += onTimeCount ?? 0;
      totalLate += lateCount ?? 0;
    });

    this.donutNoData = totalOnTime + totalLate > 0 ? false : true;
    this.data = [];

    if (!this.donutNoData) {
      this.data = [
        {
          name: 'On Time',
          count: totalOnTime,
          percent:
            Math.round((totalOnTime / (totalOnTime + totalLate)) * 100) + '%',
        },
        {
          name: 'Late',
          count: totalLate,
          percent:
            Math.round((totalLate / (totalOnTime + totalLate)) * 100) + '%',
        },
      ];

      this.chartOptionsDonut.plugins.doughnutlabel.labels[0].text = this.data[0].percent;
    }
  }

  /**
   * Formats data for bar chart
   */
  private formatBarChartData(data) {
    this.shipmentChartData.deliveryPerformanceSummary.shipmentData = [];
    const topModes = this.getTopModes(data);
    data.forEach((element) => {
      if (topModes.indexOf(element.mode) !== -1) {
        this.shipmentChartData.deliveryPerformanceSummary.shipmentData.push({
          name: element.mode,
          modes: element.deliveryStatus.filter((elem) => elem.name !== null),
        });
      }
    });
  }

  /**
   * The Modal title is dyanamic, due to date field
   */
  private createModalTitle() {
    const startDate = moment(this.dateFilter.startDate).format(
      DEFAULT_DATE_FORMAT
    );
    const endDate = moment(this.dateFilter.endDate).format(DEFAULT_DATE_FORMAT);
    if (this.dateFilter) {
      const dateLabel = ` - From ${startDate} to ${endDate}`;
      this.modalTitles.modalTitleMode =
        this.modalConfig.modalTitleMode + dateLabel;
      this.modalTitles.modalTitleDefault =
        this.modalConfig.modalTitleDefault + dateLabel;
    }
  }

  /**
   * This method finds the top modes by count
   */
  private getTopModes(data) {
    const topModesWithCount = [];
    let topModes = [];
    const onTime = this.linksDrilldown.onTime[0].split(' ').join('');
    const late = this.linksDrilldown.late[0];

    data.forEach((element) => {
      const totalCount = element.deliveryStatus.reduce((acc, curr) => {
        return (
          acc + (curr.name === onTime || curr.name === late ? curr.count : 0)
        );
      }, 0);
      if (totalCount > 0) {
        topModesWithCount.push({ mode: element.mode, count: totalCount });
      }
    });

    // Sorting of modes
    CommonUtility.getTopValuesBasedOnCount(topModesWithCount, modesCountLimit);
    topModes = topModesWithCount.reduce((acc, curr) => {
      acc.push(curr.mode);
      return acc;
    }, []);

    return topModes;
  }
}
