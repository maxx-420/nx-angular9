// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * cancelled shipment file
 */
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { PlatformService } from '../../../service/platform-service/platform.service';
import { ExportFormatterUtility } from '../../../utils';

import { default as ViewportUtility } from './../../../utils/viewport';
import { VIEWPORT_NAMES } from './../../../constants/viewport.constant';
import {
  dataAutomationAttr,
  dataAutomationAttrFilterChip,
  pageSizeForTablePerViewport,
} from './cancelled-shipment.component.config';
import { AccessControlUtility } from './../../../utils/access-control.util';
import { SymphonyDatePipe } from './../../../pipe/symphony-date.pipe';
import { PARTIALLY_CANCELLED_SHIPMENT_YES } from './../../../constants/global.constant';
import {
  cancelledShipmentTableExclusionColumnsIDs,
  cancelledShipmentTableExclusions,
} from './exclusion-list.config';

// prettier-ignore
const _moment = (moment as any).default ? (moment as any).default : moment;
@Component({
  selector: 'lib-cancelled-shipment',
  templateUrl: './cancelled-shipment.component.html',
  styleUrls: ['./cancelled-shipment.component.scss'],
  providers: [RenderLabelPipe],
})
export class CancelledShipmentComponent implements OnInit, OnDestroy {
  @ViewChild('shipmentNumberTemplate', { static: true })
  shipmentNumberTemplate: ElementRef;
  @ViewChild('cancelledDateTemplate', { static: true })
  cancelledDateTemplate: ElementRef;
  @ViewChild('cancelledDateTemplateWithTimeZone', { static: true })
  cancelledDateTemplateWithTimeZone: ElementRef;
  @ViewChild('entirelyCanceledTemplate', { static: true })
  entirelyCanceledTemplate: ElementRef;
  @ViewChild('cancelledReasonTemplate', { static: true })
  cancelledReasonTemplate: ElementRef;
  @ViewChild('shipmentNumberTemplatePostSales', { static: true })
  shipmentNumberTemplatePostSales: ElementRef;
  @ViewChild('entirelyCanceledTemplatePostSales', { static: true })
  entirelyCanceledTemplatePostSales: ElementRef;
  @Input() cancelledShipmentList: Array<any> = [];
  @Input() paginatorPageSize = 6;
  @Input() title;
  @Input() showHeader = true;
  @Input() dataAutomationAttr = dataAutomationAttr;
  dataAutomationAttrFilterChip = dataAutomationAttrFilterChip;
  @Output() emitRowData = new EventEmitter();
  @Input() hasApiFailed: boolean;
  @Input() showCancelledShipmentsTable;
  @Input() cancelledShipmentHeaderText;
  @Output() cancelledShipmentHeaderClickEvent = new EventEmitter();
  @Output() windowResizeEvent = new EventEmitter<string>();
  @Input() customStyle: any = { height: '100%' };
  @Input() errorReason: string;
  @Input() pageSection: string;

  displayedColumnsForTable: string[];
  columnInfo: any;
  isTableDataAvailable = true;
  tableData: Array<any> = [];
  @Input() pageSizePerViewport = pageSizeForTablePerViewport;
  isTimeZoneVisible = false;
  isMultiView;

  isDesktopViewport;
  isPostSalesCustomer = false;
  partiallyCancelledShipmentYes = PARTIALLY_CANCELLED_SHIPMENT_YES;
  @Input() defaultSortingColumn = 'shipmentLineCanceledReason';
  @Input() defaultSortingOrder = 'asc';
  @Input() showInfoIcon = 'true';
  @Input() showAccordion = 'true';
  @Input() showFilterChip: false;
  @Input() defaultFilters: [];
  @Input() selectedFilters: [];
  @Output() openFilter = new EventEmitter();
  @Output() chipFilterRemoved = new EventEmitter();
  @Input() componentFilterId;
  @Input() pageName;
  @Input() canExport: boolean;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private readonly contentPipe: RenderLabelPipe,
    private readonly platformService: PlatformService,
    private readonly datePipe: SymphonyDatePipe
  ) {
    this.isDesktopViewport = ViewportUtility.checkViewport(
      VIEWPORT_NAMES.desktop
    );
  }

  /**
   * to set displayed columns
   */
  setDisplayedColumns() {
    this.displayedColumnsForTable = [
      ...(this.isMultiView ? ['accountNumber'] : []),
      'upsShipmentNo',
      'referenceNo',
      'cancelledDate',
      'shipmentLineCanceledReason',
      'serviceName',
    ];
  }

  /**
   * lifecycle hook
   */
  ngOnInit(): void {
    this.isMultiView = AccessControlUtility.isMultiAccountCombination();
    this.setDisplayedColumns();
    this.isPostSalesCustomer = AccessControlUtility.isPostSalesCustomer();
    const tableExclusionList =
      AccessControlUtility.getCurrentFieldMapping(
        cancelledShipmentTableExclusions
      ) || {};
    const columnIDList = cancelledShipmentTableExclusionColumnsIDs;
    // isTimeZoneVisible is true only for the case where we need to show time zone(ie. for post sales service line)
    if (!tableExclusionList[columnIDList.TimeZone]) {
      this.isTimeZoneVisible = true;
    }
    this.columnInfo = {
      accountNumber: {
        displayLabel: this.contentPipe.transform('lbl_shipment_accountNumber'),
      },
      upsShipmentNo: {
        displayLabel: this.contentPipe.transform(
          'lbl_shipment_upsShipmentNumber'
        ),
        customTemplate: this.isPostSalesCustomer
          ? this.shipmentNumberTemplatePostSales
          : this.shipmentNumberTemplate,
      },
      referenceNo: {
        displayLabel: this.contentPipe.transform('lbl_shipment_refNumber'),
        styleClass: 'nowrap',
      },
      cancelledDate: {
        displayLabel: this.contentPipe.transform(
          'lbl_shipment_cancellationDate'
        ),
        type: 'custom',
        styleClass: 'nowrap',
      },
      shipmentLineCanceledReason: {
        displayLabel: this.contentPipe.transform(
          'lbl_shipment_isShipmentEntirelyCanceled'
        ),
        customTemplate: this.isPostSalesCustomer
          ? this.entirelyCanceledTemplatePostSales
          : this.entirelyCanceledTemplate,
        type: 'custom',
        sortingDataAccessor: (rowData, key) => {
          return this.contentPipe.transform(
            rowData.cancelledDate
              ? 'lbl_shipment_entirelyCancelled'
              : 'lbl_shipment_partiallyCancelled'
          );
        },
        exportDataAccessor: (coldata: any, rowData: any): string => {
          let state: boolean = false;
          if (this.isPostSalesCustomer) {
            if (
              rowData.cancelledDate ||
              rowData.shipmentLineCanceledFlag?.toLowerCase() ===
                PARTIALLY_CANCELLED_SHIPMENT_YES
            ) {
              state = true;
            }
          } else {
            state = true;
          }
          if (state) {
            return this.contentPipe.transform(
              rowData.cancelledDate
                ? 'lbl_shipment_entirelyCancelled'
                : 'lbl_shipment_partiallyCancelled'
            );
          } else {
            return '';
          }
        },
      },
      serviceName: {
        displayLabel: this.contentPipe.transform('lbl_shipment_service_name'),
      },
    };
    // this isTimeZoneVisible is true when time zone is visible(for post sales) and sorting logic also need to be changed for that case only
    if (this.isTimeZoneVisible) {
      this.columnInfo.cancelledDate = {
        ...this.columnInfo.cancelledDate,
        sortingDataAccessor: (rowData, key) => {
          return this.datePipe.transform(
            rowData.cancelledDate || rowData.shipmentLineCanceledDateTime,
            undefined,
            rowData.shipmentCanceledDateTimeZone
          );
        },
        customTemplate: this.cancelledDateTemplateWithTimeZone,
        exportDataAccessor: ExportFormatterUtility.cancelledDateWithTimeZone,
      };
    } else {
      this.columnInfo.cancelledDate = {
        ...this.columnInfo.cancelledDate,
        sortingDataAccessor: (rowData, key) => {
          return rowData.cancelledDate || rowData.shipmentLineCanceledDateTime
            ? _moment(
                rowData.cancelledDate || rowData.shipmentLineCanceledDateTime
              )
            : rowData.cancelledDate;
        },
        customTemplate: this.cancelledDateTemplate,
        exportDataAccessor: ExportFormatterUtility.cancelledDate,
      };
    }

    /* istanbul ignore else*/
    if (!this.title) {
      this.title = this.contentPipe.transform('lbl_canceled_shipments');
    }

    this.platformService.orientationChange$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((viewport) => {
        this.isDesktopViewport = viewport === VIEWPORT_NAMES.desktop;
        this.windowResizeEvent.emit(this.isDesktopViewport);
      });
  }

  /**
   *
   * Method to get clicked row data and navigate to L3 page with shipment number.
   */
  getClickedRowData(rowData) {
    this.emitRowData.emit(rowData);
  }

  /**
   * cancelled shipments header click
   */
  onCancelledShipmentsHeaderClick() {
    this.showCancelledShipmentsTable = true;
    this.cancelledShipmentHeaderClickEvent.emit(
      this.showCancelledShipmentsTable
    );
  }

  /**
   * lifecycle hook
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
