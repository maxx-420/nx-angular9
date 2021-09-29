// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

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
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { CommonUtility, NavigationUtility } from '../../../utils';
import { ShipmentCountsKeys } from '../../../global-config/movement-shipment-group-count.config';
import {
  inTransitMilestonesStatus,
  ShipmentCountFilterDrilldownConfigGFF,
  ShipmentCountFilterDrilldownConfigHLD,
} from '../../../global-config/shipment-group-count-filter.config';
import { MilestoneStatus } from '../../../constants';

@Component({
  templateUrl: './movement-shipment-group-count.component.html',
  styleUrls: ['./movement-shipment-group-count.component.scss'],
  selector: 'lib-movement-shipment-group-count',
})
export class MovementShipmentGroupCountComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() selectedCountFilters;
  @Input() dataAutomationAttr;
  @Input() triggerLoading;
  @Input() isLoading;
  @Input() titleName;
  @Input() config;
  @Input() styles;
  @Input() isGFF = false;
  @Input() selectedChipFilters;
  @Input() defaultChipFilters;
  @Input() componentFilterId;
  @Output() openFilter = new EventEmitter();
  total: any;
  // isLoading: boolean;
  isViewDataClicked: boolean;
  hasSummaryApiFailed: boolean;
  learnMoreTableData: { label: string; value: any; data: any }[];
  learnmoreModalTitleDate: string;
  private filters;
  private ngUnsubscribe = new Subject();

  constructor(public router: Router) {
    this.isLoading = true;
  }

  /**
   * ngOninit life cycle hook
   */
  ngOnInit() {
    /* this.store
      .select(selectShipmentSummary)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        if (res?.isLoaded) {
          if (res?.filterID && res.filterID === this.componentFilterId) {
            const summaryData = res.data;
            if (summaryData) {
              this.setCountMetrics(summaryData);
            }
            this.isLoading = false;
          }
        }
        if (res?.errorDetails) {
          this.hasSummaryApiFailed = true;
        } else {
          this.hasSummaryApiFailed = false;
        }
        CommonUtility.detectChanges(this._cdr);
      }); */
  }

  /**
   * ngOnChanges life cycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.config?.data) {
      this.setCountMetrics(this.config?.data);
    }

    /* if (changes?.triggerLoading && !this.isLoading) {
      this.isLoading = true;
    } */
    if (
      changes?.selectedChipFilters?.previousValue !==
      changes?.selectedChipFilters?.currentValue
    ) {
      this.learnmoreModalTitleDate = this.selectedCountFilters
        ? CommonUtility.getModalTitleDateRange(this.selectedCountFilters)
        : '';
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
   * setting data for LearnMore modal Table
   */
  setLearnMoreTableData() {
    this.learnMoreTableData = [];
    if ('total' in this.config) {
      this.learnMoreTableData = [
        {
          label: 'lbl_hld_dashboard_' + this.config?.total?.id,
          value: this.config?.total?.count || 0,
          data: this.config?.total,
        },
      ];
    }
    this.config.counts.forEach((c) => {
      this.learnMoreTableData.push({
        label: 'lbl_hld_dashboard_learnmore_' + c.id,
        value: c.count || 0,
        data: c,
      });
    });
  }

  /**
   * Navigates user to shipment listing page on click of a tile
   * @param tile of the tile clicked
   */
  onTileClick(event, tile) {
    event?.stopPropagation();
    this.filters = this.isGFF
      ? ShipmentCountFilterDrilldownConfigGFF(this.selectedCountFilters)
      : ShipmentCountFilterDrilldownConfigHLD(this.selectedCountFilters);

    if (this.filters) {
      if (this.config.state) {
        const navigationExtras = {
          ...tile.state,
          shipmentsDrilldownFilters: this.filters[tile.id],
        };
        NavigationUtility.navigate(
          this.router,
          [tile.url],
          false,
          navigationExtras,
          undefined,
          true
        );
      } else {
        const navigationExtras = {
          shipmentsDrilldownFilters: this.filters[tile.id],
        };
        NavigationUtility.navigate(this.router, [tile.url], false, {
          state: navigationExtras,
        });
      }
    }
  }

  /**
   * method to invoke when view data link is clicked.
   */
  onViewDataClick() {
    this.isViewDataClicked = !this.isViewDataClicked;
  }

  /**
   * Calculates values for all Movement Shipment Metrics
   * @param summaryData  Milestone summary data
   */
  private setCountMetrics(summaryData: any): void {
    if ('total' in this.config) {
      this.config.total.count = summaryData.totalCount
        ? +summaryData.totalCount
        : 0;
    }

    const milestoneIds: Set<string> = new Set([
      ShipmentCountsKeys.shipmentsDeliveredSummary,
      ShipmentCountsKeys.shipmentsInTransitSummary,
      ShipmentCountsKeys.shipmentsBookedSummary,
    ]);

    this.config.counts.forEach((c: any): void => {
      if (milestoneIds.has(c.id)) {
        c.count = this.calculateShipmentMilestonesCount(summaryData, c.id);
      } else if (summaryData[c.id]) {
        c.count = summaryData[c.id][0]?.count
          ? +summaryData[c.id][0]?.count
          : 0;
      }
    });

    this.setLearnMoreTableData();
  }

  /**
   * Calculates Shipments count value for the given milestone Id which is equal to the sum of
   * count of shipments having milestone status as milestoneId in milestone summary response.
   * @param summaryData Milestone summary data
   * @param milestoneId Milestone Status Id
   */
  private calculateShipmentMilestonesCount(
    summaryData: any,
    milestoneId: string
  ): number {
    let milestones: string[];
    switch (milestoneId) {
      case ShipmentCountsKeys.shipmentsDeliveredSummary:
        milestones = [MilestoneStatus.delivered];
        break;
      case ShipmentCountsKeys.shipmentsInTransitSummary:
        milestones = this.isGFF
          ? [
              MilestoneStatus.pickup,
              MilestoneStatus.departure,
              MilestoneStatus.arrival,
              inTransitMilestonesStatus.exportCustoms,
              inTransitMilestonesStatus.importCustoms,
            ]
          : [MilestoneStatus.inTransit, MilestoneStatus.customs];
        break;
      case ShipmentCountsKeys.shipmentsBookedSummary:
        milestones = [MilestoneStatus.booked];
        break;
      default:
        milestones = [];
    }
    let count: number = 0;
    milestones.forEach((milestone: string): void => {
      count += +(
        summaryData.milestoneStatusSummary?.find(
          (item: any): boolean =>
            item?.id?.toLowerCase() === milestone?.toLowerCase()
        )?.count ?? 0
      );
    });
    return count;
  }
}
