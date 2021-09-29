// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

import { CommonUtility } from '../../../utils';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import {
  DECIMAL_NUMBER_DEFAULT_FORMAT,
  ROUTER_CONSTANTS,
} from '../../../constants';
import { LearnMoreTypes } from '../../../enum/learnMore.enum';

@Component({
  selector: 'lib-shipment-financial-data',
  templateUrl: './shipment-financial-data.component.html',
  styleUrls: ['./shipment-financial-data.component.scss'],
})
export class ShipmentFinancialDataComponent implements OnChanges, OnInit {
  @Input() selectFinancialFilters;
  @Input() dataAutomationAttr;
  @Input() isLoading;
  @Input() config;
  @Input() titleName;
  @Input() styles;
  @Input() selectedChipFilters;
  @Input() defaultChipFilters;
  @Input() componentFilterId;
  @Input() isFilterChipVisible = true;
  @Input() enableFinantialTabDrillDown = false;
  @Input() learnMoreTitle: string;
  @Input() learnMoreContentHtmlKey: string;
  @Output() openFilter = new EventEmitter();
  @Output() clickOnTile = new EventEmitter();
  @Output() clickOnClaims = new EventEmitter();
  learnMoreTableData: any[];
  isFromGldPlatform;
  LearnMoreTypes = LearnMoreTypes;
  filterLabel: string;
  attrToFetchData = ['label', 'value', 'subValue'];

  customStyle: any = {
    height: '346px',
    padding: '14px',
  };
  DECIMAL_NUMBER_DEFAULT_FORMAT: string = DECIMAL_NUMBER_DEFAULT_FORMAT;

  constructor(
    public router: Router,
    private currencyPipe: CurrencyPipe,
    private contentPipe: RenderLabelPipe
  ) {
    this.isLoading = true;
    this.learnMoreTableData = [];
  }

  /**
   * ngOnChanges life cycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.config?.data && this.config.data.totalcustomerCharge) {
      this.setDifferentialPercentage();
      this.setLearnMoreTableData();
      this.isFromGldPlatform =
        this.config.state?.from === ROUTER_CONSTANTS.home;
    }
    if (
      changes?.selectedChipFilters?.previousValue !==
      changes?.selectedChipFilters?.currentValue
    ) {
      this.setFilterLabel();
    }
  }

  /**
   * ngOnInit life cycle hook
   */
  ngOnInit() {
    this.setFilterLabel();
    if (this.config?.data && this.config.data.totalcustomerCharge) {
      this.setDifferentialPercentage();
      this.setLearnMoreTableData();
      this.isFromGldPlatform =
        this.config.state?.from === ROUTER_CONSTANTS.home;
    }
  }
  /**
   * setting learn more modal title
   */
  setFilterLabel(): void {
    this.filterLabel = this.selectedChipFilters
      ? ` - From ${this.selectedChipFilters[0].startDate} to ${this.selectedChipFilters[0].endDate}`
      : '';
  }

  /**
   * setting data for LearnMore modal Table
   */
  setLearnMoreTableData(): void {
    const data = this.config.data;
    const na = this.contentPipe.transform('shpt_fin_spend_na');
    this.learnMoreTableData = [
      {
        label: this.contentPipe.transform('lbl_shipments_total'),
        value: this.currencyPipe.transform(
          data.totalcustomerCharge,
          data.totalcustomerChargeCurrency,
          undefined,
          DECIMAL_NUMBER_DEFAULT_FORMAT
        ),
        subValue: '',
      },
      {
        label: this.contentPipe.transform('lbl_average_cost_per_shipment'),
        value: data.averageCostPerShipment
          ? this.currencyPipe.transform(
              data.averageCostPerShipment,
              data.totalcustomerChargeCurrency,
              undefined,
              DECIMAL_NUMBER_DEFAULT_FORMAT
            )
          : na,
        subValue: data.differenceOfAvgCostPerShipment
          ? data.differenceOfAvgCostPerShipment
          : na,
      },
      {
        label: this.contentPipe.transform('lbl_average_cost_per_unit'),
        value: data.averageCostPerUnit
          ? this.currencyPipe.transform(
              data.averageCostPerUnit,
              data.totalcustomerChargeCurrency,
              undefined,
              this.DECIMAL_NUMBER_DEFAULT_FORMAT
            )
          : na,
        subValue: data.differenceOfAvgCostPerUnit
          ? data.differenceOfAvgCostPerUnit
          : na,
      },
      {
        label: this.contentPipe.transform('lbl_shipments_number_of_claims'),
        value: data.numberOfClaims.toString(),
        subValue: '',
      },
    ];
  }

  /**
   * setDifferentialPercentage
   */
  setDifferentialPercentage() {
    const data = this.config.data;
    this.config.data = {
      ...data,
      numberOfClaims:
        data?.numberOfClaims === null ? 'N/A' : Number(data?.numberOfClaims),
      differenceOfAvgCostPerShipment: CommonUtility.getDifferentialPercentageFormattedString(
        data?.averageCostPerShipment,
        data?.averageCostPerShipmentForDifferential
      ),
      differenceOfAvgCostPerUnit: CommonUtility.getDifferentialPercentageFormattedString(
        data?.averageCostPerUnit,
        data?.averageCostPerUnitForDifferential
      ),
    };
  }

  /**
   * Check the row type and select the drilldown method to be applied
   */
  tableRowClicked(event: { data: any; index: number }): void {
    const index = event?.index;
    if (index === this.learnMoreTableData.length - 1) {
      this.onClaimsClick(null, true);
    } else {
      this.onTileClick(null);
    }
  }

  /**
   * emitter when claims link is clicked
   * @param fromLearnMore to check if the drilldown is from learn more.
   */
  onClaimsClick(event, fromLearnMore = false) {
    event?.stopPropagation();
    this.clickOnClaims.emit(fromLearnMore);
  }

  /**
   * emitter when tile is clicked
   * @param event event
   */
  onTileClick(event) {
    event?.stopPropagation();
    this.clickOnTile.emit();
  }
}
