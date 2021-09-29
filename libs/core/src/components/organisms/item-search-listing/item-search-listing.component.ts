// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Search by item table
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { AnalyticsService } from '../../../service/analytics-wrapper/analytics.service';
import { TemplateSelectorService } from '../../../service/template-selector-service/template-selector.service';

import { ROUTER_CONSTANTS } from './../../../constants/router.constant';
import {
  setColumnInfo,
  setDisplayedColumns,
} from './item-search-listing.config';
import NavigationUtility from './.././../../utils/navigationUtil';
import { NavigationService } from './../../../service/navigation/navigation.service';
import { INVENTORY_SEARCHBY } from './../../../global-config/search.config';
import { MULTI_SELECT_ALL } from './../../../constants/global.constant';
import { AccessControlUtility } from './../../../utils/access-control.util';
import { itemSearchListingExclusions } from './exclusion-list.config';

@Component({
  selector: 'lib-item-search-listing',
  templateUrl: './item-search-listing.component.html',
})
export class ItemSearchListingComponent implements OnInit {
  @Input() searchByItemArr;
  @Input() showBatch: boolean;
  @Input() isReportsPage: boolean = false;
  @Input() fromRouter;
  @Output() pageNumber = new EventEmitter();
  @Input() searchBy;
  @Input() searchTerm;
  @Input() defaultSortingColumn = 'number';
  @Input() defaultSortingOrder = 'asc';
  searchByBatchNumberKey = 'inventoryBatchNumber';
  columnInfo;
  displayedColumnsForTable = [];
  page: PageEvent;
  @Input() pageSizePerViewport;
  @Input() pageSize = '';
  @Input() errorReason;
  @Input() pageSection;
  @Input() allowSelect = false;
  @Input() defaultItemSearch = false;
  @Input() partialSelection: { [key: string]: any[] };
  @Output() selection = new EventEmitter();
  batchStatusTemplate;

  constructor(
    private readonly _navigationService: NavigationService,
    private readonly _analyticsService: AnalyticsService,
    private readonly templateService: TemplateSelectorService
  ) {}

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit(): void {
    this.batchStatusTemplate = this.templateService.templates.get(
      'batchStatusTemplate'
    );

    const excludedColumns: any = AccessControlUtility.getCurrentFieldMapping(
      itemSearchListingExclusions
    );
    this.displayedColumnsForTable = setDisplayedColumns(
      this.allowSelect,
      this.searchBy,
      excludedColumns,
      this.showBatch,
      this.isReportsPage
    );
    this.columnInfo = setColumnInfo(
      this.allowSelect,
      this.searchBy,
      excludedColumns,
      this.showBatch,
      this.isReportsPage,
      this.batchStatusTemplate
    );
  }

  /**
   * tag fires on search results load
   */
  tagOnPageLoad() {
    const tagObj = {
      on_site_search_term: this.searchTerm,
      on_site_search_type_super_category: this.searchBy,
      on_site_search_results: this.searchByItemArr.length,
    };
    this._analyticsService.createSearchResultsLoadTagObject(
      true,
      ROUTER_CONSTANTS.search,
      tagObj
    );
  }
  /**
   * Method to get clicked row data and navigate to L3 page with shipment number.
   * @param rowData shipment row data
   */
  getClickedRowData(rowData) {
    const itemNumber = encodeURIComponent(rowData.number);
    // EncodeURIComponent encodes null as 'null' so need to check for that too
    const searchByList = Object.keys(INVENTORY_SEARCHBY).map(
      (key) => INVENTORY_SEARCHBY[key]
    );
    const searchBy =
      searchByList.indexOf(this.searchBy) > -1 ? this.searchBy : undefined;
    if (itemNumber && itemNumber !== 'null') {
      const url = `${ROUTER_CONSTANTS.itemDetails}/${itemNumber}`;
      if (searchBy) {
        this._navigationService.navigateWithQueryParams(url, {
          searchBy,
          searchTerm: this.searchTerm,
        });
      } else {
        NavigationUtility.navigate(null, url, true, {
          from: this.fromRouter,
          drillDownData: {
            batches:
              rowData.batchNumber &&
              this.searchBy === this.searchByBatchNumberKey
                ? [rowData.batchNumber]
                : [MULTI_SELECT_ALL],
            warehouses: [MULTI_SELECT_ALL],
          },
        });
      }
    }
  }

  /**
   * pageChanged
   * @param event pagination event
   */
  pageChanged(event: PageEvent) {
    this.page = event;
    this.pageNumber.emit(this.page);
  }
}
