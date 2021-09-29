// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import {
  ChangeDetectorRef,
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
/* import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators'; */
import {
  ShipmentCountFilterDrilldownConfigGFF,
  ShipmentCountFilterDrilldownConfigHLD,
} from '../../../global-config/shipment-group-count-filter.config';

/* import { selectShipmentExceptionsCount } from 'src/app/store/shipment-dashboard/selectors/shipment-dashboard.selectors'; */

@Component({
  selector: 'lib-movement-shipment-count',
  templateUrl: './movement-shipment-count.component.html',
  styleUrls: ['./movement-shipment-count.component.scss'],
})
export class MovementShipmentCountComponent
  implements OnChanges, OnInit, OnDestroy {
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
  @Input() showLearnMore = true;
  @Output() openFilter = new EventEmitter();
  // isLoading = true;
  total: any;
  isViewDataClicked = false;
  hasShipmentExceptionsApiFailed: boolean;
  learnMoreTableData: any[];
  learnmoreModalTitleDate: string;
  private filters;
  private ngUnsubscribe = new Subject();

  constructor(
    /* private store: Store,*/
    private _cdr: ChangeDetectorRef,
    public router: Router
  ) {
    this.isLoading = true;
  }

  /**
   * ngOnChanges life cycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.config) {
      this.setLearnMoreTableData();
    }
    CommonUtility.detectChanges(this._cdr);

    /* if (changes?.triggerLoading && !this.isLoading) {
      this.isLoading = true;
    } */
    if (
      changes?.selectedCountFilters?.previousValue !==
      changes?.selectedCountFilters?.currentValue
    ) {
      this.learnmoreModalTitleDate = this.selectedCountFilters
        ? CommonUtility.getModalTitleDateRange(this.selectedCountFilters)
        : '';
    }
  }
  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    /* this.store
      .select(selectShipmentExceptionsCount)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        if (res?.isLoaded) {
          this.config.count = res.count;
          this.setLearnMoreTableData();
        }
        if (res?.errorDetails) {
          this.hasShipmentExceptionsApiFailed = true;
        } else {
          this.hasShipmentExceptionsApiFailed = false;
        }
        this.isLoading = false;
        CommonUtility.detectChanges(this._cdr);
      }); */
  }

  /**
   * setting data for LearnMore modal Table
   */
  setLearnMoreTableData() {
    this.learnMoreTableData = [
      {
        label: 'lbl_hld_dashboard_' + this.config.id,
        value: this.config.count || 0,
        data: this.config,
      },
    ];
  }

  /**
   * ngOnDestroy life cycle hook
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
      if (tile.state) {
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
          ...(tile.queryParams && { queryParams: tile.queryParams }),
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
}
