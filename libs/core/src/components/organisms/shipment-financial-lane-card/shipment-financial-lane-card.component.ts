// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

import { LearnMoreTypes } from '../../../enum/learnMore.enum';
import { ILaneSummary } from '../../../model/interfaces/IShipmentFinancials';
import { TemplateSelectorService } from '../../../service/template-selector-service/template-selector.service';

@Component({
  selector: 'lib-shipment-financial-lane-card',
  templateUrl: './shipment-financial-lane-card.component.html',
  styleUrls: ['./shipment-financial-lane-card.component.scss'],
})
export class ShipmentFinancialLaneCardComponent {
  @Input() isLoading: boolean = true;
  @Input() title: string;
  @Input() config: any;
  @Input() financialLaneSummaryData: Array<ILaneSummary>;
  @Input() learnMoreData: any;
  @Input() learnMoreModalTitle: string;
  @Input() contentHtmlKey: string;
  @Input() attributesToFetchData: string[];
  @Output() clickOnLaneRow: EventEmitter<any> = new EventEmitter();
  customStyle: any = {
    height: '100%',
    padding: '14px',
  };
  noDataTemplateRef: TemplateRef<any>;
  LearnMoreTypes: typeof LearnMoreTypes = LearnMoreTypes;
  constructor(private readonly templateService: TemplateSelectorService) {
    this.noDataTemplateRef = this.templateService.templates.get(
      'noDataTemplate'
    );
  }
  /**
   * emitter when learn more row is clicked
   * @param rowData data of the row clicked in learn more table
   */
  onLearnMoreRowClick(rowData: { data: any; index: number }): void {
    if (this.financialLaneSummaryData?.length > 0) {
      this.onRowClick(this.financialLaneSummaryData[rowData.index]);
    }
  }

  /**
   * emitter when lane summary row is clicked
   * @param laneData data of the row clicked
   */
  onRowClick(laneData: ILaneSummary): void {
    this.clickOnLaneRow.emit(laneData);
  }
}
