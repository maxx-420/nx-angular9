// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Shipment Modes Summary vs Shipment Count component
 */

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { DrilldownParams } from '../../../utils/interfaces/drilldownParams.interface';

import { defaultIcon, shipmentModeIcons } from './shipment-mode.config';

@Component({
  selector: 'lib-shipment-mode',
  templateUrl: './shipment-mode.component.html',
  styleUrls: ['./shipment-mode.component.scss'],
})
export class ShipmentModeComponent implements OnInit, OnChanges {
  shipmentModeIcons = shipmentModeIcons;
  defaultIcon = defaultIcon;

  @Input() title: string;
  @Input() shipmentModeSummary: Array<any>;
  @Input() dataAutomationAttribute = '';
  @Input() hasApiFailed: boolean;
  @Input() customStyle: any = {
    height: '79px',
    'border-top': '1px solid #EEEEEE',
  };
  @Input() errorReason: string;
  @Input() pageSection: string;
  @Input() enableDrilldown = false;
  @Input() drilldownParams: DrilldownParams;
  @Input() isModeClickable = false;
  @Output() clickOnChartData = new EventEmitter();

  @Input() showFilterChip: false;
  @Input() defaultFilters: [];
  @Input() selectedFilters: [];
  @Output() openFilter = new EventEmitter();
  @Output() chipFilterRemoved = new EventEmitter();
  @Input() componentFilterId;

  /**
   * filter objects having 0 count
   */
  filterShipmentModeSummary() {
    this.shipmentModeSummary = this.shipmentModeSummary?.filter(
      (shipmentMode) => parseInt(shipmentMode.count, 10) !== 0
    );
  }

  /**
   * ngOnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.shipmentModeSummary.previousValue !==
      changes.shipmentModeSummary.currentValue
    ) {
      this.filterShipmentModeSummary();
    }
  }

  /**
   * getIcon returns either available icon or default icon
   * @param shipmentMode shipmentMode
   */
  getIcon(shipmentMode) {
    if (
      this.shipmentModeIcons.indexOf(shipmentMode?.id?.toLowerCase()) !== -1
    ) {
      return shipmentMode.id?.toLowerCase();
    } else {
      return this.defaultIcon;
    }
  }

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit(): void {
    this.filterShipmentModeSummary();
  }

  /**
   * Getting value from chart component
   * @param state boolean
   */
  clickOnChart(data) {
    this.clickOnChartData.emit(data);
  }
}
