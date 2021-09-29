// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
//
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { AccessControlUtility } from '../../../utils/access-control.util';
import { ACCOUNT_SERVICELINES_CONSTANTS } from '../../../constants/account-types.constant';

import { ModalTableData } from './context-help.interfaces';

@Component({
  selector: 'lib-context-help',
  templateUrl: './context-help.component.html',
  styleUrls: ['./context-help.component.scss'],
})
export class ContextHelpComponent implements OnInit, OnChanges {
  @Input() modalTitle: string;
  @Input() tableTitle: string;
  @Input() tableData: Array<ModalTableData> = [];
  @Input() showModal: boolean;
  @Input() contentHtmlKey: string;
  @Input() hasApiFailed: boolean;
  @Input() errorReason: string;
  @Input() pageSection: string;
  @Input() isTableRowClickable = false;
  @Output() modalClosed = new EventEmitter();
  @Output() tableRowClicked = new EventEmitter();

  sanitizedHtml: SafeHtml;
  isPostSalesCustomer = false;
  customStyle: any = {
    height: '80px',
    'border-top': '1px solid #EEEEEE',
  };
  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly contentPipe: RenderLabelPipe
  ) {
    this.isPostSalesCustomer = AccessControlUtility.userHasServiceLine(
      ACCOUNT_SERVICELINES_CONSTANTS.postSales
    );
  }

  /**
   * ngOnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.contentHtmlKey?.currentValue &&
      changes.contentHtmlKey.currentValue !==
        changes.contentHtmlKey.previousValue
    ) {
      this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(
        this.contentPipe.transform(this.contentHtmlKey)
      );
    }
  }

  /**
   * after popupclose reset
   */
  onPopUpClose(e) {
    this.modalClosed.emit(e);
  }

  /**
   * Emit when click or enter press if allowed
   */
  onRowSelection(data) {
    this.tableRowClicked.emit(data);
  }

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit(): void {
    this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(
      this.contentPipe.transform(this.contentHtmlKey)
    );
  }
}
