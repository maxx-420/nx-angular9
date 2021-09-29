// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * undelivered exception file
 */
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { PlatformService } from '../../../service/platform-service/platform.service';
import { formatCompleteAddress } from '../../../utils';
import { default as ViewportUtility } from '../../../utils/viewport';
import { VIEWPORT_NAMES } from '../../../constants/viewport.constant';

import {
  displayColumns,
  displayOpenExceptions,
  pageSizeForTablePerViewport
} from './exceptions-listing.component.config';

@Component({
  selector: 'lib-exceptions-listing',
  templateUrl: './exceptions-listing.component.html',
  styleUrls: ['./exceptions-listing.component.scss'],
  providers: [RenderLabelPipe],
  encapsulation: ViewEncapsulation.None,
})
export class ExceptionsListingComponent implements OnInit, OnDestroy {
  @Input() undeliveredExcDataList: Array<any> = [];
  @Input() paginatorPageSize = 6;
  @Input() title;
  @Input() showHeader = true;
  @Output() emitRowData = new EventEmitter();
  @Input() hasApiFailed: boolean;
  @Input() showUndeliveredExceptionsTable;
  @Input() showLateDeliveryExceptionsTable;
  @Input() headerText;
  @Input() isMultiView;
  @Output() headerClickEvent = new EventEmitter();
  @Output() windowResizeEvent = new EventEmitter<string>();
  @Input() customStyle: any = { height: '100%' };
  @Input() errorReason: string;
  @Input() pageSection: string;
  @Input() isExceptionTypeIncluded: boolean;
  @Input() dataAutomationAttr: string;
  @Input() isLateDeliveryExceptionsTable = false;
  @Input() showInfoIcon = true;

  displayedColumnsForTable: string[] = displayColumns();
  columnInfo: any;
  isTableDataAvailable = true;
  tableData: Array<any> = [];
  pageSizePerViewport = pageSizeForTablePerViewport;

  isDesktopViewport;
  formatCompleteAddress = formatCompleteAddress;

  private readonly ngUnsubscribe = new Subject();

  constructor(private readonly contentPipe: RenderLabelPipe,
              private readonly platformService: PlatformService) {
    this.isDesktopViewport = ViewportUtility.checkViewport(
      VIEWPORT_NAMES.desktop
    );
  }

  /**
   * lifecycle hook
   */
  ngOnInit(): void {
    this.populateTableColumn();

    /* istanbul ignore else*/
    if (!this.title) {
      this.title = this.contentPipe.transform('lbl_undelivered_exceptions');
    }

    this.platformService.orientationChange$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (viewport) => {
        this.isDesktopViewport = viewport === VIEWPORT_NAMES.desktop;
        this.windowResizeEvent.emit(this.isDesktopViewport);
      }
    );
  }

  /**
   * Method to populate columns and column info for the table
   */
  populateTableColumn(){
    this.columnInfo = {
      accountNumber: {
        displayLabel: this.contentPipe.transform(
          'lbl_shipment_accountNumber'
        ),
      },
      upsShipmentNo: {
        displayLabel: this.contentPipe.transform(
          'lbl_shipment_upsShipmentNumber'
        ),
      },
      referenceNo: {
        displayLabel: this.contentPipe.transform('lbl_shipment_refNumber'),
        styleClass: 'nowrap',
      },

      exception: {
        displayLabel: this.contentPipe.transform(
          'lbl_shipment_exceptionReason'
        ),
        styleClass: 'nowrap trucateText',
      },
      orderShipped: {
        displayLabel: this.isExceptionTypeIncluded
          ? this.contentPipe.transform('lbl_shipment_orderShippedTime')
          : this.contentPipe.transform('lbl_shipment_orderShipped'),
          // After adding timezone to the date the content goes in new line thus messing with height,
          // to prevent that and instead of height expand column width
        styleClass: 'nowrap',
      },
      scheduledDelivery: {
        displayLabel: this.isExceptionTypeIncluded
          ? this.contentPipe.transform(
            'lbl_undelivered_exception_scheduledDeliveryTime'
          )
          : this.contentPipe.transform(
            'lbl_undelivered_exception_scheduledDelivery'
          ),
        styleClass: 'nowrap',
      },
      destination: {
        displayLabel: this.contentPipe.transform(
          'lbl_shipment_destinationTitle'
        ),
        styleClass: 'nowrap'
      },
      carrierServiceLevel: {
        displayLabel: this.isExceptionTypeIncluded
          ? this.contentPipe.transform('lbl_shipment_CarrierServiceLevel')
          : this.contentPipe.transform('lbl_shipment_CarrierService'),
        styleClass: 'nowrap',
      },
      milestoneStatus: {
        displayLabel: this.contentPipe.transform(
          'lbl_shipment_milestoneStatus'
        ),
      },
      origin: {
        displayLabel: this.contentPipe.transform('lbl_shipment_originTitle'),
        styleClass: 'nowrap'
      }
    };

    if (this.isExceptionTypeIncluded) {
      this.columnInfo.orderShipped.type = 'date';
      this.columnInfo.scheduledDelivery.type = 'date';
      this.displayedColumnsForTable = displayOpenExceptions(this.isMultiView);
      this.columnInfo.exceptionType = {
        displayLabel: this.contentPipe.transform(
          'lbl_shipment_exceptionType'
        ),
        styleClass: 'nowrap',
      };
    } else if (this.isLateDeliveryExceptionsTable || !this.isExceptionTypeIncluded) {
      this.displayedColumnsForTable = [...displayColumns(this.isMultiView)];
      const originLocationKeyName = this.isLateDeliveryExceptionsTable ? 'orgLocnCode' : 'originLocationCode';
      this.displayedColumnsForTable.splice(
        this.displayedColumnsForTable.indexOf('scheduledDelivery') + 1,
        0,
        originLocationKeyName
      );
      this.columnInfo[originLocationKeyName] = {
        displayLabel: this.contentPipe.transform(
          'lbl_undelivered_exception_originLocationCode'
        ),
      };
    }
  }

  /**
   *
   * Method to get clicked row data and navigate to L3 page with shipment number.
   */
  getClickedRowData(rowData) {
    this.emitRowData.emit(rowData);
  }

  /**
   * on header click
   */
  onHeaderClick() {
    if (this.isLateDeliveryExceptionsTable){
      this.showLateDeliveryExceptionsTable = true;
    } else {
      this.showUndeliveredExceptionsTable = true;
    }
    this.headerClickEvent.emit(true);
  }

  /**
   * lifecycle hook
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
