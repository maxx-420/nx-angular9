// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * data table component
 */

import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { SymphonyDatePipe } from '../../../pipe/symphony-date.pipe';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { MULTI_SELECT_ALL } from '../../../constants/global.constant';

import { VIEWPORT_NAMES } from './../../../constants/viewport.constant';
import ViewportUtility from './../../../utils/viewport';
import { MAX_RECORDS } from './../../../global-config/config';
import getTablePaginationHeader from './../../../utils/getTablePaginationHeader';
import { default as CommonUtility } from './../../../utils/commonUtil';
import { UserAgentUtility } from './../../../utils/user-agent.util';
import { ExportDataTable } from './../../../utils/dataTableExport.util';

// prettier-ignore
const _moment = (moment as any).default ? (moment as any).default : moment;

/**
 * Data Table Molecule Component
 */
@Component({
  selector: 'lib-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataTableComponent
  implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  excelXml: ExportDataTable;
  @Input()
  set extraTitle(title) {
    this._extraTitle = title;
  }

  get extraTitle() {
    return this._extraTitle;
  }
  @ViewChild(MatPaginator) matPaginator: MatPaginator;

  @ViewChild(MatSort) matSort: MatSort;
  /**
   * These names should be same as keys of tableData, in the sequence whatever you want to display.
   */
  @Input() displayedColumns: any[]; // These names should be same as keys of tableData, in the sequence whatever you want to display.
  @Input() enableSort = true;
  @Input() enablePagination = true;
  @Input() tableData: any;
  @Input() columnInfo: any; // keys of this columnInfo object must be same as values in displayedColumns array.
  @Input() elevationClass = 'mat-elevation-z0';
  @Input() rowClickable = false;
  @Input() firstColumnSticky = false;
  @Input() tableMinWidth = null; // minimum table width in any scenario.
  @Input() viewportMinWidthToShowScroll: string; // viewport width required for complex scenario when we don't have full width tables.
  @Input() showPaginatorTotalPages = 3;
  @Input()
  pageSizePerViewport = {}; /* use this if we want to give different page sizes for different view ports.
                                              Ex: { mobile: 2, tablet: 3, desktop: 5}, keys name should be same like this.*/
  @Input() paginatorPageSize = 2; // common paginator size for all view ports.
  @Input() dataAutomationAttribute = '';
  @Input() dataAutomationAttrFilterChip = '';
  @Input() noRecordMessage = '';
  @Output() emitRowData = new EventEmitter();
  @Output() matPaginatorChanged = new EventEmitter();
  @Input() tooltipText;
  @Input() customTooltipTemplate;
  @Input() firstColumnBold = false;
  @Input() showTotalRecordsCount = false;
  @Input() totalRecordsCount;
  @Input() showAllSelected = false;
  /**
   * For default sorting(we pass column name and order for sorting)
   */
  @Input() defaultSortingColumn = null;
  @Output() dataSortingChanged = new EventEmitter();
  @Input() defaultSortingOrder: 'asc' | 'desc' = 'asc';

  @Input() dataAutomationTitle;
  @Input() dataAutomationHeader;
  @Input() dataAutomationTooltip;
  @Input() tableTitle;
  @Input() headerRightTemplate = '';
  @Input() headerClass = '';
  @Input() headerLeftTemplate = '';
  @Input() showInfoIcon = false;
  @Input() alwaysShowInfoIcon = false;
  @Input() collapsible = false;
  @Input() headericon = false;
  @Input() wrapInCard = true;

  @Input() showFilterChip: false;
  @Input() defaultFilters: [];
  @Input() selectedFilters: [];
  @Output() openFilter = new EventEmitter();
  @Output() chipFilterRemoved = new EventEmitter();
  @Input() componentFilterId;
  @Input() customErrorMessage;
  @Input() noRecordLabel: string;

  @Input() showTable = true;

  @Input() customStyle: any = { height: '80px' };
  @Input() errorReason: string;
  @Input() pageSection: string;

  @Input() greyOutUnclickableRow = false;

  @Input() rowAriaLabel = '';
  @Output() selection = new EventEmitter();
  @Input() filterPredicate;
  @Input() filterValue;
  @Input() tableContainerClass = '';
  @Input() pageName: string = 'listing'; // name of the page to be included in file name of excel.
  @Input() sheetName: string = ''; // name of sheet used inside the excel file.
  @Input() canExport: boolean = false;
  @Input() partialSelection: { [key: string]: any[] };
  _extraTitle;
  maxRecords = MAX_RECORDS;

  isTableScrollable = false;
  currentPage = 0;

  isMobile = false;
  tableHeaderCaption;

  viewPortsMaxWidths = {
    mobile: 767,
    tablet: 1023,
  };
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  cardTitle = {};
  isExportBtnLoading: boolean = false;
  sortedList: any[];

  /**
   * Data to be displayed in the table. (array of objects)
   */
  private readonly ngUnsubscribe = new Subject();
  private readonly changeDetectionSubject = new Subject();

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly symphonyDatePipe: SymphonyDatePipe,
    private readonly contentPipe: RenderLabelPipe
  ) {
    this.initViewportVariables();
  }

  /**
   * ngoninit life cycle hook
   */
  ngOnInit(): void {
    if (
      this.pageSizePerViewport &&
      Object.keys(this.pageSizePerViewport).length
    ) {
      this.setPageSizePerViewport();
    }

    this.subscribeDetectChanges();
    if (this.filterPredicate) {
      this.dataSource.filterPredicate = this.filterPredicate;
    }
    if (this.columnInfo) {
      this.transformLabelContent();
    }
    if (this.partialSelection && Object.keys(this.partialSelection)?.length) {
      this.selectPartialRows();
    } else if (this.showAllSelected) {
      this.masterToggle();
    }
  }

  /**
   * partial row selection if partialSelection object key and its any value exists in datasource
   */
  selectPartialRows() {
    /**
     * create object whaich have unique key and each key have list of unique values
     * e.g. {batchNumber: [1,2,2,2,2,2,3,4,1]} map to {batchNumber: {1,2,3,4}} object
     *
     */
    const partialSelectionKeyValuesSet: { [key: string]: Set<string> } = {};
    /**
     * list of partialSelection keys which does not have values in in there list
     * e.g. batchNumber: [1,2,4] // [1,2,4] does not have 'all' so it will be added to optsNothavingAllKey
     */
    const optsNothavingAllKey: string[] = [];
    // create key wise set
    Object.keys(this.partialSelection).forEach((k) => {
      const v = this.partialSelection[k];
      partialSelectionKeyValuesSet[k] = new Set(v);
      // check particular key k have 'MULTI_SELECT_ALL' in options or not
      if (
        !partialSelectionKeyValuesSet[k].has(MULTI_SELECT_ALL.toLowerCase())
      ) {
        optsNothavingAllKey.push(k);
      }
    });
    // if all key options have MULTI_SELECT_ALL then we select all rows
    if (optsNothavingAllKey.length === 0 && this.showAllSelected) {
      this.masterToggle();
      return;
    }
    // clear all selection
    this.columnInfo.select.selection.clear();
    const shouldSelectRow = (row) => {
      /**
       * 1. few keys does not have 'all' in  set, => check Row for AND condition
       * if AND condition not satisfied and few keys have 'all' in  set   then verify that key exists in row
       */
      if (optsNothavingAllKey.length !== 0) {
        return optsNothavingAllKey.every(
          (k) =>
            partialSelectionKeyValuesSet[k] &&
            partialSelectionKeyValuesSet[k].has(row[k])
        );
      }
      return true;
    };

    // mark selection on rows
    this.dataSource.data.forEach((row) => {
      if (shouldSelectRow(row)) {
        this.columnInfo.select.selection.select(row);
      }
    });
    this.selection.emit(this.columnInfo?.select?.selection.selected);
  }

  /**
   *
   * method which matches given width with viewport width
   */
  matchViewPort(width) {
    return window.matchMedia(`(max-width: ${width}px)`).matches;
  }

  /**
   * ngOnChanges life cycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.tableData && changes.tableData.currentValue) {
      this.dataSource.data = this.tableData;
      if (this.matPaginator && this.enablePagination) {
        this.matPaginator.pageIndex = 0;
        (this.matPaginator as any)._emitPageEvent({
          previousPageIndex: null,
          pageSize: this.matPaginator.pageSize,
          pageIndex: this.matPaginator.pageIndex,
          length:
            this.tableData && this.tableData.length ? this.tableData.length : 0,
        });
      }
    }

    if (
      changes.filterValue &&
      changes.filterValue.previousValue !== changes.filterValue.currentValue
    ) {
      this.dataSource.filter = this.filterValue;
    }

    if (this.matPaginator && !this.dataSource.paginator) {
      this.dataSource.paginator = this.matPaginator;
    }

    this.applyDefaultSorting(changes);
    this.changeDetector.detectChanges();
  }

  /**
   *
   * apply default sorting if default column is passed from parent component.
   */
  applyDefaultSorting(changes) {
    if (
      this.matSort &&
      this.defaultSortingColumn &&
      this.dataSource &&
      this.dataSource.data.length &&
      changes.defaultSortingColumn &&
      changes.defaultSortingColumn.previousValue !==
        changes.defaultSortingColumn.currentValue
    ) {
      this.matSort.sort({
        id: this.defaultSortingColumn,
        start: this.defaultSortingOrder,
        disableClear: true,
      });
    }
  }

  /**
   * ngAfterContentInit lifecycle hook
   */
  ngAfterContentInit() {
    this.isTableScrollable = this.viewportMinWidthToShowScroll
      ? this.matchViewPort(this.viewportMinWidthToShowScroll)
      : this.matchViewPort(this.tableMinWidth);
    if (this.enablePagination && this.matPaginator) {
      this.matPaginatorChanged.next({
        previousPageIndex: null,
        pageSize: this.matPaginator.pageSize,
        pageIndex: this.matPaginator.pageIndex,
        length: this.matPaginator.length,
      });

      this.matPaginator.page
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((page) => {
          this.matPaginatorChanged.next(page);
          this.currentPage = page.pageIndex;
          this.notifyForDetectChanges();
        });
      this.dataSource.paginator = this.matPaginator;
    }
    if (this.matSort) {
      this.dataSource.sortingDataAccessor = (data, property) =>
        this.sortingDataAccessor(data, property);
      this.dataSource.sort = this.matSort;

      this._emitDataIfDefaultSorting();
    }
  }

  /**
   * formatTableDate
   * @param type type
   * @param data data
   */
  formatTableDate(type, data) {
    if (type && type === 'date') {
      return this.symphonyDatePipe.transform(data, 'yyyy-MM-dd HH:mm');
    } else if (type && type === 'dateonly') {
      return this.symphonyDatePipe.transform(data, 'yyyy-MM-dd');
    } else {
      return data;
    }
  }

  /**
   * on sorting change event
   * @param e event
   */
  onMatSortChange(e: Sort) {
    this.sortedList = this.dataSource.sortData(
      [...this.tableData],
      this.matSort
    );
    this.dataSortingChanged.emit(this.sortedList);
    this.notifyForDetectChanges();
  }

  /**
   * export table as excel
   * // todo: Add a try catch
   * check for errors and add a error icon. Close with PO
   */
  exportTableAsExcel(): void {
    try {
      this.isExportBtnLoading = true;
      this.excelXml = new ExportDataTable(
        this.sortedList ? this.sortedList : this.tableData,
        this.displayedColumns,
        this.columnInfo,
        this.contentPipe.transform('lbl_appselector_symphony'),
        this.pageName,
        this.sheetName
      );

      /*
       * Added a set timeout so that it doesn't freeze the export icon, instead it would
       * show the loader
       */
      setTimeout((): void => {
        this.excelXml.download();
        this.isExportBtnLoading = false;
      }, 0);
    } catch (error) {
      this.isExportBtnLoading = false;
    }
  }

  /**
   * custom sorting for data-table
   * @param data data
   * @param property property
   */
  sortingDataAccessor(data, property) {
    // tslint:disable-next-line:cyclomatic-complexity
    switch (
      this.columnInfo &&
      this.columnInfo[property] &&
      this.columnInfo[property].type
    ) {
      case 'number':
        return +(data[property] || 0);
      case 'date':
        return data[property]
          ? _moment(data[property]).format('X')
          : data[property];
      case 'dimension':
        return +((data[property] && data[property].length) || 0);
      case 'weight':
        return +((data[property] && data[property].weight) || 0);
      case 'dataSize':
        return +((data[property] && data[property].size) || 0);
      case 'custom':
        return this.columnInfo[property].sortingDataAccessor(data, property);
      default:
        return data[property];
    }
  }

  /**
   *
   * In case parent component gives separate paginator sizes for different view ports,
   * then we need to change paginator size after detecting view port.
   */
  setPageSizePerViewport() {
    this.paginatorPageSize = this.pageSizePerViewport[
      ViewportUtility.getCurrentViewport()
    ];
    if (this.matPaginator) {
      this.matPaginator._changePageSize(this.paginatorPageSize);
    }
  }

  /**
   * onRowSelection method emit clicked row data
   * @param data row data
   */
  onRowSelection(data) {
    this.emitRowData.emit(data);
  }

  /**
   * Initializes viewport variables
   */
  initViewportVariables() {
    this.isMobile = ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile);
  }

  /**
   * get header for items table
   * @param page value
   */
  getHeader() {
    if (this.dataSource.filteredData) {
      if (this.showTotalRecordsCount) {
        if (
          this.totalRecordsCount &&
          this.totalRecordsCount > this.maxRecords
        ) {
          this.tableHeaderCaption = `(${this.maxRecords} of ${this.totalRecordsCount})`;
        } else if (this.totalRecordsCount) {
          this.tableHeaderCaption = `(${this.totalRecordsCount})`;
        } else {
          this.tableHeaderCaption = '';
        }
        return this.tableTitle.replace('##', this.tableHeaderCaption);
      } else {
        this.tableHeaderCaption = getTablePaginationHeader(
          this.matPaginator
            ? ({
                previousPageIndex: null,
                pageSize: this.matPaginator.pageSize,
                pageIndex: this.matPaginator.pageIndex,
                length: this.matPaginator.length,
              } as any)
            : null,
          this.dataSource.filteredData.length
        );
      }
      return `${this.tableTitle} ${this.tableHeaderCaption}`;
    } else {
      return '';
    }
  }
  /**
   * return  table header caption (pagination data) for Accessibility
   *
   */
  getTableHeaderCaption() {
    if (this.tableHeaderCaption) {
      let str = this.tableHeaderCaption.split('(').join('').split(')').join('');

      if (str.length > 1) {
        str = str.replace('-', 'to');
      }

      return str;
    }
    return '';
  }

  /**
   * On orientation change just close if LG viewport
   * @param event : browser event object
   */
  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event) {
    this.initViewportVariables();
  }

  /**
   * Angular Lifecycle hook
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.changeDetectionSubject.complete();
  }

  /**
   * To listen changes for Refreshing View
   */
  subscribeDetectChanges() {
    // UPSGLD-2836 :: It is done to refresh view in case of IE,
    // Due to slow processing on IE view is not getting rendered properly and shows Empty rows in table
    if (UserAgentUtility.isIE()) {
      this.changeDetectionSubject
        .pipe(takeUntil(this.ngUnsubscribe), debounceTime(10))
        .subscribe(() => {
          CommonUtility.detectChanges(this.changeDetector);
        });
    }
  }

  /**
   * Notifies to detect changes
   */
  notifyForDetectChanges() {
    if (UserAgentUtility.isIE()) {
      this.changeDetectionSubject.next();
    }
  }

  /**
   * Whether the number of selected elements matches the total number of rows.
   */
  isAllSelected() {
    const numSelected = this.columnInfo.select.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection.
   */
  masterToggle() {
    this.isAllSelected()
      ? this.columnInfo.select.selection.clear()
      : this.dataSource.data.forEach((row) =>
          this.columnInfo.select.selection.select(row)
        );
    this.selection.emit(this.columnInfo?.select?.selection.selected);
  }

  /**
   * Toggle a row.
   */
  rowToggle(row) {
    this.columnInfo?.select?.selection.toggle(row);
    this.selection.emit(this.columnInfo?.select?.selection.selected);
  }

  /**
   * Emit sorted data for first load if there is any default sorting given.
   */
  private _emitDataIfDefaultSorting() {
    if (this.defaultSortingColumn) {
      this.onMatSortChange(null);
    }
  }

  /**
   * Transforms column label by applying content pipe if transformLabel key is true
   */
  private transformLabelContent() {
    Object.keys(this.columnInfo).forEach((key) => {
      if (this.columnInfo[key]?.transformLabel) {
        this.columnInfo[key].displayLabel = this.contentPipe.transform(
          this.columnInfo[key].displayLabel
        );
        this.columnInfo[key].transformLabel = false;
      }
    });
  }

  // -------#DNE------ keep it as of now, may be use in future - already discussed with Sanjeev Sir.
  //
  // handleScrollScenarios(){
  //   const isDesktopView = window.matchMedia(
  //     `(min-width: ${this.viewPortsMaxWidths.tablet}px)`
  //   ).matches;
  //   const isTabletView = window.matchMedia(
  //     `(min-width: ${this.viewPortsMaxWidths.mobile}px) and (max-width: ${this.viewPortsMaxWidths.tablet}px)`
  //   ).matches;
  //   const isMobileView = window.matchMedia(
  //     `(max-width: ${this.viewPortsMaxWidths.mobile}px)`
  //   ).matches;
  //     this.isScrollableInDesktop = isDesktopView && this.viewsForScroll.includes('lg');
  //     this.isScrollableInTablet = isTabletView && this.viewsForScroll.includes('md');
  //     this.isScrollableInMobile = isMobileView && this.viewsForScroll.includes('sm');
  // }
}
