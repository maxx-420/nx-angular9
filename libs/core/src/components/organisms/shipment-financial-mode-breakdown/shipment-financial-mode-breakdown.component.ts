// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

import { LearnMoreTypes } from '../../../enum/learnMore.enum';
import { IModeBreakdownCustomLabelMapping } from '../../../model/interfaces/IModeBreakdownCustomLabelMapping';
import { ViewportUtility } from '../../../utils';
import {
  DECIMAL_NUMBER_DEFAULT_FORMAT,
  VIEWPORT_NAMES,
} from '../../../constants';
import { TemplateSelectorService } from '../../../service/template-selector-service/template-selector.service';

@Component({
  selector: 'lib-shipment-financial-mode-breakdown',
  templateUrl: './shipment-financial-mode-breakdown.component.html',
  styleUrls: ['./shipment-financial-mode-breakdown.component.scss'],
})
export class ShipmentFinancialModeBreakdownComponent {
  @Input() isLoading: boolean = true;
  @Input() title: string;
  @Input() xAxisDisclaimer: string;
  @Input() config: any;
  @Input() headerColumns: Array<string>;
  @Input() financialModeBreakdownData: Array<any>;
  @Input() toggleTypes: string[];
  @Input() learnMoreData: any;
  @Input() learnMoreModalTitle: string;
  @Input() contentHtmlKey: string;
  @Input() attributesToFetchData: string[];
  @Input() labelCustomMappingModal: IModeBreakdownCustomLabelMapping;
  @Output() clickOnModeRow = new EventEmitter();
  @Output() clickOnLearnMoreRow = new EventEmitter();
  isMobile = ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile);
  customStyle: any = {
    height: '100%',
    padding: '14px',
  };
  LearnMoreTypes = LearnMoreTypes;
  DIGITS_INFO: string = DECIMAL_NUMBER_DEFAULT_FORMAT;
  templates: Map<string, TemplateRef<any>>;
  percentTemplate: TemplateRef<any>;

  constructor(cellTemplates: TemplateSelectorService) {
    this.templates = cellTemplates.templates;
    this.percentTemplate = this.templates.get('percentTemplate');
  }

  /**
   * emitter when learn more row is clicked
   * @param rowData data of the row clicked in learn more table
   */
  onLearnMoreRowClick(rowData: any): void {
    this.clickOnLearnMoreRow.emit(rowData);
  }

  /**
   * emitter when mode breakdown row is clicked
   * @param mode mode of the selected row
   */
  onRowClick(mode: string) {
    this.clickOnModeRow.emit(mode);
  }
}
