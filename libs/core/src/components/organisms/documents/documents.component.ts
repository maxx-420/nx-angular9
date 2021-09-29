// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// documents tab component config for l3 documents tab

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import {
  DOWNLOAD_TEMPLATE_NAME,
  TYPE_TEMPLATE_NAME,
} from './documents.component.config';
import { createColumnLabels } from './documents.component.util';
import { IDocumentsColumns } from './interfaces/IDocumentsColumns.interface';

@Component({
  selector: 'lib-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  @Input() documentsRes;
  @Input() additionalTableColumns = {};
  @Input() documentDisplayedColumns: string[];
  @Input() downloadLoaderMapping;
  @Output() downloadClicked = new EventEmitter();
  @ViewChild(DOWNLOAD_TEMPLATE_NAME, { static: true })
  downloadColumnTemplate: ElementRef;
  @ViewChild(TYPE_TEMPLATE_NAME, { static: true })
  typeColumnTemplate: ElementRef;
  tableColumnData: IDocumentsColumns;
  showTable: boolean;

  /**
   * ngOninit life cycle hook
   */
  ngOnInit() {
    this.tableColumnData = createColumnLabels(this.additionalTableColumns, this.downloadColumnTemplate);
    this.tableColumnData.type.customTemplate = this.typeColumnTemplate;
    this.showTable = true;
  }

  /**
   * Called when the download link is clicked.
   */
  onDownloadLinkClicked(rowData) {
    this.downloadClicked.emit({
      documentId: rowData?.id,
      type: rowData?.type,
      ...(rowData.source ? {source: rowData.source} : {})
    });
  }
}
