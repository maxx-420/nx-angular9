// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Chart Modal Component

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { AccessControlUtility, formatDate } from '../../../utils';
import { ACCOUNT_SERVICELINES_CONSTANTS } from '../../../constants';

@Component({
  selector: 'lib-chart-modal',
  templateUrl: './chart-modal.component.html',
  styleUrls: ['./chart-modal.component.scss'],
})
export class ChartModalComponent implements OnChanges {
  @Input() modalTitle: string;
  /**
   * To show/hide table header/title
   */
  @Input() showTableTitle: boolean = true;
  /**
   * table title, if it is not provided then table title will be derived from modal title
   */
  @Input() tableTitle: string;
  @Input() showModal: boolean;
  @Input() modalData: Array<any> = [];
  @Input() attrToFetchData: Array<string>;
  @Input() contentHtmlKey: string;
  @Input() hasApiFailed: boolean;
  @Input() errorReason: string;
  @Input() pageSection: string;
  /**
   * This parameter should be set to true if learn more consists of a table with multiple columns
   * or it consists of multiple tables like in WIP chart.
   */
  @Input() isMultiColumnOrTableLayout: boolean = false;
  /**
   * It should be provided if isMultiColumnOrTableLayout is set to true.
   */
  @Input() toggleTypes: Array<string>;
  @Input() isTableRowClickable: boolean = false;
  @Input() isTableColumnClickable: boolean = false;
  @Input() showSubValueColumn: boolean = false;
  /**
   * In multiple column layout, it determines which column label to map for a data point.
   */
  @Input() customLabelMapping: any;
  @Input() dataAutomationAttr: string;
  @Output() modalClosed: EventEmitter<any> = new EventEmitter();
  @Output() tableRowClicked: EventEmitter<any> = new EventEmitter();

  sanitizedHtml: SafeHtml;
  customStyle: any = {
    height: '80px',
    'border-top': '1px solid #EEEEEE',
  };
  isPostSalesCustomer: boolean = false;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly contentPipe: RenderLabelPipe
  ) {
    this.isPostSalesCustomer = AccessControlUtility.userHasServiceLine(
      ACCOUNT_SERVICELINES_CONSTANTS.postSales
    );
  }

  /**
   * after popupclose reset
   */
  onPopUpClose(e: any): void {
    this.modalClosed.emit(e);
  }

  /**
   * get table header
   */
  getTableHeader(toggleType: string = null): string {
    let tableHeader: string;
    if (this.showTableTitle) {
      tableHeader = this.tableTitle;
      if (!this.tableTitle) {
        if (this.isMultiColumnOrTableLayout && toggleType) {
          tableHeader = `${this.modalTitle} ${this.contentPipe.transform(
            'wh_wip_lrnMr_' + toggleType
          )}`;
        } else {
          tableHeader = this.modalTitle?.split('-')[0].trim();
          const tableTitleCount: number = this.getTotalCount();
          tableHeader += ` (${tableTitleCount} Total)`;
        }
      }
    }
    return tableHeader;
  }

  /**
   * get total count for table title
   */
  getTotalCount(): number {
    let count = 0;
    this.modalData?.forEach((item) => {
      count = count + parseInt(item[this.attrToFetchData[1]], 10);
    });
    return count;
  }

  /**
   * get col data
   * @param data table data
   * @param row row value
   * @param col col name
   */
  getColumnData(data, row, col) {
    return (
      data
        .find((val) => {
          return val.name === row;
        })
        ?.modes.find((val) => {
          if (this.customLabelMapping) {
            return this.customLabelMapping[val.name] === col;
          } else {
            return val.name === col;
          }
        })?.count || 0
    );
  }

  /**
   * ngOnChange lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.contentHtmlKey?.previousValue !==
      changes.contentHtmlKey?.currentValue
    ) {
      this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(
        this.contentPipe.transform(this.contentHtmlKey)
      );
    }
  }
  /**
   * Emit when click or enter press if allowed
   */
  onRowSelection(data, index, rowData) {
    // if drilldown enabled
    if (this.isTableRowClickable) {
      this.showModal = false;
      // if the rowData contains date key -> Its a date based graph
      if (Object.keys(rowData).includes('date')) {
        // format date to the yyyy-mm-dd format
        data = formatDate(data);
      } else {
        // if its non date data, split string to array to match the chart data
        data = data.split(' ');
      }

      this.tableRowClicked.emit({ data, index });
    }
  }

  /**
   * Emit column data when click or enter press if allowed
   */
  onColumnSelection(rowData, columnData) {
    const obj = {
      rowData,
      columnData,
    };
    if (this.isTableRowClickable && this.isTableColumnClickable) {
      this.tableRowClicked.emit(obj);
    }
  }
}
